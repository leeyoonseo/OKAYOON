import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';

import UserInfo from '../components/UserInfo/index';
import SystemTools from '../components/SystemTools';

import { Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { DARK_MODE_COLOR } from '../theme/styles';

const bgImageUrl = 'https://t1.daumcdn.net/cfile/tistory/229F4B335966F29A0F';

const LayoutWrap = styled(Layout)`
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImageUrl});
    background-size: cover;
`;

const HeaderWrap = styled(Layout.Header)` 
    posiiton: relative;
    padding: 5px 2%;
    height: ${props => props.h}px;
    background: none;
    box-sizing: border-box;
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
    height: ${props => props.h}px;
    align-items: center;
    justify-content: center;
`;

const FooterWrap = styled(Layout.Footer)`
    display: flex;
    padding: 0 2%;
    height: ${props => props.h}px;
    text-align: center;
    align-items: center;
    justify-content: center;
    background: none;
    box-sizing: border-box;
`;

const SleepModeWrap = styled.a`
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

const SleepButton = styled.div`
    margin: 0 auto;
    width: 30px;
    height: 30px;
    border: 1px solid ${props => props.themecolor};
    border-radius: 50%;
`;

const SleepIcon = styled(LogoutOutlined)`
    font-size:18px;
    color: ${props => props.themecolor};
    vertical-align: middle;
`;

const Login = () => {
    const themecolor = DARK_MODE_COLOR;
    const [contH, setContH] = useState(null);
    
    let windowH = null;
    const headerH = 35;
    const footerH = 150;

    useEffect(() => {
        windowH = window.innerHeight;
        setContH(windowH - headerH - footerH);
    }, []);

    return (
        <>
            <Head>
                <title>사용자 접속페이지 | OKAYOON</title>
            </Head>
            <LayoutWrap>
                <HeaderWrap h={headerH}>
                    <HeaderTool>
                        <SystemTools themecolor={themecolor} />    
                    </HeaderTool>
                </HeaderWrap>

                <ContentWrap h={contH}>
                    <UserInfo themecolor={themecolor} />
                </ContentWrap>

                <FooterWrap h={footerH}>
                    <Link href="./sleep">
                        <SleepModeWrap themecolor={themecolor}>  
                            <SleepButton>
                                <SleepIcon themecolor={themecolor} />
                            </SleepButton>
                        </SleepModeWrap>
                    </Link>
                </FooterWrap>
            </LayoutWrap>
        </>
    );
};

// TODO
// - index와 layout 공유하기(AppLayout 만들기)
// - 버튼에 로딩 추가
// - 처음들어왔을때 저번에 등록한 닉네임이 있다면
// - 이미지들 S3 이용할 것 
// - 배경이미지에 흐린 효과 추가

export default Login;