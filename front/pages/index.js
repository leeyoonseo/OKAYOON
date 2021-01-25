import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';

import SystemTools from '../components/SystemTools';

import { Layout } from 'antd';
import { SmileOutlined, GithubOutlined } from '@ant-design/icons';
import { WHITE_MODE_COLOR } from '../theme/styles';

const LayoutWrap = styled(Layout)`
    background: #ddd;
`;

const HeaderWrap = styled(Layout.Header)`
    position: relative;
    padding: 5px 2%;
    height: ${props => props.fixedheight}px;
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

const HeaderTool = styled.div`
    position: absolute;
    right: 2%;
    display: inline-block;
    vertical-align: top;
`;

const ContentWrap = styled(Layout.Content)`
    display: flex;
    padding: 0 2%;
    height: ${props => props.fixedheight}px;
    align-items: center;
    justify-content: center;
`;

const FooterWrap = styled(Layout.Footer)`
    display: flex;
    padding: 0 2%;
    height: ${props => props.fixedheight}px;
    text-align: center;
    align-items: center;
    justify-content: center;
    background: none;
    box-sizing: border-box;
`;

const Home = () => {
    const themecolor = WHITE_MODE_COLOR;
    const fixedHeaderH = 35;
    const fixexFooterH = 150;
    const [contentHeight, setContentHeight] = useState(null);

    useEffect(() => {
        const windowH = window.innerHeight;
        setContentHeight(windowH - fixedHeaderH - fixexFooterH);
    }, []);

    return (
        <>
            <Head>
                <title>OKAYOON</title>
            </Head>
            <LayoutWrap>
                <HeaderWrap fixedheight={fixedHeaderH}>
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

                    <HeaderTool>
                        <SystemTools themecolor={themecolor} />    
                    </HeaderTool>
                </HeaderWrap>

                <ContentWrap fixedheight={contentHeight}>
                    cont    
                </ContentWrap>

                <FooterWrap fixedheight={fixexFooterH}>
                    footer
                </FooterWrap>
            </LayoutWrap>
        </>
    );
};

export default Home;

// TODO
// - 언어 https://meaningless-life.tistory.com/9