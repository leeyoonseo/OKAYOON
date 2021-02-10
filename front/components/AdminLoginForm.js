import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_ADMIN_REQUEST } from '../reducers/user';

import styled from 'styled-components';
import { Button } from 'antd';

const Wrap = styled.div`
    position: absolute;
    padding: 10px;
    width: 300px;
    border-radius: 5px;
    background: #fff;
    box-sizing: border-box;

    button + button {
        margin-left: 10px;
    }
`;

const Input = styled.input`
    padding: 5px;
    margin-bottom: 10px;
    width: 80%;
    border: 1px solid #666;
    border-radius: 3px;
    outline: none;
`;

const AdminButton = styled(Button)`
    padding: 7px 10px;
    height: auto;
    line-height: 1;
    border: 1px solid #666;
    border-radius: 3px;
    background: none;
    outline: none;
    cursor: pointer;

    &:hover, 
    &:focus { 
        color: #666;
        border: 1px solid #666;
        background: none;
    }
`;

const AdminLoginForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const { logInAdminLoading, logInAdminError } = useSelector((state) => state.user);
    const nicknameRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        nicknameRef.current.focus();
    }, []);

    useEffect(() => {
        logInAdminLoading && onClose();
    }, [logInAdminLoading]);

    const onSubmit = useCallback(() => {
        const nickname = nicknameRef.current.value;
        const password = passwordRef.current.value;
        
        if(!nickname || !nickname.trim()) {
            alert('관리자 id를 입력해주세요.');
            nicknameRef.current.focus();
            return;
        }
        
        if(!password || !password.trim()) {
            alert('관리자 password를 입력해주세요.');
            passwordRef.current.focus();
            return;
        }

        dispatch({
            type: LOG_IN_ADMIN_REQUEST,
            data: {
                nickname: nickname,
                password: password
            }
        });
    }, []);

    return (
        <Wrap>
            <form>
                <Input 
                    type="text"
                    name="admin-id"
                    placeholder="id"
                    ref={nicknameRef}
                    maxLength={20}
                />
                <Input 
                    type="password"
                    name="admin-password"
                    placeholder="password"
                    ref={passwordRef}
                    maxLength={20}
                />
            </form>
            <AdminButton onClick={onClose}>닫기</AdminButton>
            <AdminButton 
                type="submit"
                loading={logInAdminLoading}
                onClick={onSubmit}
            >
                접속
            </AdminButton>
        </Wrap>
    );
};

export default AdminLoginForm;