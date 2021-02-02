import React from 'react';

import styled from 'styled-components';

import { PictureOutlined } from '@ant-design/icons';

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
    margin-top: 10px;
    text-align: right;

    button {
        cursor: pointer;
        outline: none;
    }

    input + button,
    button + button {
        margin-left: 10px;
    }
`;

const PasswordInput = styled.input`
    padding: 0 10px;
    width: 30%;
    height: 30px;
    color: #666;
    border: none;
    border-bottom: 1px solid #999;
    background: none;
    outline: none;
`;

const Button = styled.button`
    padding: 0;
    color: #666;
    border: none;
`;



const GuestForm = () => {
    return (
        <FormWrap 
            style={{ margin: '10px 0 20px' }} 
            encType="multipart/form-data" 
            // onFinish={onSubmit}
        >

            <Textarea
                // value={text}
                // onChange={onChangeText}
                maxLength={200}
                placeholder="오늘 기분은 어떠세요?"
            />

            <BottomArea>
                <PasswordInput 
                    type="text" 
                    placeholder="비밀번호"
                    maxLength={10}
                />

                <input type="file" name="image" multiple hidden 
                    // ref={imageInput} onChange={onChangeImages} 
                />
                <Button 
                    // onClick={onClickImageUpload}
                >
                    이미지업로드
                </Button>
                <Button 
                    type="submit" 
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