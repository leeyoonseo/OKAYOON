import React, { useRef, useEffect, useCallback, useState } from "react";
import Router from 'next/router';
import styled from 'styled-components';

import MenuPopup from './MenuPopup';
import ModalPopup from '../../ModalPopup/index';

import { MenuOutlined } from '@ant-design/icons';

const MenuWrap = styled.div`
    position: relative;
`;

const MenuButton = styled.button`
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

const MenuIcon = styled(MenuOutlined)`
    font-size: 17px;
    color: ${props => props.themecolor};
`;

const Menu = ({ themecolor }) => {
    const popRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const onClickOutside = useCallback(({ target }) => {
        if (popRef.current && !popRef.current.contains(target)) {
            setIsOpen(false);
        }
    }, []);

    const onToggleMenu = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const onClickWelcome = useCallback(() => {
        console.log('onClickWelcome')
    }, []);

    const onClickSource = useCallback(() => {
        console.log('onClickSource')

    }, []);

    const onClickLogout = useCallback(() => {
        console.log('onClickLogout')
        Router.replace('./login');
    }, []);

    useEffect(() => {
        document.addEventListener("click", onClickOutside);

        return () => {
            document.removeEventListener("click", onClickOutside);
        };
    }, []);

    return(
        <MenuWrap ref={popRef}>
            <MenuButton onClick={onToggleMenu}>
                <MenuIcon themecolor={themecolor} />
            </MenuButton>

            <MenuPopup 
                isOpen={isOpen} 
                onClickWelcome={onClickWelcome}
                onClickSource={onClickSource}
                onClickLogout={onClickLogout}
            />
        </MenuWrap>
    );
};

export default Menu;

// TODO
// - welcome (소개)
// - source (출처, 소스 정보, 라이브러리 정보등등..)
// - logout (login 페이지로 이동)