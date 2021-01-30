import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';

import styled, { css } from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';

import { LOG_IN_REQUEST } from '../reducers/user';
import { CREATE_MODAL_REQUEST } from '../reducers/site';

import UserInfo from '../components/UserInfo/index';
import SystemTools from '../components/SystemTools';

import { Layout, Button } from 'antd';
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

const ContentInner = styled.div`
    width: 300px;

    & > div + div {
        margin-top: 15px;
    }
`;

const UserButtons = styled.div`
    text-align: center;

    button {
        padding: 5px 10px;
        color: #fff;
        background: none;
        border: 1px solid #fff;
        cursor: pointer;

        &:hover,
        &:focus {
            opacity: 0.8;
        }
    }

    & > button + button {
        margin-left: 10px;
    }
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

const SleepButtonWrap = styled.a`
    color: ${props => props.themecolor};

    &:hover,
    &:focus {
        color: ${props => props.themecolor};
        opacity: 0.8;
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

const Login = () => {
    const dispatch = useDispatch();
    const inputEl = useRef(null);

    const { logInLoading, userInfo } = useSelector((state) => state.user);
    const { modals } = useSelector((state) => state.site);

    const [isVisibleModal, setVisibleModal] = useState(false);

    const [contH, setContH] = useState(null);
    const [avatar, setAvatar] = useState(userInfo?.avatar || '');
    const [nickname, onChangeNickname, setNickname] = useInput(userInfo?.nickname || '');

    const themecolor = DARK_MODE_COLOR;
    let windowH = null;
    const headerH = 35;
    const footerH = 150;

    useEffect(() => {
        windowH = window.innerHeight;
        setContH(windowH - headerH - footerH);

        dispatch({
            type: CREATE_MODAL_REQUEST,
            data:  {
                id: 'LU_M_0', // 페이지컴포넌트_모달_인덱스
                // location: ['50%', '50%', 1],
                size: {
                    w: '500px',
                    h: '500px'
                },
                title: "아바타 설정",
                content: ModalContentAvatar,
                buttonDisabled : {
                    Maximize: true,
                    Minimization: true
                }
            }
        });
    }, []);

    const onToggleModal = useCallback((status, src = null) => () => {
        setAvatar(src);
        setVisibleModal(status);
    }, []);

    const onClickReset = useCallback(() => {
        setNickname('');
        setAvatar(null);

        inputEl.current.value = '';
        inputEl.current.focus();
    }, []);

    const onClickAccess = useCallback(() => {
        const data = {};
        const inputVal = inputEl.current.value;

        if(!nickname.trim() && !inputVal.trim()){
            setNickname('Guest');
            data.nickname = 'Guest';
        }else{
            setNickname(inputVal);
            data.nickname = inputVal;
        }

        if(avatar !== null){
            data.avatar = avatar;
        }

        dispatch({
            type: LOG_IN_REQUEST,
            data
        });
    }, [nickname, avatar]);

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
                    <ContentInner>
                        <UserInfo 
                            avatar={avatar} 
                            nickname={nickname} 
                            onChangeNickname={onChangeNickname}
                            forwordRef={inputEl}
                            onClickModal={onToggleModal} 
                        />

                        <UserButtons>
                            <button onClick={onClickReset}>초기화</button>
                            <button onClick={onClickAccess}>접속</button>
                        </UserButtons>
                    </ContentInner>

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
                    <Link href="./sleep">
                        <SleepButtonWrap themecolor={themecolor}>  
                            <SleepButton>
                                <Icon themecolor={themecolor} />
                            </SleepButton>
                        </SleepButtonWrap>
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