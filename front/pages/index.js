import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import Router from 'next/router';
import Head from 'next/head';

import { TOGGLE_MODAL_REQUEST } from '../reducers/site';
import { LOAD_ADMIN_INFO_REQUEST, LOG_IN_REQUEST } from '../reducers/user';

import { Layout } from 'antd';
import { colors } from '../theme/styles';

import AppList from '../components/AppList';
import Menu from '../components/Menu/index';
import ModalPopup from '../components/ModalPopup/index';
import Loading from '../components/Loading';

import Header from './Header';
import Footer from './Footer';

const Wrap = styled(Layout)`
    background: ${colors.mint};
    overflow: hidden;
`;

const Main = styled(Layout.Content)`
    display: flex;
    padding: 0 2%;
    height: ${({ h }) => h}px;
    align-items: center;
    justify-content: center;
`;

const Home = () => {
    const dispatch = useDispatch();
    const { modals, modalToggleLoading } = useSelector((state) => state.site);
    const { me, admin, logInDone, loadInfoDone } = useSelector((state) => state.user);
    const [cookie] = useCookies(['me']);
    const [mainHeight, setMainHeight] = useState(null);
    const [headerHeight, setHeaderHeight] = useState(null);
    const [footerHeight, setFooterHeight] = useState(null);

    useEffect(() => {
        if (!headerHeight || !footerHeight) return;
        const windowH = window.innerHeight;

        setMainHeight(windowH - headerHeight - footerHeight);
    }, [headerHeight, footerHeight]);

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
                <title>OKAYOON</title>
            </Head>
            
            <Wrap>
                <Header 
                    themecolor={colors.ivory}
                    setHeight={setHeaderHeight} 
                />
                <Main h={mainHeight}>
                    <AppList />

                    {modalToggleLoading && <Loading />}
                    {modals?.map((v) => {
                        if(v){
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
                        }
                    })}
                </Main>

                <Footer setHeight={setFooterHeight}>
                    <Menu />
                </Footer>
            </Wrap>
        </>
    );
};

export default Home;

// TODO:
// - 메타태그
// - 모바일
// - login 거쳐서 오도록!! 무조건, 만약 안거쳐올 수도 있을까?
// - 언어 https://meaningless-life.tistory.com/9
// - 방명록에 다국어 변환 api? 추가할까? https://developers.naver.com/docs/papago/papago-detectlangs-example-code.md#node-js