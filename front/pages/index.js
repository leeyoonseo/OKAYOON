import React, { useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { ThemeContext } from 'styled-components';
import Router from 'next/router';
import Head from 'next/head';
import { TOGGLE_MODAL_REQUEST } from '../reducers/site';
import { LOAD_ADMIN_INFO_REQUEST, LOAD_USER_INFO_REQUEST } from '../reducers/user';
import { isEmptyObj } from '../util/common';

import AppLayout from './AppLayout';
import AppIndex from '../components/App/index';
import Menu from '../components/Menu/index';
import ModalPopup from '../components/ModalPopup/index';
import Loading from '../components/Loading';

const Home = () => {
    const dispatch = useDispatch();
    const themeContext = useContext(ThemeContext);
    const { modals, modalToggleLoading } = useSelector((state) => state.site);
    const { me, admin, loadAdminInfoDone, logOutDone, } = useSelector((state) => state.user);  
    const [cookies] = useCookies(['me']);

    useEffect(() => {
        if (!isEmptyObj(admin) || !isEmptyObj(me) || logOutDone) return;

        if (cookies.me) {
            const { avatar, nickname } = cookies.me;
            dispatch({
                type: LOAD_USER_INFO_REQUEST,
                data: {
                    avatar: avatar,
                    nickname: nickname
                }
            });

        } else {
            dispatch({
                type: LOAD_ADMIN_INFO_REQUEST,
            });
        }
    }, [me, admin, cookies.me, logOutDone]);

    useEffect(() => {
        if (loadAdminInfoDone) {
            if (isEmptyObj(admin) && isEmptyObj(me)){
                return Router.push('/login');
            }
        }
    }, [loadAdminInfoDone]);
    
    /** @params {string} id: 팝업 아이디 */
    const onToggleModal = useCallback((id) => () => {
        dispatch({
            type: TOGGLE_MODAL_REQUEST,
            data: id
        });
    }, []);

    return (
        <>
            <Head>
                <title>OKAYOON | HOME</title>
            </Head>
            
            {(me.avatar || admin.userId) && (
                <AppLayout
                    bgcolor={themeContext.colors.mint}
                    main={
                        <>
                            <AppIndex />

                            {modalToggleLoading && <Loading />}
                            {modals?.map((v) => {
                                if (!v) return;

                                return (
                                    <ModalPopup 
                                        key={v.id} 
                                        onCloseModal={onToggleModal} 
                                        {...v}
                                    >
                                        <v.content 
                                            id={v.id}
                                            onCloseModal={onToggleModal}
                                        />  
                                    </ModalPopup>
                                );
                            })}
                        </>
                    }

                    footer={<Menu />}
                />
            )}
        </>
    );
};

export default Home;