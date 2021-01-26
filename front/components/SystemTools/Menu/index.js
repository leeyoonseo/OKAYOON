import React, { useRef, useEffect, useCallback, useState } from "react";
import Router from 'next/router';
import styled from 'styled-components';

import MenuPopup from './MenuPopup';
import ModalPopup from '../../ModalPopup/index';
import ModalContentWelcome from './ModalContentWelcome';
import ModalContentSource from './ModalContentSource';

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
    const menuRef = useRef(null);
    const [isVisibleMenu, setIsVisibleMenu] = useState(false);
    const [isVisibleWelcome, setIsVisibleWelcome] = useState(false);
    const [isVisibleSource, setIsVisibleSource] = useState(false);

     useEffect(() => {
        document.addEventListener("click", onClickOutside);

        return () => {
            document.removeEventListener("click", onClickOutside);
        };
    }, []);

    const onClickOutside = useCallback(({ target }) => {
        if (menuRef.current && !menuRef.current.contains(target)) {
            setIsVisibleMenu(false);
        }
    }, []);

    const onToggleMenu = useCallback(() => setIsVisibleMenu(!isVisibleMenu), [isVisibleMenu]);
    const onCloseWelcome = useCallback((isOk) => () => setIsVisibleWelcome(false), []);
    const onClickWelcome = useCallback(() => {
        setIsVisibleWelcome(true);
        setIsVisibleMenu(false);
    }, []);

    const onCloseSource = useCallback((isOk) => () => setIsVisibleSource(false), []);
    const onClickWSource = useCallback(() => {
        setIsVisibleSource(true);
        setIsVisibleMenu(false);
    }, []);

    return(
        <MenuWrap ref={menuRef}>
            <MenuButton onClick={onToggleMenu}>
                <MenuIcon themecolor={themecolor} />
            </MenuButton>

            <MenuPopup 
                isVisibleMenu={isVisibleMenu}
                onClickWelcome={onClickWelcome}
                onClickWSource={onClickWSource}
            />

            <ModalPopup 
                visible={isVisibleWelcome} 
                modal_width="300px"
                modal_height="300px"
                title="Welcome"
                onClose={onCloseWelcome}
            >
                <ModalContentWelcome />
            </ModalPopup>

            <ModalPopup 
                visible={isVisibleSource} 
                modal_width="300px"
                modal_height="300px"
                title="기술"
                onClose={onCloseSource}
            >
                <ModalContentSource />
            </ModalPopup>

        </MenuWrap>
    );
};

export default Menu;

// TODO:
// - 최소화 문제로 인해 각각 컴포넌트를 렌더링해야하는가? (별도로)
// - welcome (소개)
// - source (출처, 소스 정보, 라이브러리 정보등등..)
// - logout (login 페이지로 이동)