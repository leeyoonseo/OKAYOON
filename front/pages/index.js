import React, { useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { ThemeContext } from 'styled-components';
import { END } from 'redux-saga';
import axios from 'axios';

import Router from 'next/router';
import Head from 'next/head';

import { TOGGLE_MODAL_REQUEST } from '../reducers/site';
import { LOAD_ADMIN_INFO_REQUEST, LOG_IN_REQUEST, LOG_IN_ADMIN_REQUEST } from '../reducers/user';
import wrapper from '../store/configurestore';

import AppLayout from './AppLayout';
import AppIndex from '../components/App/index';
import Menu from '../components/Menu/index';
import ModalPopup from '../components/ModalPopup/index';
import Loading from '../components/Loading';
import { backUrl } from '../config/config';

const Home = () => {
    const dispatch = useDispatch();
    const themeContext = useContext(ThemeContext);
    const { modals, modalToggleLoading } = useSelector((state) => state.site);
    const { me, admin, logInDone, loadInfoDone } = useSelector((state) => state.user);
    const [cookies] = useCookies(['me']);

    useEffect(() => {
        if (admin.userId) return;
        if (!cookies.me) return;
        
        const { avatar, nickname } = cookies.me;
        
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                avatar: avatar,
                nickname: nickname
            }
        });
    }, [cookies.me]);

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

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_ADMIN_INFO_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});


export default Home;