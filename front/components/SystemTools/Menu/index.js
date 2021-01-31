import React, { useRef, useEffect, useCallback, useState } from "react";
import Router from 'next/router';
import styled from 'styled-components';

import { MenuOutlined } from '@ant-design/icons';

const Wrap = styled.div`
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

const MenuTooltip = styled.div`
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

const List = styled.ul`
    padding: 0;
    list-style: none;
`;

const Item = styled.li`
    padding: 10px 0;
    text-align: center;
`;

const ItemButton = styled.button`
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

const Menu = ({ themecolor }) => {
    const menuRef = useRef(null);
    const [isVisibleMenu, setIsVisiMenu] = useState(false);

    useEffect(() => {
        document.addEventListener("click", onClickOutside);

        return () => {
            document.removeEventListener("click", onClickOutside);
        };
    }, []);

    const onClickOutside = useCallback(({ target }) => {
        if (menuRef.current && !menuRef.current.contains(target)) {
            setIsVisiMenu(false);
        }
    }, []);

    const onToggleMenu = useCallback(() => setIsVisiMenu(!isVisibleMenu), [isVisibleMenu]);
    const onClickLogout = useCallback(() => Router.replace('./sleep'), []);


    return(
        <Wrap ref={menuRef}>
            <MenuButton onClick={onToggleMenu}>
                <MenuIcon themecolor={themecolor} />
            </MenuButton>

            {isVisibleMenu && (
                    <MenuTooltip className={isVisibleMenu ? 'active' : ''}>
                        <List>
                            <Item>
                                <ItemButton 
                                    // onClick={onClickWelcome}
                                >
                                    Welcome
                                </ItemButton>
                            </Item>
        
                            <Item>
                                <ItemButton 
                                    // onClick={onClickInfo}
                                >
                                    Info
                                </ItemButton>
                            </Item>
        
                            <Item>
                                <ItemButton onClick={onClickLogout}>
                                    Sleep
                                </ItemButton>
                            </Item>
                        </List>
                    </MenuTooltip>
                )}

            {/* <ModalPopup 
                visible={isVisibleWelcome} 
                modal_width="300px"
                modal_height="300px"
                title="Welcome"
                onClose={onCloseWelcome}
            >
                <ModalContentWelcome />
            </ModalPopup> */}
{/* 
            <ModalPopup 
                visible={isVisibleInfo} 
                modal_width="300px"
                modal_height="300px"
                title="기술"
                onClose={onCloseInfo}
            >
                <ModalContentInfo />
            </ModalPopup> */}

        </Wrap>
    );
};

export default Menu;

// TODO:
// - 최소화 문제로 인해 각각 컴포넌트를 렌더링해야하는가? (별도로)
// - welcome (소개)
// - Info (출처, 소스 정보, 라이브러리 정보등등..)
// - logout (login 페이지로 이동)