import styled from 'styled-components';
import { MenuOutlined } from '@ant-design/icons';

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

export const MenuIcon = styled(MenuOutlined)`
    font-size: 17px;
    color: ${props => props.themecolor};
`;

export const MenuTooltip = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    min-width: 250px;
    background: rgba(86, 98, 112, 0.5);
    transform: translateY(-100%);
`;

export const SiteName = styled.span`
    padding: 0.625rem;
    display: inline-block;
    width: 100%;
    text-align: left;
    cursor: default;
    background: #566270;

    span {
        margin-right: 2px;
    }
`;

export const List = styled.ul`
    padding: 0;
    list-style: none;
`;

export const Item = styled.li`
    padding: 0.625rem 0;
    text-align: center;
`;

export const ItemButton = styled.button`
    font-size: 1rem;
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
    font-size: 1rem;
    color: ${props => props.themecolor};

    &:hover { 
        color: ${props => props.themecolor};
        opacity: 0.8;
    }

    span {
        margin-left: 0.313rem;
        vertical-align: middle;
    }
`;

