import styled, { css, keyframes } from 'styled-components';

import { Layout } from 'antd';
import { MinusOutlined, FullscreenOutlined } from '@ant-design/icons';

export const Wrap = styled.div`
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    width: ${props => props.w};
    height: ${props => props.h};
    color: ${props => props.theme === 'normal' ? '#566270' : '#FFFFF3'};
    font-size: 1rem;
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
    background: #f0f2f5;
`;

export const Header = styled.div`
    position: relative;
    height: auto;
    text-align: center;
    line-height: 1;
    background: none;
    color: #f0f2f5;
    cursor: default;
`;

export const HeaderInner = styled(Layout.Header)`
    padding: 0.625rem 2%;
    width: 100%;
    height: 100%;
    line-height: 1;
    background: #A593E0;
    color: #f0f2f5;
`;

export const Content = styled(Layout.Content)`
    padding: 0.938rem 2%;
    height: 100%;
    background: none;
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
    color: #FFFFF3;
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
`;