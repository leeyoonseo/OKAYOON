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

const CircleButtonWrap = styled.div`
    display:inline-block;

    & > a{
        display:block;
        color:#333;
    }
`;

const CircleButton = styled(Button)`
    margin-bottom: 10px;
    border-color: ${props => props.themecolor};
    background: none;

    &:hover,
    &:focus {
        border-color: ${props => props.themecolor};
        background: none;
    }
`;

const CircleButtonIcon = styled(LogoutOutlined)`
    color: ${props => props.themecolor};
`;

const Login = () => {
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
                        <SystemTools themecolor={DARK_MODE_COLOR} />    
                    </SystemToolsWrap>
                </HeaderWrap>

                <ContentWrap fixedheight={contentHeight}>
                    <UserInfo themecolor={DARK_MODE_COLOR} />
                </ContentWrap>

                <FooterWrap fixedheight={footerHeight}>
                    <CircleButtonWrap>
                        <CircleButton 
                            shape="circle"
                            icon={<CircleButtonIcon themecolor={DARK_MODE_COLOR} />} 
                            themecolor={DARK_MODE_COLOR}
                        />

                        <Link href="./sleep">
                            <a style={{ color: DARK_MODE_COLOR }}>잠자기</a>
                        </Link>
                    </CircleButtonWrap>
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