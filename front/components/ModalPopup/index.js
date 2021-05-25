import React, { useState, useCallback, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { 
    Wrap, WrapInner, Header, HeaderInner,
    Title,
    Content, 
    Controls, ControlButton, 
    MinimizationIcon, 
    MaximizeIcon, 
} from './styles';

const ModalPopup = ({ id, visible, zIndex, size, title, theme, children, buttonDisabled, onCloseModal }) => {
    const themeContext = useContext(ThemeContext);
    const [maxStatus, setMaxStatus] = useState(false);
    const modalRef = useRef(null);
    const headerRef = useRef(null);
    const maximizeSize = '98%';
    let lastX = 0; 
    let lastY = 0; 
    let startX = 0; 
    let startY = 0; 

    useEffect(() => {
        if(!visible){
            modalRef.current.style.top = '50%';
            modalRef.current.style.left = '50%';
        }
    }, [visible]);

    const onMaximize = useCallback(() => setMaxStatus(!maxStatus), [maxStatus]);

    const onMove = useCallback(e => {
        const { clientX, clientY } = e;
        e.preventDefault(); 

        lastX = startX - clientX; 
        lastY = startY - clientY; 
        startX = clientX; 
        startY = clientY; 

        modalRef.current.style.top = `${modalRef.current.offsetTop - lastY}px`;
        modalRef.current.style.left = `${modalRef.current.offsetLeft - lastX}px`;
    }, []);

    const onRemoveEvent = useCallback(() => {
        document.removeEventListener('mouseup', onRemoveEvent); 
        document.removeEventListener('mousemove', onMove); 
    }, []);

    const onMouseDown = useCallback(e => {
        const { clientX, clientY } = e;
        e.preventDefault(); 

        startX = clientX; 
        startY = clientY; 
        document.addEventListener('mouseup', onRemoveEvent); 
        document.addEventListener('mousemove', onMove);
    }, []);

    return (
        <Wrap
            ref={modalRef}
            className={visible ? 'visible' : ''}
            color={theme === 'normal' ? themeContext.colors.black : 'white'}
            z={zIndex}
            w={maxStatus ? maximizeSize : size.w}
            h={maxStatus ? maximizeSize : size.h}
        >
            <WrapInner color={themeContext.colors.lightGray}>   
                <Header
                    ref={headerRef}
                    onMouseDown={onMouseDown}
                >
                    <HeaderInner color={themeContext.colors.lightGray}>
                        <Controls>
                            <ControlButton 
                                bgcolor={themeContext.colors.yellow}
                                onClick={(() => onCloseModal(id))}
                            >
                                <MinimizationIcon />
                            </ControlButton>
                            
                            {!buttonDisabled.Maximize && (
                                <ControlButton 
                                    bgcolor={themeContext.colors.green}
                                    onClick={onMaximize}
                                >
                                    <MaximizeIcon />
                                </ControlButton>
                            )}
                        </Controls>

                        {title && <Title>{title}</Title>}
                    </HeaderInner>
                </Header>
                
                <Content>
                    {children}
                </Content>
            </WrapInner> 
        </Wrap>
    );
};

ModalPopup.propTypes = {
    id: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
    theme: PropTypes.string,
    visible: PropTypes.bool,
    zIndex: PropTypes.number, // 1000
    size: PropTypes.objectOf(PropTypes.string),
    title: PropTypes.string,
    children: PropTypes.any,
    buttonDisabled: PropTypes.objectOf(PropTypes.bool),
};

ModalPopup.defaultProps = {
    visible: false,
    zIndex: 1000,
    theme: 'normal',
    size: {
        w: '500px',
        h: '500px'
    },
    title: 'Modal',
    childeren: '콘텐츠를 입력해주세요.',
    buttonDisabled: {
        Maximize: false,
    },
};

export default ModalPopup;