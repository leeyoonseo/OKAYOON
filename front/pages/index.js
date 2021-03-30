import React, { useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { ThemeContext } from 'styled-components';
import Router from 'next/router';
import Head from 'next/head';

import { TOGGLE_MODAL_REQUEST } from '../reducers/site';
import { LOAD_ADMIN_INFO_REQUEST, LOG_IN_REQUEST } from '../reducers/user';

import AppLayout from './AppLayout';
import AppIndex from '../components/App/index';
import Menu from '../components/Menu/index';
import ModalPopup from '../components/ModalPopup/index';
import Loading from '../components/Loading';


const Home = () => {
    const dispatch = useDispatch();
    const themeContext = useContext(ThemeContext);
    const { modals, modalToggleLoading } = useSelector((state) => state.site);
    const { me, admin, logInDone, loadInfoDone } = useSelector((state) => state.user);
    const [cookie] = useCookies(['me']);

    useEffect(() => {
        if (logInDone) return;

        if (cookie.me) {
            return dispatch({
                type: LOG_IN_REQUEST,
                data: {
                    avatar: cookie.me.avatar,
                    nickname: cookie.me.nickname
                }
            });
        }

        dispatch({
            type: LOAD_ADMIN_INFO_REQUEST
        });
    }, [cookie.me, logInDone]);

    useEffect(() => {
        if (loadInfoDone) {
            if (!me.nickname && !admin.userId) {
                Router.replace('./login');
            }
        }
    }, [loadInfoDone, me, admin]);

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
        </>
    );
};

export default Home;