import React, { useRef, useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from 'react-cookie';
import { ALL_CLOSED_MODAL, CREATE_MODAL_REQUEST, TOGGLE_MODAL_REQUEST } from '../../reducers/site';
import { LOG_OUT_ADMIN_REQUEST, LOG_OUT_REQUEST } from "../../reducers/user";
import { 
    WELCOME_MODAL_ID, WELCOME_MODAL_DATA, 
    INFO_MODAL_ID, INFO_MODAL_DATA, 
} from "../ModalPopup/data";
import { 
    Wrap, MenuButton, MenuIcon, MenuTooltip, 
    List, Item, ItemButton, SiteName, GitAnchor,
} from './style';
import { SmileOutlined, GithubOutlined } from '@ant-design/icons';

const Menu = () => {
    const dispatch = useDispatch();
    const { me, admin } = useSelector(state => state.user);
    const { modals } = useSelector(state => state.site);
    const [cookie, setCookie, removeCookie] = useCookies(['me']);
    const [openedMenu, setOpenedMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        document.addEventListener('click', onClickOutside);

        return () => {
            document.removeEventListener('click', onClickOutside);
        };
    }, []);

    const onClickOutside = useCallback(({ target }) => {
        const { current } = menuRef;

        if (current && !current.contains(target)) {
            setOpenedMenu(false);
        }
    }, [menuRef]);

    const onToggleMenu = useCallback(() => setOpenedMenu(!openedMenu), [openedMenu]);

    const onClickLogout = useCallback(() => {
        const type = (admin.userId) ? LOG_OUT_ADMIN_REQUEST : LOG_OUT_REQUEST;

        if (!admin.userId) {
            removeCookie('me');
        }
        
        dispatch({ type: ALL_CLOSED_MODAL });
        dispatch({ type });
    }, [admin, me]);

    const createModal = useCallback(id => {
        dispatch({
            type: CREATE_MODAL_REQUEST,
            data: (id === WELCOME_MODAL_ID) 
                    ? WELCOME_MODAL_DATA 
                    : INFO_MODAL_DATA,
        })
    }, [modals]);

    const onClickItem = useCallback(id => () => {
        const isSameModal = modals.some(({ id: modalId }) => modalId === id);
        
        if(!isSameModal) {
            createModal(id);
        }

        setOpenedMenu(false);
            
        dispatch({
            type: TOGGLE_MODAL_REQUEST,
            data: id
        });
    }, [modals]);

    return(
        <Wrap ref={menuRef}>
            <MenuButton onClick={onToggleMenu}>
                <MenuIcon />
            </MenuButton>

            {openedMenu && (
                <MenuTooltip>
                    <SiteName>
                        <span><SmileOutlined /></span>Kayoon.LEE
                    </SiteName>
                    
                    <List>
                        <Item>
                            <GitAnchor 
                                href="https://github.com/leeyoonseo"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                Github
                                <GithubOutlined style={{ color: 'white' }}/>
                            </GitAnchor>
                        </Item>
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

export default Menu;