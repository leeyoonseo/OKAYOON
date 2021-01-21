import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { 
    CommonModalWrap, HeaderWrap, ContentWrap, FooterWrap,
    ControlButtonWrap, ControlButton, 
    CloseIcon, MinIcon, MaxIcon, 
    Title
} from './styles';

const CommonModal = ({ 
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
                    <ControlButton bgcolor="#ff6059" onClick={onClosePopup(false)}>
                        <CloseIcon />
                    </ControlButton>
                    <ControlButton bgcolor="#ffbc28">
                        <MinIcon />
                    </ControlButton>
                    <ControlButton bgcolor="#26ca3f">
                        <MaxIcon />
                    </ControlButton>
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
    title: PropTypes.string,
    content: PropTypes.any,
    bottom: PropTypes.any,
    sizew: PropTypes.string,
    sizeh: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    onClosePopup: PropTypes.func.isRequired,
};

CommonModal.defaultProps = {
    title: '모달 팝업',
    content: '컨텐츠 영역',
    bottom: '하단 영역',
    sizew: '300',
    sizeh: 'auto',
};

export default CommonModal;