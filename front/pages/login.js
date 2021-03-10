import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';

import { CREATE_MODAL_REQUEST, TOGGLE_MODAL_REQUEST, ALL_CLOSED_MODAL } from '../reducers/site';

import User from '../components/Login/User';
import Admin from '../components/Login/Admin';
import Loading from '../components/Loading';
import ModalPopup from '../components/ModalPopup';

import { AVATAR_MODAL_ID, AVATAR_MODAL_DATA } from '../components/ModalPopup/data';

import styled, { css } from 'styled-components';
import { Layout } from 'antd';
import { LogoutOutlined, SmileOutlined } from '@ant-design/icons';
import { colors, calcRem } from '../theme/styles';

import Header from './Header';
import Footer from './Footer';

const Wrap = styled(Layout)`
    font-size: ${calcRem(16)};
    background: ${colors.black};
    overflow: hidden;
`;

const Main = styled(Layout.Content)`
    display: flex;
    padding: 0 2%;
    height: ${({ h }) => h}px;
    align-items: center;
    justify-content: center;
`;

const LoginFormArea = styled.div`
    // max-width: 300px;
    // min-width: 300px;
    // width: 100%;
    width: ${calcRem(300)};
    
    & > div + div {
        margin-top: ${calcRem(15)};
    }
`;

const ButtonArea = styled.div`
    display: block;
    position: relative;
    padding: 2% 0;
    width: 100%;
    text-align: center;
`;

const btmButtonDefaultStyle = css`
    font-size: ${calcRem(16)};
    color: ${colors.white};

    &:hover {
        color: ${colors.white};
        opacity: 0.8;
    }

    &:after {
        display: block;
        margin-top: ${calcRem(5)};
        content: '${({ text }) => text}';
    }
`;

const SleepButton = styled.a`
    ${btmButtonDefaultStyle}
    display: inline-block;
    vertical-align: top;
`;

const AdminButton = styled.button`
    ${btmButtonDefaultStyle}
    margin-left: ${calcRem(25)};
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
`;

const ButtonInner = styled.div`
    margin: 0 auto;
    border: none;
    border-radius: 50%;
`;

const defaultIconStyle = css`
    font-size: ${calcRem(20)};
    color: ${colors.white};
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
    const { modalToggleLoading, modals } = useSelector((state) => state.site);
    const [avatar, setAvatar] = useState('nickname');
    const [isAdmin, setIsAdmin] = useState(false);

    const [mainHeight, setMainHeight] = useState(null);
    const [headerHeight, setHeaderHeight] = useState(null);
    const [footerHeight, setFooterHeight] = useState(null);

    useEffect(() => {
        if (!headerHeight || !footerHeight) return;
        const windowH = window.innerHeight;

        setMainHeight(windowH - headerHeight - footerHeight);
    }, [headerHeight, footerHeight]);

    useEffect(() => {
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
    const onToggleModal = useCallback((id, title) => () => {
        if (title) {
            setAvatar(title);
        }

        dispatch({
            type: TOGGLE_MODAL_REQUEST,
            data: id
        });
    }, []);

    const onToggleAdmin = useCallback(() => setIsAdmin(!isAdmin), [isAdmin]);

    return (
        <>
            <Head>
                <title>접속페이지 | OKAYOON</title>
            </Head>
            <Wrap color={colors.black}>
                <Header 
                    themecolor={colors.ivory}
                    setHeight={setHeaderHeight}
                />

                <Main h={mainHeight}>
                    <LoginFormArea>
                        {!isAdmin ? (
                            <User 
                                avatar={avatar}
                                setAvatar={setAvatar}
                                onClickModal={onToggleModal}
                            />
                        ) : (
                            <Admin />
                        )}
                    </LoginFormArea>
                    
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
                </Main>

                <Footer setHeight={setFooterHeight}>
                    <ButtonArea>
                            <Link href="./sleep">
                                <SleepButton 
                                    text="잠자기모드"
                                >  
                                    <ButtonInner>
                                        <SleepIcon />
                                    </ButtonInner>
                                </SleepButton>
                            </Link>

                            <AdminButton
                                text={isAdmin ? '사용자' : '관리자'}
                                onClick={onToggleAdmin}
                            >
                                <ButtonInner>
                                    <AdminIcon />
                                </ButtonInner>
                            </AdminButton>
                        </ButtonArea>
                </Footer>
            </Wrap>

            {modalToggleLoading && <Loading />}
        </>
    );
};

// TODO
// - index와 layout 공유하기(AppLayout 만들기)
// - 버튼에 로딩 추가
// - 처음들어왔을때 저번에 등록한 닉네임이 있다면
// - 이미지들 S3 이용할 것 
// - 대화명 simsimi로안되게 하기(대문자도 물론)
// - 메타태그

export default Login;