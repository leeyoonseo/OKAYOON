import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classNames';

import styled from 'styled-components';

import { 
    ModalPopupWrap, ModelHeader, ModalTitle,
    ModalContent, ModalFoter,
    ModalControls, ModalControlButton, 
    CloseIcon, MinimizationIcon, MaximizeIcon, 
    MiniWrap,
} from './styles';

const ModalPopup = ({
    button_disabled: buttonDisabled, 
    modal_width: modalWidth, 
    modal_height: modalHeight,  
    visible,
    title, children, 
    onClose
}) => {
    const [maxStatus, setMaxStatus] = useState(false);
    const [minStatus, setMinStatus] = useState(false);

    const maximizeSize = '90%';

    const modalClasses = classNames({
      'active': visible,
      'min': minStatus,
    });

    const onMinimization = useCallback(() => setMinStatus(!minStatus), [minStatus]);
    const onMaximize = useCallback(() => setMaxStatus(!maxStatus), [maxStatus]);

    return (
        <ModalPopupWrap 
            className={modalClasses}
            w={maxStatus ? maximizeSize : modalWidth}
            h={maxStatus ? maximizeSize : modalHeight}
        >
            <ModelHeader>
                <ModalControls>
                    <ModalControlButton 
                        bgcolor="#ff6059" 
                        // #ff5f56
                        onClick={onClose(false)}
                    >
                        <CloseIcon />
                    </ModalControlButton>

                    {!buttonDisabled.Minimization && (
                        <ModalControlButton 
                            bgcolor="#ffbc28"
                            onClick={onMinimization}
                        >
                            {/* #ffbd2e */}
                            <MinimizationIcon />
                        </ModalControlButton>
                    )}
                    
                    {!buttonDisabled.Maximize && (
                        <ModalControlButton 
                            bgcolor="#26ca3f"
                            onClick={onMaximize}
                        >
                            {/* #27c93f */}
                            <MaximizeIcon />
                        </ModalControlButton>
                    )}
                </ModalControls>

                {title && <ModalTitle>{title}</ModalTitle>}
            </ModelHeader>

            <ModalContent>
                {children}
            </ModalContent>

            { minStatus && (
                <button onClick={onMinimization}>
                    <span className="hidden">
                        최소화 해제버튼
                    </span>
                </button>
            )}
        </ModalPopupWrap>
    );
};

ModalPopup.propTypes = {
    button_disabled: PropTypes.objectOf(PropTypes.bool),
    modal_width: PropTypes.string,
    modal_height: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string,
    children: PropTypes.any.isRequired,
    onClose: PropTypes.func,
};

ModalPopup.defaultProps = {
    button_disabled: {
        Maximize: false,
        Minimization: false,
    },
    children: '컨텐츠 영역',
    modal_width: '300px',
    modal_height: '300px',
};

export default ModalPopup;

// TODO:
// - 위치 이동 
// - 여러개 최소화 시킬 경우 위치 재 정렬. 어떻게 할 지?`