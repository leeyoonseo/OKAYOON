import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MenuPopupWrap = styled.div`
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

const MenuList = styled.ul`
    padding: 0;
    list-style: none;
`;

const MenuListItem = styled.li`
    padding: 10px 0;
    text-align: center;
`;

const MenuButton = styled.button`
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

const MenuPopup = ({ 
    isVisibleMenu, onClickWelcome, onClickInfo
}) => {
    const onClickLogout = useCallback(() => Router.replace('./sleep'), []);
    
    return (
        <>
            <MenuPopupWrap className={isVisibleMenu ? 'active' : ''}>
                <MenuList>
                    <MenuListItem>
                        <MenuButton onClick={onClickWelcome}>
                            Welcome
                        </MenuButton>
                    </MenuListItem>

                    <MenuListItem>
                        <MenuButton onClick={onClickInfo}>
                            Info
                        </MenuButton>
                    </MenuListItem>

                    <MenuListItem>
                        <MenuButton onClick={onClickLogout}>
                            Sleep
                        </MenuButton>
                    </MenuListItem>
                </MenuList>
            </MenuPopupWrap>
        </>
    );
};

MenuPopup.propTypes = {
    isVisibleMenu: PropTypes.bool.isRequired,
    onClickWelcome: PropTypes.func,
    onClickInfo: PropTypes.func,
};

MenuPopup.defaultProps = {
    isVisibleMenu: false,
};

export default MenuPopup;