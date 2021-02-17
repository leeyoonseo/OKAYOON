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

const BottomArea = styled.div`
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

const ImageUploadButton = styled.button`
    ${defaultButtonStyle}
`;

const SubmitButton = styled.button`
    ${defaultButtonStyle}
`;

const GuestForm = () => {
    const dispatch = useDispatch();
    const { addGuestbookDone } = useSelector((state) => state.guestbook);
    const { me } = useSelector((state) => state.user);
    const [textVal, changeTextVal, setTextVal] = useInput('');
    const [passwordVal, changePasswordVal, setPasswordVal] = useInput('');
    const [checkHiddenPW, setCheckHiddenPW] = useState(false);

    const textareaRef = useRef(null);
    const pwInputRef = useRef(null);

    const CLASSNAME_EMPTY = 'empty';
    const maxTextLength = 100;
    let validationFailNum = 0;

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

    const onFocus = useCallback(({ target }) => {
        if(target.classList.contains(CLASSNAME_EMPTY)) {
            target.classList.remove(CLASSNAME_EMPTY);
        }
    }, []);

    const formValidation = useCallback(() => {
        // textarea
        if(!textVal || !textVal.trim()) {
            ++validationFailNum;
            textareaRef.current.classList.add(CLASSNAME_EMPTY);
        }

        // pw
        if(!passwordVal || !passwordVal.trim()) {
            ++validationFailNum;
            pwInputRef.current.classList.add(CLASSNAME_EMPTY);
        }

        return (!validationFailNum) ? true : false;
    }, [textVal, passwordVal]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const result = formValidation();

        if(result) {
            return dispatch({
                type: ADD_GUESTBOOK_REQUEST,
                data: {
                    nickname: me.nickname,
                    avatar: me.avatar,
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
                placeholder="안녕하세요, 오늘의 기분은 어떠신가요?"
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

                <input type="file" name="image" multiple hidden 
                    name="password"
                    // ref={imageInput} onChange={onChangeImages} 
                />
                <ImageUploadButton 
                    onClick={onClickImageUpload}
                >
                    이미지업로드
                </ImageUploadButton>
                
                <SubmitButton type="submit">
                    등록
                </SubmitButton>
            </BottomArea>
            {/* <div>
                {imagePaths.map((v, i) => (
                <div key={v} style={{ display: 'inline-block' }}>
                    <img src={v.replace(/\/thumb\//, '/original/')} style={{ width: '200px' }} alt={v} />
                    <div>
                    <Button onClick={onRemoveImage(i)}>제거</Button>
                    </div>
                </div>
                ))}
            </div> */}
        </form>
    );
};

export default GuestForm;

// TODO:
// - 보안 작업 (스크립트 금지 등)