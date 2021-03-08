import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import Router from 'next/router';
import Head from 'next/head';

import { TOGGLE_MODAL_REQUEST } from '../reducers/site';
import { LOAD_ADMIN_INFO_REQUEST, LOG_IN_REQUEST } from '../reducers/user';

import { Layout } from 'antd';
import { SmileOutlined, MenuOutlined, GithubOutlined } from '@ant-design/icons';
import { DARK_MODE_COLOR } from '../theme/styles';

import SystemTools from '../components/SystemTools';
import Menu from '../components/Menu/index';
import AppList from '../components/AppList/index';
import ModalPopup from '../components/ModalPopup/index';
import Loading from '../components/Loading';

const Wrap = styled(Layout)`
    background: #A593E0;
    overflow: hidden;
`;

const Header = styled(Layout.Header)`
    padding: 0;
    height: auto;
    color: #FFFFF3;
    background: none;
`;

const HeaderInner = styled.div`
    padding: 0 2%;
    display: flex;
    width: 100%;
    height: 100%;
    min-height:30px;
    align-items: center;
    justify-content: flex-end;
`;

const SystemToolsWrap = styled.div`
    position: absolute;
    right: 2%;
    display: inline-block;
    vertical-align: top;
`;

const Main = styled(Layout.Content)`
    display: flex;
    padding: 0 2%;
    height: ${props => props.h}px;
    align-items: center;
    justify-content: center;
`;

const Footer = styled(Layout.Footer)`
    padding: 0;
    font-size: 1rem;
    line-height: 1;
    color: #FFFFF3;
    background: #566270;
    box-sizing: border-box;
`;

const FooterInner = styled.div`
    position: relative;
    padding: 0 2%;
    display: flex;
    align-items: center;
    min-height: 30px;
`;

const MenuWrap = styled.div`
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


const SiteIdentity = styled.span`
    margin: 0;
    display: inline-block;
    text-align: left;
    cursor: default;

    span {
        margin-right: 2px;
    }
`;

const GitAnchor = styled.a`
    margin: 0 20px;
    display: inline-block;
    // font-size: 18px;
    font-size: 1.125rem;

    &:hover,
    &:focus { 
        opacity: 0.8;
    }

    span {
        vertical-align: middle;
    }
`;

// const Footer = styled(Layout.Footer)`
//     display: flex;
//     padding: 0 2%;
//     height: ${props => props.h}px;
//     text-align: center;
//     align-items: flex-end;
//     justify-content: center;
//     background: none;
//     box-sizing: border-box;
// `;

const Home = () => {
    const dispatch = useDispatch();
    const { modals, modalToggleLoading } = useSelector((state) => state.site);
    const { me, admin, logInDone, loadAdminInfoDone } = useSelector((state) => state.user);
    const [cookie] = useCookies(['me']);
    const [mainHeight, setMainHeight] = useState(null);
    const [headerHeight, setHeaderHeight] = useState(null);
    const [footerHeight, setFooterHeight] = useState(null);

    const [openedMenu, setOpenedMenu] = useState(false);
    const themecolor = DARK_MODE_COLOR;
    const headerRef = useRef(null);
    const footerRef = useRef(null);

    useEffect(() => {
        if (!headerHeight || !footerHeight) return;
        const windowH = window.innerHeight;

        setMainHeight(windowH - headerHeight - footerHeight);
    }, [headerHeight, footerHeight])

    useEffect(() => {
        if (!headerRef.current) return;
        setHeaderHeight(headerRef.current.clientHeight);
    }, [headerRef])

    useEffect(() => {
        if (!footerRef.current) return;
        setFooterHeight(footerRef.current.clientHeight);
    }, [footerRef]);

    useEffect(() => {
        if (cookie.me && !logInDone) {
            dispatch({
                type: LOG_IN_REQUEST,
                data: {
                    avatar: cookie.me.avatar,
                    nickname: cookie.me.nickname
                }
            });

        }
    }, [cookie.me, logInDone]);

    useEffect(() => {
        if (!cookie.me && !logInDone) {
            dispatch({
                type: LOAD_ADMIN_INFO_REQUEST
            });
        }
    }, [cookie.me, logInDone]);

    useEffect(() => {
        if (loadAdminInfoDone) {
            if (me.nickname || admin.userId) return;
    
            Router.replace('./login');
        }
    }, [loadAdminInfoDone, me, admin]);

    /**
     * @params {string} id: 팝업 아이디
     */
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
                <Header>
                    <HeaderInner ref={headerRef}>
                        <SystemToolsWrap>
                            <SystemTools themecolor={themecolor} />    
                        </SystemToolsWrap>
                    </HeaderInner>
                </Header>

                <Main h={mainHeight}>
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

                <Footer 
                    // h={footerH}
                >
                    <FooterInner ref={footerRef}>

                        <Menu 
                            themecolor={themecolor}
                        />
                        
                        {/* <SiteIdentity>
                            <span><SmileOutlined /></span>Kayoon.LEE
                        </SiteIdentity>

                        <GitAnchor 
                            href="https://github.com/leeyoonseo"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <GithubOutlined style={{ color: themecolor }}/>
                        </GitAnchor> */}
                    </FooterInner>
                </Footer>

                {/* <Footer h={footerH}>
                    <AppList />
                </Footer> */}
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