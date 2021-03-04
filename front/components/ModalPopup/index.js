import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { 
    Wrap, WrapInner, Header, HeaderInner,
    Title,
    Content, 
    Controls, ControlButton, 
    MinimizationIcon, 
    MaximizeIcon, 
} from './styles';

const ModalPopup = ({
    id,
    visible,
    zIndex, 
    size, 
    title, 
    theme,
    children,
    buttonDisabled, 
    onCloseModal,
}) => {

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

    const onMove = useCallback((e) => {
        e.preventDefault(); 
        lastX = startX - e.clientX; 
        lastY = startY - e.clientY; 

        startX = e.clientX; 
        startY = e.clientY; 

        modalRef.current.style.top = `${modalRef.current.offsetTop - lastY}px`;
        modalRef.current.style.left = `${modalRef.current.offsetLeft - lastX}px`;
    }, []);

    const onRemoveEvent = useCallback(() => {
        document.removeEventListener('mouseup', onRemoveEvent); 
        document.removeEventListener('mousemove', onMove); 
    }, []);

    const onMouseDown = useCallback((e) => {
        e.preventDefault(); 
        startX = e.clientX; 
        startY = e.clientY; 

        document.addEventListener('mouseup', onRemoveEvent); 
        document.addEventListener('mousemove', onMove);
    }, []);

    return (
        <Wrap
            ref={modalRef}
            className={visible ? 'visible' : ''}
            theme={theme}
            z={zIndex}
            w={maxStatus ? maximizeSize : size.w}
            h={maxStatus ? maximizeSize : size.h}
        >
            <WrapInner theme={theme}>   
                <Header
                    ref={headerRef}
                    onMouseDown={onMouseDown}
                >
                    <HeaderInner theme={theme}>
                        <Controls>
                            <ControlButton 
                                bgcolor="#ffbf2e" 
                                onClick={onCloseModal(id)}
                            >
                                <MinimizationIcon />
                            </ControlButton>
                            
                            {!buttonDisabled.Maximize && (
                                <ControlButton 
                                    bgcolor="#26ca3f"
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

// TODO:
// - 최소화 고민해보기.. 최소화 위치 어떻게 정렬할지도 같이 고민해야할 것..
// - 이동 시 마우스 커서, useState가 비동기인 문제들 해결.. (style 속성 접근해서 수정하기말고 다른 방법없을까)