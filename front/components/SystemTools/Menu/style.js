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

    &:hover,
    &:focus {
        background: none;
    }

    &:hover,
    &:focus,
    &.active{
        opacity: 0.5;
    }
`;

export const MenuIcon = styled(MenuOutlined)`
    font-size: 17px;
    color: ${props => props.themecolor};
`;

export const MenuTooltip = styled.div`
    position: absolute;
    top: 30px;
    right: 0;
    padding-top: 15px;
    display: none;
    width: 80px;
    height: 125px;
    background: rgba(0, 0, 0, 0.4); 
    clip-path: polygon(90% 10%,100% 10%,100% 100%,0 100%,0 10%,74% 10%,90% 0);

    &.active {
        display: block;
    }
`;

export const List = styled.ul`
    padding: 0;
    list-style: none;
`;

export const Item = styled.li`
    padding: 10px 0;
    text-align: center;
`;

export const ItemButton = styled.button`
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
