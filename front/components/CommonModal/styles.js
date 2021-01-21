import styled from 'styled-components';

import { Layout } from 'antd';
import { CloseOutlined, MinusOutlined, FullscreenOutlined } from '@ant-design/icons';

export const CommonModalWrap = styled(Layout)`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${props => props.sizew}px;
    height: ${props => props.sizeh}px;
    transform: translate(-50%, -50%);
    z-index: 100;
`;

export const HeaderWrap = styled(Layout.Header)`
    padding: 5px 3%;
    position: relative;
    height: 45px;
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
`;

export const CloseIcon = styled(CloseOutlined)`
    ${iconCommonStyled}
`;

export const MinIcon = styled(MinusOutlined)`
    ${iconCommonStyled}
`;

export const MaxIcon = styled(FullscreenOutlined)`
    ${iconCommonStyled}
`;

export const Title = styled.div`
    display: inline-block;
    padding-top: 10px;
    width: 100%;
    font-size: 13px;
    line-height: 1.5;
`;
