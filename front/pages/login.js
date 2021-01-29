import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';

import UserInfo from '../components/UserInfo/index';
import SystemTools from '../components/SystemTools';

//test
import Test from '../components/SystemTools/Wifi';

import { Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { DARK_MODE_COLOR } from '../theme/styles';
import { useSelector } from 'react-redux';

import ModalPopup from '../components/ModalPopup';
import ModalContentAvatar from '../components/UserInfo/ModalContentAvatar';

const bgImageUrl = 'https://t1.daumcdn.net/cfile/tistory/229F4B335966F29A0F';

const Wrap = styled(Layout)`
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImageUrl});
    background-size: cover;
`;

const Header = styled(Layout.Header)` 
    posiiton: relative;
    padding: 5px 2%;
    height: ${props => props.h}px;
    background: none;
    box-sizing: border-box;
`;

const Tools = styled.div`
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
    align-items: center;
    justify-content: center;
    background: none;
    box-sizing: border-box;
`;

const ButtonWrap = styled.a`
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

const Icon = styled(LogoutOutlined)`
    font-size:18px;
    color: ${props => props.themecolor};
    vertical-align: middle;
`;

// max 5
const devModals = [
    {
        visible: false,
        // x, y, z
        location: ['50%', '50%', 1],
        css: {
            width: '500px',
            height: '500px',
        },
        title: "아바타 설정",
        content: ModalContentAvatar,
        buttonDisabled : {
            Maximize: true,
            Minimization: true
        },
        onClick: function(status) {
            console.log('onTogglePopup!!', status);
            console.log('this.visible', this);
        },
        // index, x, y, content, 
    },
    null,
    null,
    null,
    null,
    null
];

const Login = () => {
    const { modals } = useSelector((state) => state.site);
    const themecolor = DARK_MODE_COLOR;
    const [contH, setContH] = useState(null);
    
    let windowH = null;
    const headerH = 35;
    const footerH = 150;

    useEffect(() => {
        windowH = window.innerHeight;
        setContH(windowH - headerH - footerH);
    }, []);

    const callbackFunc = useCallback((status) => {
        console.log('callbackFunc', status);
    }, []);

    return (
        <>
            <Head>
                <title>사용자 접속페이지 | OKAYOON</title>
            </Head>
            <Wrap>
                <Header h={headerH}>
                    <Tools>
                        <SystemTools themecolor={themecolor} />    
                    </Tools>
                </Header>

                <Content h={contH}>
                    <UserInfo themecolor={themecolor} />
    {/*
        // visible: false,
        // location: ['50%', '50%', 1],
        // css: {
        //     width: '500px',
        //     height: '500px',
        // },
        // title: "아바타 설정",
        // content: ModalContentAvatar,
        // buttonDisabled : {
        //     Maximize: true,
        //     Minimization: true
        // },
        // onClick: function(status) {
        //     console.log('onTogglePopup!!', status);
        //     console.log('this.visible', this);
        // },
    */}

                    {devModals?.map((v, i) => {
                        if(v !== null){
                            return (
                                <ModalPopup
                                    key={`modal_${v.title}_${i}`}
                                    index={i}
                                    {...v}
                                />
                            );
                        }
                    })}
                    {/* <ModalPopup 
                        index={}
                        button_disabled={{
                            Maximize: true,
                            Minimization: true
                        }}
                        visible={isVisible} 
                        modal_width="500px"
                        modal_height="500px"
                        title="아바타 설정"
                        onClose={onCloseModal} 
                    >
                        <ModalAvatarContent onCloseModal={onCloseModal} />
                        <SourceText>
                            이미지출처: https://www.pngwing.com/ko/free-png-zvldq/download
                        </SourceText>
                    </ModalPopup> */}
                </Content>

                <Footer h={footerH}>
                    <Link href="./sleep">
                        <ButtonWrap themecolor={themecolor}>  
                            <SleepButton>
                                <Icon themecolor={themecolor} />
                            </SleepButton>
                        </ButtonWrap>
                    </Link>
                </Footer>
            </Wrap>
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