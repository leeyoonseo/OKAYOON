import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { LOG_IN_ADMIN_REQUEST } from '../reducers/user';

import styled from 'styled-components';
import { Button } from 'antd';
import useInput from '../hooks/useInput';

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
    const [id, onChangeID, setID] = useInput('');
    const [pw, onChangePW, setPW] = useInput('');
    const { logInAdminLoading, logInAdminError } = useSelector((state) => state.user);
    const idRef = useRef(null);
    const pwRef = useRef(null);

    useEffect(() => {
        idRef.current.focus();
    }, []);

    useEffect(() => {
        logInAdminLoading && onClose();
    }, [logInAdminLoading]);

    const onSubmit = useCallback(() => {
        // const nickname = idRef.current.value;
        // const password = pwRef.current.value;
        
        if(!id || !id.trim()) {
            alert('관리자 id를 입력해주세요.');
            idRef.current.focus();
            return;
        }
        
        if(!pw || !pw.trim()) {
            alert('관리자 password를 입력해주세요.');
            pwRef.current.focus();
            return;
        }

        dispatch({
            type: LOG_IN_ADMIN_REQUEST,
            data: {
                nickname: id,
                password: pw
            }
        });
    }, [id, pw]);

    const onClickAccess = useCallback(({ code }) => {
        if (code === 'Enter') {
            onSubmit();
        }
    }, [id, pw]);

    return (
        <Wrap>
            <form>
                <Input 
                    type="text"
                    name="admin-id"
                    placeholder="id"
                    maxLength={20}
                    ref={idRef}
                    onChange={onChangeID}
                    onKeyPress={onClickAccess}
                />
                <Input 
                    type="password"
                    name="admin-password"
                    placeholder="password"
                    maxLength={20}
                    ref={pwRef}
                    onChange={onChangePW}
                    onKeyPress={onClickAccess}
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

AdminLoginForm.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AdminLoginForm;