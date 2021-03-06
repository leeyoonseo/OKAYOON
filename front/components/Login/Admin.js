import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { LOG_IN_ADMIN_REQUEST } from '../../reducers/user';
import {
    InfoArea, DefaultAvatar, InputWrap, Input,
    UserIcon, InfoButtonArea, InfoButton, 
} from './style';

const Admin = () => {
    const dispatch = useDispatch();
    const { logInAdminLoading } = useSelector(state => state.user);
    const [id, onChangeID, setID] = useInput('');
    const [pw, onChangePW, setPW] = useInput('');
    const idRef = useRef(null);
    const pwRef = useRef(null);

    useEffect(() => {
        idRef.current.focus();

        return () => {
            reset();
        }
    }, []);

    const reset = useCallback(() => {
        setID('');
        setPW('');
    }, []);

    const onSubmit = useCallback(() => {
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
                userId: id,
                password: pw
            }
        });
    }, [id, pw]);

    const onKeyPressInput = useCallback(({ code }) => {
        if (code === 'Enter') {
            onSubmit();
        }
    }, [id, pw]);

    return (
        <>
            <InfoArea>
                <DefaultAvatar size={80}>
                    관리자
                </DefaultAvatar>
                <InputWrap>
                    <UserIcon />
                    <Input 
                        type="text"
                        maxLength="20"
                        placeholder="id" 
                        ref={idRef}
                        onChange={onChangeID}
                        onKeyPress={onKeyPressInput}
                    />
                </InputWrap>
                <InputWrap>
                    <UserIcon />
                    <Input 
                        type="password"
                        maxLength="20"
                        placeholder="password" 
                        ref={pwRef}
                        onChange={onChangePW}
                        onKeyPress={onKeyPressInput}
                    />
                </InputWrap>
            </InfoArea>
            <InfoButtonArea>
                <InfoButton 
                    loading={logInAdminLoading}
                    onClick={onSubmit} 
                >
                    접속
                </InfoButton>
            </InfoButtonArea>
        </>
    );
};

export default Admin;