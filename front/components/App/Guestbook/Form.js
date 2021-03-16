import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { ADD_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';
import styled, { css } from 'styled-components';

import { EyeOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    margin-bottom: ${({ theme }) => theme.calcRem(20)};
`;

const Textarea = styled.textarea`
    padding: 3%;
    width: 100%;
    height: ${({ theme }) => theme.calcRem(130)};
    border: none;
    box-sizing: border-box;
    outline: none;
    resize: none;
    IME-MODE: auto;
`;

const BottomWrap = styled.div`
    position: relative;
    margin-top: ${({ theme }) => theme.calcRem(10)};
    text-align: right;
`;

const LetterCheck = styled.span`
    position: absolute;
    top: 0;
    left: 0;

    &.max {
        color: ${({ theme }) => theme.colors.darkPink};
    }
`;

const BottomInner = styled.div`
    display: inline-block;
`;


const PasswordWrap = styled.div`
    position: relative;
    display: inline-block;
`;

const Input = styled.input`
    padding: ${({ theme }) => theme.calcRem(2)} ${({ theme }) => theme.calcRem(20)} ${({ theme }) => theme.calcRem(2)} ${({ theme }) => theme.calcRem(10)};
    width: ${({ theme }) => theme.calcRem(150)};
    border: none;
    outline: none;
    box-sizing: border-box;
`;

const defaultButtonStyle = css`
    padding: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

const VisibleButtonPW = styled.button`
    ${defaultButtonStyle}
    position: absolute;
    right: ${({ theme }) => theme.calcRem(5)};
    height: 100%;
`;

const SubmitButton = styled.button`
    ${defaultButtonStyle}
    margin-left: ${({ theme }) => theme.calcRem(10)};
`;

const GuestbookForm = ({ 
    MAX_TEXTAREA_LENGTH,
    avatar,
    nickname,
}) => {
    const dispatch = useDispatch();
    const { addGuestbookDone } = useSelector((state) => state.guestbook);
    const [text, onChangeText, setText] = useInput('');
    const [password, onChangePassword, setPassword] = useInput('');
    const [visiblePassword, setVisiblePassword] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => textareaRef.current.focus(), []);
    useEffect(() => {
        if (addGuestbookDone) {
            setText('');
            setPassword('');

            textareaRef.current.focus();
        }
    }, [addGuestbookDone]);

    const onBlurTextarea = useCallback(() => {
        if (text.length > MAX_TEXTAREA_LENGTH) {
            setText(text.substr(0, MAX_TEXTAREA_LENGTH));
        }
    }, [text]);

    // TODO: 이미지 업로드 구현

    const onSubmit = useCallback(() => {
        if (!text || !text.trim()) {
            return alert('내용을 입력하세요.');
        }

        if (!password || !password.trim()) {
            return alert('비밀번호를 입력하세요.');
        }

        dispatch({
            type: ADD_GUESTBOOK_REQUEST,
            data: {
                avatar: avatar,
                nickname: nickname,
                password: password,
                content: text
            }
        });
    }, [text, password]);

    const onClickVisiblePassword = useCallback(() => {
        setVisiblePassword(!visiblePassword);
    }, [visiblePassword]);

    const onKeyPressPassword = useCallback(({ code }) => {
        if (code === 'Enter') {
            onSubmit();
        }
    }, [text, password]);

    return (
        <Wrap>
            <Textarea 
                maxLength={MAX_TEXTAREA_LENGTH}
                ref={textareaRef}
                onChange={onChangeText}
                onBlur={onBlurTextarea}
                value={text}
                placeholder="안녕하세요. 오늘의 기분은 어떠신가요?"
            />

            <BottomWrap>
                <LetterCheck className={text.length >= MAX_TEXTAREA_LENGTH ? 'max' : ''}>
                    {text.length}/{MAX_TEXTAREA_LENGTH}
                </LetterCheck>

                <BottomInner>
                    <PasswordWrap>
                        <Input
                            maxLength={20}
                            type={visiblePassword ? 'text' : 'password'}
                            placeholder="비밀번호"
                            value={password}
                            onChange={onChangePassword}
                            onKeyPress={onKeyPressPassword}
                        />

                        <VisibleButtonPW onClick={onClickVisiblePassword}>
                            <EyeOutlined />
                        </VisibleButtonPW>
                    </PasswordWrap>

                    <SubmitButton type="button" onClick={onSubmit}>
                        등록
                    </SubmitButton>
                </BottomInner>
            </BottomWrap>
        </Wrap>
    );
};

export default GuestbookForm;

// TODO:
// - 보안 작업 (스크립트 금지 등)