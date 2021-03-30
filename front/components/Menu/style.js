import styled from 'styled-components';
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
    font-size: ${({ theme }) => theme.calcRem(20)};
    color: white;
`;

export const MenuTooltip = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    min-width: ${({ theme }) => theme.calcRem(250)};
    text-align: center;
    border-radius: ${({ theme }) => theme.calcRem(10)} ${({ theme }) => theme.calcRem(10)}; 0 0;
    background: ${({ theme }) => theme.colors.rgbaGray};
    transform: translate(-50%, -100%);
    overflow: hidden;
`;

export const SiteName = styled.span`
    padding: ${({ theme }) => theme.calcRem(10)};
    display: inline-block;
    width: 100%;
    cursor: default;
    background: ${({ theme }) => theme.colors.black};

    span {
        margin-right: ${({ theme }) => theme.calcRem(2)};
    }
`;

export const List = styled.ul`
    padding: 0;
    list-style: none;
`;

export const Item = styled.li`
    padding: ${({ theme }) => theme.calcRem(10)}; 0;
`;

export const ItemButton = styled.button`
    font-size: ${({ theme }) => theme.calcRem(16)};
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
    font-size: ${({ theme }) => theme.calcRem(16)};
    color: white;

    &:hover { 
        color: white;
        opacity: 0.8;
    }

    span {
        margin-left: ${({ theme }) => theme.calcRem(5)};
        vertical-align: middle;
    }
`;

