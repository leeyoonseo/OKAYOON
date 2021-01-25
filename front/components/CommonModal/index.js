import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { 
    CommonModalWrap, HeaderWrap, ContentWrap, FooterWrap,
    ControlButtonWrap, ControlButton, 
    CloseIcon, MinimizationIcon, MaximizeIcon, 
    Title
} from './styles';

const CommonModal = ({ 
    buttonState,
    sizew, sizeh ,visible, 
    title, content, bottom,  
    onClosePopup 
}) => {

    return (
        <CommonModalWrap 
            className={visible && "active"}
            sizew={sizew}
            sizeh={sizeh}
        >
            <HeaderWrap>
                <ControlButtonWrap>
                    <ControlButton 
                        bgcolor="#ff6059" 
                        onClick={onClosePopup(false)}
                    >
                        <CloseIcon />
                    </ControlButton>

                    {buttonState.Minimization && (
                        <ControlButton bgcolor="#ffbc28">
                            <MinimizationIcon />
                        </ControlButton>
                    )}
                    
                    {buttonState.Maximize && (
                        <ControlButton bgcolor="#26ca3f">
                            <MaximizeIcon />
                        </ControlButton>
                    )}
                </ControlButtonWrap>

                {title && <Title>{title}</Title>}
            </HeaderWrap>
            
            { content && (
                <ContentWrap>
                    {content}
                </ContentWrap>
            )}

            { bottom && (
                <FooterWrap>
                    {bottom}
                </FooterWrap>
            )}
        </CommonModalWrap>
    );
};

CommonModal.propTypes = {
    buttonState: PropTypes.objectOf(PropTypes.bool),
    title: PropTypes.string,
    content: PropTypes.any,
    bottom: PropTypes.any,
    sizew: PropTypes.string,
    sizeh: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    onClosePopup: PropTypes.func.isRequired,
};

CommonModal.defaultProps = {
    buttonState: {
        Maximize: true,
        Minimization: true,
    },
    title: '모달 팝업',
    content: '컨텐츠 영역',
    bottom: '하단 영역',
    sizew: '300',
    sizeh: 'auto',
};

export default CommonModal;