import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classNames';

import { 
    Wrap, Header, Title,
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

    const maximizeSize = '90%';
    const [maxStatus, setMaxStatus] = useState(false);
    const [minStatus, setMinStatus] = useState(false);

    const classes = classNames({
        'active': visible,
        'min': minStatus,
    });

    const onMinimization = useCallback(() => setMinStatus(!minStatus), [minStatus]);
    const onMaximize = useCallback(() => setMaxStatus(!maxStatus), [maxStatus]);

    return (
        <Wrap
            className={classes}
            x={location.x ? location.x : 50}
            y={location.y ? location.x : 50}
            z={zIndex ? zIndex : 1000}
            w={maxStatus ? maximizeSize : size.w}
            h={maxStatus ? maximizeSize : size.h}
        >   
            <Header>
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