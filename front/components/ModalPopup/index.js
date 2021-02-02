import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classNames';

import { 
    Wrap, WrapInner, Header, HeaderInner,
    Title,
    Content, 
    Controls, ControlButton, 
    CloseIcon, MinimizationIcon, MaximizeIcon, 
    MiniWrap,
} from './styles';
import { useDispatch } from 'react-redux';

// TODO: params, props관련 주석달까?
const ModalPopup = ({
    id,
    onCloseModal,
    visible,
    location,
    zIndex, 
    size, 
    title, 
    children,
    buttonDisabled, 
}) => {
    const maximizeSize = '90%';
    const [maxStatus, setMaxStatus] = useState(false);
    const [minStatus, setMinStatus] = useState(false);

    const onMinimization = useCallback(() => setMinStatus(!minStatus), [minStatus]);
    const onMaximize = useCallback(() => setMaxStatus(!maxStatus), [maxStatus]);

    // const [clientStartX, setClientStartX] = useState(0);
    // const [clientStartY, setClientStartY] = useState(0);
    // const [clientLastX, setClientLastX] = useState(0);
    // const [clientLastY, setClientLastY] = useState(0);

    
    // const [offsetX, setOffsetX] = useState(0);
    // const [offsetY, setOffsetY] = useState(0);
    const modalRef = useRef(null);
    const headerRef = useRef(null);
    // const [moveStatus, setMoveStatus] = useState(false);
    let lastX = 0; 
    let lastY = 0; 
    let startX = 0; 
    let startY = 0; 

    const wrapClasses = classNames({
        'visible': visible,
        'min': minStatus,
    });

    // TODO: useCallback 추가
    const onMove = (e) => {
        console.log('onMove');
        e.preventDefault(); 
        lastX = startX - e.clientX; 
        lastY = startY - e.clientY; 

        startX = e.clientX; 
        startY = e.clientY; 

        // TODO: Status로 할 방법은 없느냐?
        modalRef.current.style.top = `${modalRef.current.offsetTop - lastY}px`;
        modalRef.current.style.left = `${modalRef.current.offsetLeft - lastX}px`;
    };

    // TODO: useCallback 추가
    const onRemoveEvent = () => {
        console.log('onRemoveEvent');
        document.removeEventListener('mouseup', onRemoveEvent); 
        document.removeEventListener('mousemove', onMove); 
    };

    // TODO: useCallback 추가
    const onMouseDown = (e) => {
        console.log('onMouseDown');

        e.preventDefault(); 
        startX = e.clientX; 
        startY = e.clientY; 

        document.addEventListener('mouseup', onRemoveEvent); 
        document.addEventListener('mousemove', onMove);
    };

    return (
        <Wrap
            ref={modalRef}
            className={wrapClasses}
            z={zIndex ? zIndex : 1000}
            w={maxStatus ? maximizeSize : size.w}
            h={maxStatus ? maximizeSize : size.h}
            // top={offsetY}
            // left={offsetX}
        >
            <WrapInner>   
                <Header
                    ref={headerRef}
                    onMouseDown={onMouseDown}
                >
                    <HeaderInner>
                        <Controls>
                            <ControlButton 
                                bgcolor="#ff6059" 
                                onClick={onCloseModal(id)}
                            >
                                <CloseIcon />
                            </ControlButton>

                            {!buttonDisabled.Minimization && (
                                <ControlButton 
                                    bgcolor="#ffbc28"
                                    onClick={onMinimization}
                                >
                                    <MinimizationIcon />
                                </ControlButton>
                            )}
                            
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

                { minStatus && (
                    <button onClick={onMinimization}>
                        <span className="hidden">
                            최소화 해제버튼
                        </span>
                    </button>
                )}
            </WrapInner> 
        </Wrap>
    );
};

// ModalPopup.propTypes = {
//     button_disabled: PropTypes.objectOf(PropTypes.bool),
//     modal_width: PropTypes.string,
//     modal_height: PropTypes.string,
//     visible: PropTypes.bool.isRequired,
//     title: PropTypes.string,
//     children: PropTypes.any.isRequired,
//     onClick: PropTypes.func,
// };

// ModalPopup.defaultProps = {
//     button_disabled: {
//         Maximize: false,
//         Minimization: false,
//     },
//     children: '컨텐츠 영역',
//     modal_width: '300px',
//     modal_height: '300px',
// };

export default ModalPopup;

// TODO:
// - 위치 이동 
// - 여러개 최소화 시킬 경우 위치 재 정렬. 어떻게 할 지?`