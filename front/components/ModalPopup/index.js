import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classNames';

import { 
    Wrap, WrapInner, Header, 
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
    const dispatch = useDispatch();
    const [modalX, setModalX] = useState(location.x || '50%');
    const [modalY, setModalY] = useState(location.y || '50%');

    const maximizeSize = '90%';
    const [maxStatus, setMaxStatus] = useState(false);
    const [minStatus, setMinStatus] = useState(false);
    const [moveStatus, setMoveStatus] = useState(false);
    const modalRef = useRef(null);

    const classes = classNames({
        'active': visible,
        'min': minStatus,
    });

    // useEffect(() => {
    //     document.addEventListener("mousedown", onClickOutside);

    //     return () => {
    //         document.removeEventListener("mousedown", onClickOutside);
    //     };
    // }, [moveStatus]);

    // const onClickOutside = useCallback(({ target }) => {
    //     console.log('onClickOutside modalRef',modalRef);
    //     // console.log('onClickOutside target',target);
    //     // if (menuRef.current && !menuRef.current.contains(target)) {
    //     //     setIsVisiMenu(false);
    //     // }
    // }, []);

    const onMinimization = useCallback(() => setMinStatus(!minStatus), [minStatus]);
    const onMaximize = useCallback(() => setMaxStatus(!maxStatus), [maxStatus]);

    const onMoveStart = useCallback((e) => {
        setMoveStatus(true);
        // const { offsetTop, offsetLeft } = modalRef.current
        // console.log('modalRef', modalRef, offsetTop, offsetLeft);
        // console.log('clientX', e.target.clientX, offsetLeft);
        // console.log('offsetTop', offsetTop);
        // console.log('offsetLeft', offsetLeft);
    }, []);

    const onMoveEnd = useCallback((e) => {
        setMoveStatus(false);
    }, []);

    const onMove = useCallback((e) => {
        if(moveStatus){
            console.log('onMove', e.clientX, e.clientY);
            setModalX(`${e.screenX}px`);
            setModalY(`${e.screenY}px`);
        }
    }, [moveStatus]);

    return (
        <Wrap
            ref={modalRef}
            className={classes}
            x={modalX}
            y={modalY}
            z={zIndex ? zIndex : 1000}
            w={maxStatus ? maximizeSize : size.w}
            h={maxStatus ? maximizeSize : size.h}
        >
            <WrapInner>   
                <Header
                    className={moveStatus ? 'active' : ''}
                    onMouseDown={onMoveStart} 
                    onMouseUp={onMoveEnd}
                    onMouseLeave={onMoveEnd}
                    onMouseMove={onMove}
                >
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