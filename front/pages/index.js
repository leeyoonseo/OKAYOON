import React, { useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { ThemeContext } from 'styled-components';
import { END } from 'redux-saga';
import axios from 'axios';

import Router from 'next/router';
import Head from 'next/head';

import { TOGGLE_MODAL_REQUEST } from '../reducers/site';
import { LOAD_ADMIN_INFO_REQUEST, LOAD_USER_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configurestore';

import AppLayout from './AppLayout';
import AppIndex from '../components/App/index';
import Menu from '../components/Menu/index';
import ModalPopup from '../components/ModalPopup/index';
import Loading from '../components/Loading';

const Home = () => {
    const dispatch = useDispatch();
    const themeContext = useContext(ThemeContext);
    const { modals, modalToggleLoading } = useSelector((state) => state.site);
    const { me, admin, loadAdminInfoDone, } = useSelector((state) => state.user);  
    const [cookies] = useCookies(['me']);
    
    useEffect(() => {
        if (loadAdminInfoDone) {
            if (!isEmptyObj(admin) || !isEmptyObj(me)) return;   
            if (!cookies.me) {
                return Router.push('/login');
            }

            const { avatar, nickname } = cookies.me;
            dispatch({
                type: LOAD_USER_INFO_REQUEST,
                data: {
                    avatar: avatar,
                    nickname: nickname
                }
            });
        }
    }, [me, admin, cookies.me, loadAdminInfoDone]);

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

export function isEmptyObj(obj)  {
    if(obj.constructor === Object && Object.keys(obj).length === 0)  {
        return true;
    }
    
    return false;
}

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