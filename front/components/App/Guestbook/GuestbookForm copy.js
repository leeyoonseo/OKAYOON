import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { ADD_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';

import styled, { css } from 'styled-components';
import { EyeOutlined } from '@ant-design/icons';

const Textarea = styled.textarea`
    padding: 10px;
    width: 100%;    
    min-height: 100px;
    color: #666;
    border: 1px solid #f0f2f5;
    border-radius: 3px;
    box-sizing: border-box;
    outline: none;

    &.empty {
        border: 1px solid red;
    }
`;

const CheckArea = styled.div`
    position: relative;
    margin-top: 10px;
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
`;

const PasswordShowButton = styled.button`
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

const ImageUploadButton = styled.button`
    ${defaultButtonStyle}
`;

const SubmitButton = styled.button`
    ${defaultButtonStyle}
`;

const EditForm = ({ content }) => {
    const dispatch = useDispatch();
    const { addGuestbookDone } = useSelector((state) => state.guestbook);
    const { me } = useSelector((state) => state.user);
    const [textVal, changeTextVal, setTextVal] = useInput(content ? content : '');
    const [passwordVal, changePasswordVal, setPasswordVal] = useInput('');
    const [checkHiddenPW, setCheckHiddenPW] = useState(false);

    const textareaRef = useRef(null);
    const pwInputRef = useRef(null);
    const maxTextLength = 100;

    useEffect(() => {
        textareaRef.current.focus();
    }, []);

    useEffect(() => {
        if(addGuestbookDone){
            setTextVal('');
            setPasswordVal('');
        }
    }, [addGuestbookDone]);

    const onClickImageUpload = useCallback((e) => {
        e.preventDefault();
        console.log('onClickImageUpload');
    }, []);

    const onSubmit = useCallback(() => {
        if(!textVal || !textVal.trim()) {
            textareaRef.current.focus();
            return alert('내용을 입력해주세요.');
        }

        // if(!passwordVal || !passwordVal.trim()) {
        //     pwInputRef.current.focus();
        //     return alert('비밀번호를 입력해주세요.');
        // }

        dispatch({
            type: EDIT_GUESTBOOK_REQUEST,
            data: {
                nickname: me.nickname,
                avatar: me.avatar,
                content: textVal,
                // password: passwordVal,
            }
        });
    }, [textVal, passwordVal]);

    const onChangeHiddenPW = useCallback((e) => {
        e.preventDefault();
        setCheckHiddenPW(!checkHiddenPW);
    }, [checkHiddenPW]);

    return (
        <div>
            <Textarea
                maxLength={maxTextLength}
                ref={textareaRef}
                value={textVal}
                onChange={changeTextVal}
                placeholder="안녕하세요, 오늘의 기분은 어떠신가요?"
            />

            <CheckArea>
                <LimitLetters 
                    className={textVal.length === maxTextLength ? 'maximum' : ''}
                >
                    {textVal.length}/{maxTextLength}
                </LimitLetters>

                <PasswordInput 
                    maxLength={20}
                    placeholder="비밀번호"
                    ref={pwInputRef}
                    type={checkHiddenPW ? 'text' : 'password'} 
                    value={passwordVal}
                    onChange={changePasswordVal}
                />

                <PasswordShowButton onClick={onChangeHiddenPW}>
                    <EyeOutlined />
                </PasswordShowButton>

                {/* TODO: 이미지 2장까지 */}
                {/* <input type="file" name="image" multiple hidden 
                    name="password"
                    // ref={imageInput} onChange={onChangeImages} 
                /> */}
                <ImageUploadButton 
                    // onClick={onClickImageUpload}
                >
                    이미지업로드
                </ImageUploadButton>
                
                <SubmitButton onClick={onSubmit}>
                    등록
                </SubmitButton>
            </CheckArea>
        </div>
    );
};

export default EditForm;

// TODO:
// - 보안 작업 (스크립트 금지 등)