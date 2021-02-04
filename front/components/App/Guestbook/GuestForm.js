import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';

import styled from 'styled-components';

import { EyeOutlined } from '@ant-design/icons';
import { ADD_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';

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

const Button = styled.button`
    padding: 0;
    border: none;
    background: none;
`;

const GuestForm = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const [textVal, changeTextVal] = useInput('');
    const [passwordVal, changePasswordVal] = useInput('');
    const [checkHiddenPW, setCheckHiddenPW] = useState(false);
    const textareaRef = useRef(null);
    const pwInputRef = useRef(null);

    const CLASSNAME_EMPTY = 'empty';
    const maxTextLength = 100;
    let validationFailureNum = 0;

    useEffect(() => {
        // validationFailureNum = 0;
        textareaRef.current.focus();
    }, []);

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
                type: ADD_GUESTBOOK_REQUEST,
                data: {
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
        <form>

            <Textarea
                ref={textareaRef}
                onFocus={onFocus}
                onChange={changeTextVal}
                maxLength={maxTextLength}
                placeholder="오늘 기분은 어떠세요?"
            />

            <BottomArea>
                <LimitLetters 
                    className={textVal.length === maxTextLength ? 'maximum' : ''}
                >
                    {textVal.length}/{maxTextLength}
                </LimitLetters>

                <PasswordInput 
                    ref={pwInputRef}
                    type={checkHiddenPW ? 'text' : 'password'} 
                    onFocus={onFocus}
                    onChange={changePasswordVal}
                    placeholder="비밀번호"
                    maxLength={20}
                />

                <HiddenCheckPWButton onClick={onChangeHiddenPW}>
                    <EyeOutlined />
                </HiddenCheckPWButton>

                {/* <input type="file" name="image" multiple hidden 
                    // ref={imageInput} onChange={onChangeImages} 
                /> */}
                <Button onClick={onClickImageUpload}>
                    이미지업로드
                </Button>
                <Button onClick={onSubmit}>
                    등록
                </Button>
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