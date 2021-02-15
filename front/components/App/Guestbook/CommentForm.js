import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';

import styled, { css } from 'styled-components';

import { EyeOutlined } from '@ant-design/icons';
import { ADD_COMMENT_REQUEST } from '../../../reducers/guestbook';

const Textarea = styled.textarea`
    padding: 10px;
    width: 100%;    
    min-height: 100px;
    color: #666;
    border: 1px solid #f0f2f5;
    border-radius: 3px;
    background: #f0f2f5;
    box-sizing: border-box;
    outline: none;

    &.empty {
        border: 1px solid red;
    }
`;

const BottomArea = styled.div`
    position: relative;
    text-align: right;
    color: #666;

    button {
        cursor: pointer;
        outline: none;
    }

    input + button,
    button + button {
        margin-left: 10px;
    }
`;

const LimitLetters = styled.div`
    position: absolute;
    left: 0;
    display: inline-block;

    &.maximum {
        color: #ff6059;
    }
`;

const PasswordInput = styled.input`
    padding: 0 10px;
    width: 30%;
    border: none;
    border-bottom: 1px solid #999;
    background: none;
    outline: none;

    &.empty {
        border-bottom: 1px solid red;
    }
`;

const HiddenCheckPWButton = styled.button`
    padding: 0;
    margin-left: 0 !important;
    background: none;
    border: none;
    outline: none;

    &:hover,
    &:focus { 
        background: none;
    }
`;
const defaultButtonStyle = css`
    padding: 0;
    border: none;
    background: none;
    font-size: 12px;
    outline: none;
    border: none;

    &:hover,
    &:focus {
        color: #666;
        background: none;
    }
`;

const SubmitButton = styled.button`
    ${defaultButtonStyle}
`;

const CommentForm = () => {
    const dispatch = useDispatch();
    const { addCommentDone } = useSelector((state) => state.guestbook);
    const { me } = useSelector((state) => state.user);
    const [textVal, changeTextVal, setTextVal] = useInput('');
    const [passwordVal, changePasswordVal, setPasswordVal] = useInput('');
    const [checkHiddenPW, setCheckHiddenPW] = useState(false);
    const textareaRef = useRef(null);
    const pwInputRef = useRef(null);

    const CLASSNAME_EMPTY = 'empty';
    const maxTextLength = 20;
    let validationFailureNum = 0;

    useEffect(() => {
        textareaRef.current.focus();
    }, []);

    useEffect(() => {
        if(addCommentDone){
            setTextVal('');
            setPasswordVal('');
        }
    }, [addCommentDone]);

    // TODO: 이미지 업로드
    const onClickImageUpload = useCallback((e) => {
        e.preventDefault();
        console.log('onClickImageUpload');
    }, []);

    const onFocus = useCallback(({ target }) => {
        if(target.classList.contains(CLASSNAME_EMPTY)) {
            target.classList.remove(CLASSNAME_EMPTY);
        }
    }, []);

    const formValidation = useCallback(() => {
        // textarea
        if(!textVal || !textVal.trim()) {
            ++validationFailureNum;
            textareaRef.current.classList.add(CLASSNAME_EMPTY);
        }

        // pw
        if(!passwordVal || !passwordVal.trim()) {
            ++validationFailureNum;
            pwInputRef.current.classList.add(CLASSNAME_EMPTY);
        }

        return (!validationFailureNum) ? true : false;
    }, [textVal, passwordVal]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const result = formValidation();

        if(result) {
            return dispatch({
                type: ADD_COMMENT_REQUEST,
                data: {
                    nickname: me.nickname,
                    avatar: me.avatar,
                    createDt: '2020.04.11 AM 11:12',
                    content: textVal,
                    password: passwordVal,
                },
            });
        }
    }, [textVal, passwordVal]);

    const onChangeHiddenPW = useCallback((e) => {
        e.preventDefault();
        setCheckHiddenPW(!checkHiddenPW);
    }, [checkHiddenPW]);

    return (
        <form onSubmit={onSubmit}>
            <Textarea
                ref={textareaRef}
                onFocus={onFocus}
                value={textVal}
                name="content"
                onChange={changeTextVal}
                maxLength={maxTextLength}
                placeholder="댓글을 작성해주세요."
            />

            <BottomArea>
                <LimitLetters 
                    className={textVal.length === maxTextLength ? 'maximum' : ''}
                >
                    {textVal.length}/{maxTextLength}
                </LimitLetters>

                <PasswordInput 
                    name="password"

                    ref={pwInputRef}
                    type={checkHiddenPW ? 'text' : 'password'} 
                    onFocus={onFocus}
                    value={passwordVal}
                    onChange={changePasswordVal}
                    placeholder="비밀번호"
                    maxLength={20}
                />

                <HiddenCheckPWButton onClick={onChangeHiddenPW}>
                    <EyeOutlined />
                </HiddenCheckPWButton>

                <SubmitButton type="submit">
                    등록
                </SubmitButton>
            </BottomArea>
        </form>
    );
};

export default CommentForm;

// TODO:
// - 보안 작업 (스크립트 금지 등)