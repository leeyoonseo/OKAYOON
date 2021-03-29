import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';

import { CREATE_MODAL_REQUEST, TOGGLE_MODAL_REQUEST } from '../reducers/site';

import User from '../components/Login/User';
import Admin from '../components/Login/Admin';
import Loading from '../components/Loading';
import ModalPopup from '../components/ModalPopup';
import { AVATAR_MODAL_ID, AVATAR_MODAL_DATA } from '../components/ModalPopup/data';

import styled, { ThemeContext, css } from 'styled-components';
import { LogoutOutlined, SmileOutlined } from '@ant-design/icons';

import AppLayout from './AppLayout';

const LoginFormArea = styled.div`
    width: ${({ theme }) => theme.calcRem(300)};
    
    & > div + div {
        margin-top: ${({ theme }) => theme.calcRem(15)};
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
    font-size: ${({ theme }) => theme.calcRem(16)};
    color: ${({ theme }) => theme.colors.white};

    &:hover {
        color: ${({ theme }) => theme.colors.white};
        opacity: 0.8;
    }

    &:after {
        display: block;
        margin-top: ${({ theme }) => theme.calcRem(5)};
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
    margin-left: ${({ theme }) => theme.calcRem(25)};
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
    font-size: ${({ theme }) => theme.calcRem(20)};
    color: ${({ theme }) => theme.colors.white};
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
    const themeContext = useContext(ThemeContext);
    const { modalToggleLoading, modals } = useSelector((state) => state.site);
    const [avatar, setAvatar] = useState('nickname');
    const [isAdmin, setIsAdmin] = useState(false);

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
                <title>OKAYOON | LOGIN</title>
            </Head>
            
            <AppLayout 
                bgcolor={themeContext.colors.black}
                main={
                    <>
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
                    </> 
                }

                footer={
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
                }
            />

            {modalToggleLoading && <Loading />}
        </>
    );
};

export default Login;