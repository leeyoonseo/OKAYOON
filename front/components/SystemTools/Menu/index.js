import React, { useRef, useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';

import { CREATE_MODAL_REQUEST } from '../../../reducers/site';

import { WELCOME_MODAL_ID, WELCOME_MODAL_DATA } from '../../ModalPopup/Content/Welcome';

import { 
    Wrap, MenuButton, MenuIcon, MenuTooltip, 
    List, Item, ItemButton,
} from './style';

const Menu = ({ themecolor }) => {
    const dispatch = useDispatch();
    const { modals } = useSelector((state) => state.site);
    const menuRef = useRef(null);
    const [isVisibleMenu, setIsVisiMenu] = useState(false);

    useEffect(() => {
        document.addEventListener("click", onClickOutside);

        return () => {
            document.removeEventListener("click", onClickOutside);
        };
    }, []);

    useEffect(() => {
        const modal = modals.find((v) => v.id === WELCOME_MODAL_ID);
        console.log('menu, index modals', modal);

        if(!modal){
            dispatch({
                type: CREATE_MODAL_REQUEST,
                data: WELCOME_MODAL_DATA
            })
        }
    }, []);

    const onClickOutside = useCallback(({ target }) => {
        if (menuRef.current && !menuRef.current.contains(target)) {
            setIsVisiMenu(false);
        }
    }, []);

    const onToggleMenu = useCallback(() => setIsVisiMenu(!isVisibleMenu), [isVisibleMenu]);
    const onClickLogout = useCallback(() => Router.replace('./login'), []);

    const onClickWelcome = useCallback(() => {
        console.log('onClickWelcome.');
        setIsVisiMenu(false);
    }, []);

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
                                    onClick={onClickWelcome}    
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
                                    Logout
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