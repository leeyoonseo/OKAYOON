import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { 
    ModalPopupWrap, ModelHeader, ModalTitle,
    ModalContent, ModalFoter,
    ModalControls, ModalControlButton, 
    CloseIcon, MinimizationIcon, MaximizeIcon, 
    
} from './styles';

const ModalPopup = ({
    button_disabled: buttonDisabled, 
    modal_width: modalWidth, 
    modal_height: modalHeight,  
    visible,
    title, content, footer,  
    onClosePopup 
}) => {

    return (
        <ModalPopupWrap 
            className={visible ? "active" : ''}
            w={modalWidth}
            h={modalHeight}
        >
            <ModelHeader>
                <ModalControls>
                    <ModalControlButton 
                        bgcolor="#ff6059" 
                        // #ff5f56
                        onClick={onClosePopup(false)}
                    >
                        <CloseIcon />
                    </ModalControlButton>

                    {!buttonDisabled.Minimization && (
                        <ModalControlButton bgcolor="#ffbc28">
                            {/* #ffbd2e */}
                            <MinimizationIcon />
                        </ModalControlButton>
                    )}
                    
                    {!buttonDisabled.Maximize && (
                        <ModalControlButton bgcolor="#26ca3f">
                            {/* #27c93f */}
                            <MaximizeIcon />
                        </ModalControlButton>
                    )}
                </ModalControls>

                {title && <ModalTitle>{title}</ModalTitle>}
            </ModelHeader>
            
            { content && <ModalContent>{content}</ModalContent>}
            { footer && <ModalFoter>{footer}</ModalFoter>}
        </ModalPopupWrap>
    );
};

ModalPopup.propTypes = {
    button_disabled: PropTypes.objectOf(PropTypes.bool),
    modal_width: PropTypes.string,
    modal_height: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string,
    content: PropTypes.any,
    footer: PropTypes.any,
    onClosePopup: PropTypes.func.isRequired,
};

ModalPopup.defaultProps = {
    button_disabled: {
        Maximize: false,
        Minimization: false,
    },
    title: '모달 팝업',
    content: '컨텐츠 영역',
    footer: '하단 영역',
    modal_width: '300',
    modal_height: 'auto',
};

export default ModalPopup;