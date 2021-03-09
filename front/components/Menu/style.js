import styled from 'styled-components';
import { colors, calcRem } from '../../theme/styles';
import { UpCircleOutlined } from '@ant-design/icons';

export const Wrap = styled.div`
    position: relative;
`;

export const MenuButton = styled.button`
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    outline: none;

    &:hover {
        background: none;
    }

    &:hover,
    &.active {
        opacity: 0.5;
    }
`;

export const MenuIcon = styled(UpCircleOutlined)`
    font-size: ${calcRem(17)};
    color: ${colors.white};
`;

export const MenuTooltip = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    min-width: ${calcRem(250)};
    text-align: center;
    border-radius: ${calcRem(10)} ${calcRem(10)}; 0 0;
    background: ${colors.rgbaGray};
    transform: translate(-50%, -100%);
    overflow: hidden;
`;

export const SiteName = styled.span`
    padding: ${calcRem(10)};
    display: inline-block;
    width: 100%;
    cursor: default;
    background: ${colors.black};

    span {
        margin-right: ${calcRem(2)};
    }
`;

export const List = styled.ul`
    padding: 0;
    list-style: none;
`;

export const Item = styled.li`
    padding: ${calcRem(10)}; 0;
`;

export const ItemButton = styled.button`
    font-size: ${calcRem(16)};
    border: none;
    background: none;
    outline: none;
    cursor: pointer;

    &:hover,
    &:focus {
        opacity: 0.5;
        background: none;
    }
`;

export const GitAnchor = styled.a`
    display: inline-block;
    font-size: ${calcRem(16)};
    color: ${colors.white};

    &:hover { 
        color: ${colors.white};
        opacity: 0.8;
    }

    span {
        margin-left: ${calcRem(5)};
        vertical-align: middle;
    }
`;

