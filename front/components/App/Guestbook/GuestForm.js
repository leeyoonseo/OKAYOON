import React, { useCallback, useEffect, useState } from 'react';
import useInput from '../../../hooks/useInput';

import styled from 'styled-components';

import { EyeOutlined } from '@ant-design/icons';


const FormWrap = styled.form`
    
`;

const Textarea = styled.textarea`
    padding: 10px;
    width: 100%;    
    min-height: 100px;
    color: #666;
    border: none;
    border-radius: 3px;
    outline: none;
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
    const [textareaVal, changeTextareaVal, setTextareaVal] = useInput('');
    const [textareaLength, setTextareaLength] = useState(0);
    const [checkHiddenPW, setCheckHiddenPW] = useState(false);
    
    const maxTextareaLength = 200;
    
    useEffect(() => {
        setTextareaLength(textareaVal.length);
    }, [textareaVal]);

    const onClickImageUpload = useCallback((e) => {
        e.preventDefault();
        console.log('onClickImageUpload');
    }, []);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        console.log('onSubmit');
    }, []);

    const onChangeHiddenPW = useCallback((e) => {
        e.preventDefault();
        setCheckHiddenPW(!checkHiddenPW);
    }, [checkHiddenPW]);

    return (
        <FormWrap 
            // style={{ margin: '10px 0 20px' }} 
            // encType="multipart/form-data" 
            // onSubmit={onSubmit} 
        >

            <Textarea
                // value={text}
                onChange={changeTextareaVal}
                maxLength={maxTextareaLength}
                placeholder="오늘 기분은 어떠세요?"
            />

            <BottomArea>
                <LimitLetters className={textareaLength === maxTextareaLength ? 'maximum' : ''}>
                    {textareaLength}/{maxTextareaLength}
                </LimitLetters>

                <PasswordInput 
                    type={checkHiddenPW ? 'text' : 'password'} 
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
                <Button 
                    onClick={onSubmit}
                >
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
        </FormWrap>
    );
};

export default GuestForm;