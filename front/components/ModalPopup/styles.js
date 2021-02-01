import styled, { css, keyframes } from 'styled-components';

import { Layout } from 'antd';
import { CloseOutlined, MinusOutlined, FullscreenOutlined } from '@ant-design/icons';

// const fadeOut = keyframes`
//     from {
//         opacity: 1;
//     }
//     to {
//         opacity: 0;
//     }
// `;

// const fadeIn = keyframes`
//     from {
//         opacity: 0;
//     }
//     to {
//         opacity: 1;
//     }
// `;

export const Wrap = styled(Layout)`
    display: none;
    position: fixed;
    top: ${props => props.x}%;
    left: ${props => props.y}%;
    width: ${props => props.w};
    height: ${props => props.h};
    border-radius: 5px;
    transform: translate(-50%, -50%);
    z-index: ${props => props.z};
    overflow: hidden;
    box-shadow: 1px 1px 10px rgba(0,0,0,0.5);

    &.active {
        display: block;
    }

    &.min {
        top: auto;
        bottom: 0;
        width: 150px;
        height: 25px;
        background: #dedede;
        border-radius: 5px 5px 0 0;
        transition: all 0.3s;

        button {
            position: absolute;
            top: 0;
            left: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            outline: none;
            border: none;
            cursor: pointer;
        }
    }
`;

export const Header = styled(Layout.Header)`
    padding: 10px 3%;
    position: relative;
    height: auto;
    text-align: center;
    line-height: 1;
    background: #dedede;
    color: #333;
`;

export const Content = styled(Layout.Content)`
    padding: 5px 3%;
    height: 100%;
    font-size: 13px;
    color: #333;
    box-sizing: border-box;
    overflow-y: auto;
`;

// export const Footer = styled(Layout.Footer)`
//     padding: 5px 3%;
//     font-size: 13px;
//     color: #333;
//     background: none;
// `;

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

export const CloseIcon = styled(CloseOutlined)`
    ${defaultIconStyle}
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

// 최소화
export const MiniWrap = styled.div`
    position: absolute;
    bottom: 2%;
    left: 2%;
    width: 150px;
    height: 25px;
    line-height: 1;
    background: #dedede;
    border-radius: 5px 5px 0 0;
    overflow: hidden;

    button {
        padding: 0;
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        cursor: pointer;
    }
`;