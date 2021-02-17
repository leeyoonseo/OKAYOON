import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';

import { CREATE_MODAL_REQUEST, TOGGLE_MODAL_REQUEST, ALL_CLOSED_MODAL } from '../reducers/site';

import SystemTools from '../components/SystemTools';
import UserLogin from '../components/Login/User';
import AdminLogin from '../components/Login/Admin';
import Loading from '../components/Loading';
import ModalPopup from '../components/ModalPopup';

import { AVATAR_MODAL_ID, AVATAR_MODAL_DATA } from '../components/ModalPopup/data';

import styled, { css } from 'styled-components';
import { Layout } from 'antd';
import { LogoutOutlined, SmileOutlined } from '@ant-design/icons';
import { DARK_MODE_COLOR } from '../theme/styles';

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

const btmButtonDefaultStyle = css`
    color: ${props => props.themecolor};

    &:hover,
    &:focus {
        color: ${props => props.themecolor};
        opacity: 0.8;
    }

    &:after {
        display: block;
        margin-top:5px;
        content: '${props => props.text}';
    }
`;

const SleepButton = styled.a`
    ${btmButtonDefaultStyle}
`;

const AdminButton = styled.button`
    ${btmButtonDefaultStyle}
    margin-left: 25px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
`;

const ButtonInner = styled.div`
    margin: 0 auto;
    width: 30px;
    height: 30px;
    border: 1px solid ${props => props.themecolor};
    border-radius: 50%;
`;

const defaultIconStyle = css`
    font-size:18px;
    color: ${props => props.themecolor};
    vertical-align: middle;
`;

const SleepIcon = styled(LogoutOutlined)`
    ${defaultIconStyle}
`;

const AdminIcon = styled(SmileOutlined)`
    ${defaultIconStyle}
`;

const Login = () => {
    const dispatch = useDispatch();

    const { me } = useSelector((state) => state.user);
    const { modalToggleLoading, modals } = useSelector((state) => state.site);
    const [contH, setContH] = useState(null);
    const [avatar, setAvatar] = useState(me.avatar ? me.avatar : null);
    const [isAdmin, setIsAdmin] = useState(false);
    const themecolor = DARK_MODE_COLOR;
    let windowH = null;
    const headerH = 35;
    const footerH = 150;

    useEffect(() => {
        windowH = window.innerHeight;
        setContH(windowH - headerH - footerH);

        // TODO: 있어야하나?
        const haveSameModalData = modals.some((v) => v.id === AVATAR_MODAL_ID);
        if(!haveSameModalData){
            dispatch({
                type: CREATE_MODAL_REQUEST,
                data: AVATAR_MODAL_DATA
            });
        }
    }, []);

    /**
     * @params {string} id: 팝업 아이디
     * @params src: 아바타 이미지 주소 
     * - 1. Avatar 컴포넌트 기본이미지 세팅은 문자열 'default'를 전달받는 것을 기준으로 한다.
     */
    const onToggleModal = useCallback((id, src = null) => () => {

        // TODO: 리팩터링할 것
        if(src !== null){
            if(src === 'default') src = null; // 1.
            setAvatar(src);
        }

        dispatch({
            type: TOGGLE_MODAL_REQUEST,
            data: id
        });
    }, []);

    const onToggleAdmin = useCallback(() => {
        setIsAdmin(!isAdmin);
    }, [isAdmin]);

    return (
        <>
            <Head>
                <title>접속페이지 | OKAYOON</title>
            </Head>
            <Wrap>
                <Header h={headerH}>
                    <Tools>
                        <SystemTools themecolor={themecolor} />    
                    </Tools>
                </Header>

                <Content h={contH}>
                    <ContentInner>
                        {!isAdmin ? (
                            <UserLogin 
                                avatar={avatar}
                                setAvatar={setAvatar}
                                onClickModal={onToggleModal}
                            />
                        ) : (
                            <AdminLogin />
                        )}
                    </ContentInner>

                    {modalToggleLoading && <Loading />}
                    {!isAdmin && modals?.map((v) => {
                        if(v){
                            return (
                                <ModalPopup 
                                    key={v.id} 
                                    id={v.id}
                                    visible={v.visible} 
                                    onCloseModal={onToggleModal} 
                                    {...v}
                                >
                                    <v.content id={v.id} onCloseModal={onToggleModal} />
                                </ModalPopup>
                            );
                        }
                    })}
                </Content>

                <Footer h={footerH}>
                    <Link href="./sleep">
                        <SleepButton 
                            text="잠자기모드"
                            themecolor={themecolor}
                        >  
                            <ButtonInner>
                                <SleepIcon themecolor={themecolor} />
                            </ButtonInner>
                        </SleepButton>
                    </Link>

                    <AdminButton
                        text={isAdmin ? '사용자' : '관리자'}
                        themecolor={themecolor}
                        onClick={onToggleAdmin}
                    >
                        <ButtonInner>
                            <AdminIcon themecolor={themecolor}/>
                        </ButtonInner>
                    </AdminButton>
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
// - 대화명 simsimi로안되게 하기(대문자도 물론)

export default Login;