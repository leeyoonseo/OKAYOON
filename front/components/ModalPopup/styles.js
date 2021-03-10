import styled, { css, keyframes } from 'styled-components';
import { colors, calcRem } from '../../theme/styles';

import { Layout } from 'antd';
import { MinusOutlined, FullscreenOutlined } from '@ant-design/icons';

export const Wrap = styled.div`
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    width: ${({ w }) => w};
    height: ${({ h }) => h};
    color: ${({ theme }) => theme === 'normal' ? colors.black : colors.white};
    font-size: ${calcRem(16)};
    border-radius: ${calcRem(5)};
    transform: translate(-50%, -50%);
    z-index: ${({ z }) => z};
    overflow: hidden;
    box-shadow: ${calcRem(1)} ${calcRem(1)} ${calcRem(10)} rgba(0,0,0,0.5);

    &.visible {
        display: block;
    }
`;

export const WrapInner = styled(Layout)`
    width: 100%;
    height: 100%;
    background: ${colors.lightGray};
`;

export const Header = styled.div`
    position: relative;
    height: auto;
    text-align: center;
    line-height: 1;
    background: none;
    color: ${colors.lightGray};
    cursor: default;
`;

export const HeaderInner = styled(Layout.Header)`
    padding: ${calcRem(10)} 2%;
    width: 100%;
    height: 100%;
    line-height: 1;
    background: ${colors.purple};
    color: ${colors.lightGray};
`;

export const Content = styled(Layout.Content)`
    padding: ${calcRem(15)} 2%;
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
    width: ${calcRem(15)};
    height ${calcRem(15)};
    border: none;
    border-radius: 50%;
    background:${({ bgcolor }) => bgcolor};
    cursor: pointer;
    outline: none;

    & + button {
        margin-left: ${calcRem(7)};
    }
`;

const defaultIconStyle = css`
    display:flex;
    font-size: 10px;
    color: ${colors.white};
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
    max-width: ${calcRem(300)};
    width: 100%;
`;