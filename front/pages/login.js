import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';

import UserInfo from '../components/UserInfo/index';
import SystemTools from '../components/SystemTools';

import { Button, Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { DARK_MODE_COLOR, WHITE_MODE_COLOR } from '../theme/styles';

const LayoutWrap = styled(Layout)`
    background: url(https://t1.daumcdn.net/cfile/tistory/229F4B335966F29A0F)no-repeat;
    background-size: cover;
`;

const HeaderWrap = styled(Layout.Header)`
    padding: 5px 2%;
    height: ${props => props.fixedheight}px;
    text-align:right;
    background: none;
    box-sizing: border-box;
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

const SystemToolsWrap = styled.div`
    display: inline-block;
    vertical-align: top;
`;

const SleepModeButton = styled.a`
    color: ${props => props.themecolor};

    &:hover,
    &:focus {
        color: ${props => props.themecolor};
    }

    &:after {
        display: block;
        margin-top:5px;
        content: '잠자기모드';
    }
    
`;

const CircleIconWrap = styled.div`
    margin: 0 auto;
    width: 30px;
    height: 30px;
    border: 1px solid ${props => props.themecolor};
    border-radius: 50%;
`;

const CircleIcon = styled(LogoutOutlined)`
    font-size:18px;
    color: ${props => props.themecolor};
    vertical-align: middle;
`;

const Login = () => {
    const themecolor = DARK_MODE_COLOR;
    const headerHeight = 35;
    const footerHeight = 150;
    const [contentHeight, setContentHeight] = useState(null);

    useEffect(() => {
        const browserH = window.innerHeight;
        setContentHeight(browserH - headerHeight - footerHeight);
        console.log('브라우저 height!!?', contentHeight)
    }, []);


    return (
        <>
            <Head>
                <title>사용자 접속페이지 | OKAYOON</title>
            </Head>
            <LayoutWrap>
                <HeaderWrap fixedheight={headerHeight}>
                    <SystemToolsWrap>
                        <SystemTools themecolor={themecolor} />    
                    </SystemToolsWrap>
                </HeaderWrap>

                <ContentWrap fixedheight={contentHeight}>
                    <UserInfo themecolor={themecolor} />
                </ContentWrap>

                <FooterWrap fixedheight={footerHeight}>
                    <Link href="./sleep">
                        <SleepModeButton themecolor={themecolor}>  
                            <CircleIconWrap>
                                <CircleIcon themecolor={themecolor} />
                            </CircleIconWrap>
                        </SleepModeButton>
                    </Link>
                </FooterWrap>
            </LayoutWrap>
        </>
    );
};

// TODO
// - 버튼에 로딩 추가
// - 처음들어왔을때 저번에 등록한 닉네임이 있다면
// - 이미지들 S3 이용할 것 

export default Login;