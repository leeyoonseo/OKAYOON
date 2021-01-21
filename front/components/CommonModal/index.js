import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Layout } from 'antd';
import { CloseOutlined, MinusOutlined, FullscreenOutlined } from '@ant-design/icons';

const CommonModalWrap = styled(Layout)`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${props => props.size}px;
    transform: translate(-50%, -50%);
    z-index: 100;
`;

const HeaderWrap = styled(Layout.Header)`
    padding: 5px 3%;
    position: relative;
    height: 45px;
    line-height: 1;
    background: #dedede;
    color: #333;
`;

const ContentWrap = styled(Layout.Content)`
    padding: 5px 3%;
    font-size: 13px;
    color: #333;
`;

const FooterWrap = styled(Layout.Footer)`
    padding: 5px 3%;
    font-size: 13px;
    color: #333;
    background: none;
`;

const ButtonsWrap = styled.div` 
    display: inline-block;
    position: absolute;
    left: 3%;
`;
const ControlButton = styled.button`
    padding: 0;
    width: 15px;
    height 15px;
    border: none;
    border-radius: 50%;
    background:${props => props.bgcolor};
    cursor: pointer;
    outline: none;

    & + button {
        margin-left: 7px;
    }
`;

const iconCommonStyled = `
    display:flex;
    font-size: 10px;
    color: #fff;
    justify-content: center;
    align-items: center;
`;

const CloseIcon = styled(CloseOutlined)`
    ${iconCommonStyled}
`;

const MinIcon = styled(MinusOutlined)`
    ${iconCommonStyled}
`;

const MaxIcon = styled(FullscreenOutlined)`
    ${iconCommonStyled}
`;

const Title = styled.div`
    display: inline-block;
    padding-top: 10px;
    width: 100%;
    font-size: 13px;
    line-height: 1.5;
`;

const CommonModal = ({ title, content, bottom, size }) => {
    return (
        <CommonModalWrap size={size}>
            <HeaderWrap>
                <ButtonsWrap>
                    <ControlButton bgcolor="#ff6059">
                        <CloseIcon />
                    </ControlButton>
                    <ControlButton bgcolor="#ffbc28"><MinIcon /></ControlButton>
                    <ControlButton bgcolor="#26ca3f"><MaxIcon /></ControlButton>
                </ButtonsWrap>

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
    top: PropTypes.node, 
    content: PropTypes.node, 
    bottom: PropTypes.node, 
    size: PropTypes.string, 
};

CommonModal.defaultProps = {
    top: 'Modal', 
    content: PropTypes.node, 
    bottom: PropTypes.node, 
    size: PropTypes.string, 
}

export default CommonModal;