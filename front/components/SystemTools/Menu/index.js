import React, { useRef, useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';

import { ALL_CLOSED_MODAL, CREATE_MODAL_REQUEST, TOGGLE_MODAL_REQUEST } from '../../../reducers/site';
import { LOG_OUT_ADMIN_REQUEST, LOG_OUT_REQUEST } from "../../../reducers/user";

import { 
    WELCOME_MODAL_ID, WELCOME_MODAL_DATA, 
    INFO_MODAL_ID, INFO_MODAL_DATA,
} from '../../ModalPopup/data';

import { 
    Wrap, MenuButton, MenuIcon, MenuTooltip, 
    List, Item, ItemButton,
} from './style';

const Menu = ({ themecolor }) => {
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.user);
    const { modals } = useSelector((state) => state.site);
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

    const onClickLogout = useCallback(() => {
        const type = admin.userId ? LOG_OUT_ADMIN_REQUEST : LOG_OUT_REQUEST;  
        
        dispatch({ type: ALL_CLOSED_MODAL });
        dispatch({ type: type });
    }, [admin]);

    const createModal = useCallback((id) => {
        if(modals.find((v) => v.id === id)){
            return false;
        }
        
        let data = '';
        
        if(id === WELCOME_MODAL_ID){
            data = WELCOME_MODAL_DATA;
        } else if(id === INFO_MODAL_ID){
            data = INFO_MODAL_DATA;
        }

        console.log('==================createModal');
        dispatch({
            type: CREATE_MODAL_REQUEST,
            data: data
        })
    }, [modals]);

    const onClickItem = useCallback((id) => () => {
        createModal(id);
        setIsVisiMenu(false);
            
        dispatch({
            type: TOGGLE_MODAL_REQUEST,
            data: id
        });
    }, [modals]);

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
                                onClick={onClickItem(WELCOME_MODAL_ID)}    
                            >
                                Welcome
                            </ItemButton>
                        </Item>
    
                        <Item>
                            <ItemButton 
                                onClick={onClickItem(INFO_MODAL_ID)}
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
        </Wrap>
    );
};

Menu.propTypes = {
    themecolor: PropTypes.string,
};

Menu.defaultProps = {
    themecolor: '#333',
};

export default Menu;

// TODO:
// - 최소화 문제로 인해 각각 컴포넌트를 렌더링해야하는가? (별도로)
// - welcome (소개)
// - Info (출처, 소스 정보, 라이브러리 정보등등..)
// - logout (login 페이지로 이동)