import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Router from 'next/router';
import Head from 'next/head';

import { TOGGLE_MODAL_REQUEST } from '../reducers/site';

import { Layout } from 'antd';
import { SmileOutlined, GithubOutlined } from '@ant-design/icons';
import { WHITE_MODE_COLOR } from '../theme/styles';

import SystemTools from '../components/SystemTools';
import AppList from '../components/AppList/index';
import ModalPopup from '../components/ModalPopup/index';
import Loading from '../components/Loading';

const Wrap = styled(Layout)`
    background: #ccc;
    overflow: hidden;
`;

const Header = styled(Layout.Header)`
    position: relative;
    padding: 5px 2%;
    height: ${props => props.h}px;
    line-height: 1;
    background: #777;
    box-sizing: border-box;
`;

const SiteIdentity = styled.span`
    margin: 0;
    display: inline-block;
    font-size: 16px;
    text-align: left;
    cursor: default;
`;

const GitAnchor = styled.a`
    margin: 0 20px;
    display: inline-block;
    font-size: 18px;

    &:hover,
    &:focus { 
        opacity: 0.8;
    }

    span {
        vertical-align: middle;
    }
`;

const AsideHeader = styled.div`
    position: absolute;
    right: 2%;
    display: inline-block;
    vertical-align: top;
`;

const Content = styled(Layout.Content)`
    display: flex;
    padding: 0 2%;
    height: ${props => props.h}px;
    align-items: center;
    justify-content: center;
`;

const Footer = styled(Layout.Footer)`
    display: flex;
    padding: 0 2%;
    height: ${props => props.h}px;
    text-align: center;
    align-items: flex-end;
    justify-content: center;
    background: none;
    box-sizing: border-box;
`;

const Home = () => {
    const themecolor = WHITE_MODE_COLOR;
    const dispatch = useDispatch();
    const { modals, modalToggleLoading } = useSelector((state) => state.site);
    const { me, admin } = useSelector((state) => state.user);
    const [contH, setContH] = useState(null);
    let windowH = null;
    const headerH = 35;
    const footerH = 150;

    // TODO: 페이지 작업 완료 주석 해제
    // useEffect(() => {
    //     if(!me.nickname && !admin.nickname){
    //         Router.replace('./login');
    //     }
    // }, [ me, admin ]);

    useEffect(() => {
        windowH = window.innerHeight;
        setContH(windowH - headerH - footerH);
    }, []);

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
                <Header h={headerH}>
                    <SiteIdentity>
                        <span><SmileOutlined /></span>Kayoon.LEE
                    </SiteIdentity>

                    <GitAnchor 
                        href="https://github.com/leeyoonseo"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <GithubOutlined style={{ color: themecolor }}/>
                    </GitAnchor>

                    <AsideHeader>
                        <SystemTools themecolor={themecolor} />    
                    </AsideHeader>
                </Header>

                <Content h={contH}>
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
                </Content>

                <Footer h={footerH}>
                    <AppList />
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