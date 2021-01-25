import styled from 'styled-components';

import { Layout } from 'antd';
import { CloseOutlined, MinusOutlined, FullscreenOutlined } from '@ant-design/icons';

export const CommonModalWrap = styled(Layout)`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${props => props.sizew}px;
    border-radius: 5px;
    height: ${props => props.sizeh}px;
    transform: translate(-50%, -50%);
    z-index: 100;
    overflow: hidden;
`;

export const HeaderWrap = styled(Layout.Header)`
    padding: 10px 3%;
    position: relative;
    height: auto;
    line-height: 1;
    background: #dedede;
    color: #333;
`;

export const ContentWrap = styled(Layout.Content)`
    padding: 5px 3%;
    font-size: 13px;
    color: #333;
`;

export const FooterWrap = styled(Layout.Footer)`
    padding: 5px 3%;
    font-size: 13px;
    color: #333;
    background: none;
`;

export const ControlButtonWrap = styled.div` 
    display: inline-block;
    position: absolute;
    left: 3%;
`;
export const ControlButton = styled.button`
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
    opacity: 0;

    &:hover {
        opacity: 0.5;
    }
`;

export const CloseIcon = styled(CloseOutlined)`
    ${iconCommonStyled}
`;

export const MinimizationIcon = styled(MinusOutlined)`
    ${iconCommonStyled}
`;

export const MaximizeIcon = styled(FullscreenOutlined)`
    ${iconCommonStyled}
`;

export const Title = styled.div`
    display: inline-block;
    max-width: 300px;
    width: 100%;
    font-size: 13px;
    line-height: 1.5;
`;
