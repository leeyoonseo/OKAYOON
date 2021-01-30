import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Head from 'next/head';

import { Layout } from 'antd';
import { SmileOutlined, GithubOutlined } from '@ant-design/icons';
import { WHITE_MODE_COLOR } from '../theme/styles';

import SystemTools from '../components/SystemTools';
import AppList from '../components/AppList/index';

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

    const { modals } = useSelector((state) => state.site);
    const [contH, setContH] = useState(null);

    let windowH = null;
    const headerH = 35;
    const footerH = 150;

    useEffect(() => {
        console.log(modals);

        windowH = window.innerHeight;
        setContH(windowH - headerH - footerH);
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
                    {modals?.map((v) => {
                        if(v){
                            return (
                                <ModalPopup 
                                    key={v.id} 
                                    visible={isVisibleModal} 
                                    onCloseModal={onToggleModal} 
                                    {...v}
                                >
                                    <v.content onCloseModal={onToggleModal} />
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

// TODO
// - 언어 https://meaningless-life.tistory.com/9