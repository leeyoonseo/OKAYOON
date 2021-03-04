import styled, { css, keyframes } from 'styled-components';

import { Layout } from 'antd';
import { CloseOutlined, MinusOutlined, FullscreenOutlined } from '@ant-design/icons';
export const Wrap = styled.div`
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    width: ${props => props.w};
    height: ${props => props.h};
    color: ${props => props.theme === 'normal' ? '#333' : '#fff'};
    border-radius: 5px;
    transform: translate(-50%, -50%);
    z-index: ${props => props.z};
    overflow: hidden;
    box-shadow: 1px 1px 10px rgba(0,0,0,0.5);

    &.visible {
        display: block;
    }
`;

export const WrapInner = styled(Layout)`
    width: 100%;
    height: 100%;
    background:${props => props.theme === 'normal' ? '#f0f2f5' : '#333'};
`;

export const Header = styled.div`
    position: relative;
    height: auto;
    text-align: center;
    line-height: 1;
    background: none;
    color: #333;
    cursor: default;
`;

export const HeaderInner = styled(Layout.Header)`
    padding: 10px 3%;
    width: 100%;
    height: 100%;
    line-height: 1;
    background:${props => props.theme === 'normal' ? '#dedede' : '#000'};
    color:${props => props.theme === 'normal' ? '#333' : '#fff'};
`;

export const Content = styled(Layout.Content)`
    padding: 3%;
    height: 100%;
    font-size: 13px;
    box-sizing: border-box;
    overflow-y: auto;
`;

export const Controls = styled.div` 
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

const defaultIconStyle = css`
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

export const MinimizationIcon = styled(MinusOutlined)`
    ${defaultIconStyle}
`;

export const MaximizeIcon = styled(FullscreenOutlined)`
    ${defaultIconStyle}
`;

export const Title = styled.div`
    display: inline-block;
    max-width: 300px;
    width: 100%;
    font-size: 13px;
    line-height: 1.5;
`;