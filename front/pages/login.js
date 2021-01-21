import React from 'react';
import styled from 'styled-components';

import Head from 'next/head';
import Link from 'next/link';

import UserInfo from '../components/UserInfo/index';
import SystemTools from '../components/SystemTools';

import { Button, Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const HeaderWrap = styled(Layout.Header)`
    padding: 5px 2%;
    height: 30px;
    box-sizing: border-box;
    text-align:right;
`;

const ContentWrap = styled(Layout.Content)`
    padding: 0 2%;
`;

const FooterWrap = styled(Layout.Footer)`
    padding: 0 2%;
`;

const SystemToolsWrap = styled.div`
    display: inline-block;
    vertical-align: top;
`;

const CircleBtnWrapper = styled.div`
    text-align:center;

    & > a{
        display:block;
        color:#333;
    }
`;

const Login = () => {
    const { Footer, Content } = Layout;

    return (
        <>
            <Head>
                <title>사용자 접속페이지 | OKAYOON</title>
            </Head>
            <Layout>
                <HeaderWrap>
                    <SystemToolsWrap>
                        <SystemTools themecolor="#fff" />    
                    </SystemToolsWrap>
                </HeaderWrap>

                <ContentWrap>
                    <UserInfo />
                </ContentWrap>

                <FooterWrap>
                    <CircleBtnWrapper>
                        <Button 
                            shape="circle"
                            icon={<LogoutOutlined />} 
                        />

                        <Link href="./sleep">
                            <a>잠자기</a>
                        </Link>
                    </CircleBtnWrapper>
                </FooterWrap>
            </Layout>
        </>
    );
};

// TODO
// - 버튼에 로딩 추가
// - 처음들어왔을때 저번에 등록한 닉네임이 있다면

export default Login;