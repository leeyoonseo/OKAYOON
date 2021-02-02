import React from 'react';

import styled from 'styled-components';

import { Button, Form, Input } from 'antd';
import { PictureOutlined } from '@ant-design/icons';

const FormWrap = styled.form`

`;

const Textarea = styled.textarea`

`;

const PasswordInput = styled.input`

`;

const ButtonArea = styled.div``;

const PicktureButton = styled.button``;
const PicktureIcon = styled(PictureOutlined)``;
const SubmitButton = styled.button``;

// const FormWrap = styled(Form)`
//     margin: 0;

//     input, 
//     textarea,
//     button {
//         font-size: 12px;
//     }

//     input:hover,
//     textarea:hover {

//     }

//     input:focus,
//     textarea:focus,
//     input:active,
//     textarea:active {
//         border: none;
//         box-shadow: none;
//     }
// `;

// const Textarea = styled(Input.TextArea)`
//     margin-bottom: 10px;
//     height: 100px !important;
//     border: none;
//     outline: none;
// `;

// const PasswordInput = styled(Input)`
//     width: 30%;
//     float: left;
//     border: none;
//     outline: none;
// `;

// const ButtonArea = styled.div`
//     width: 70%;
//     float: right;
//     text-align: right;

//     button {
//         cursor: pointer;
//     }

//     button + button {
//         margin-left: 10px;
//     }
// `;

// const PicktureButton = styled.button`
//     padding: 0;
//     line-height: 1;
//     vertical-align: middle;
//     background: none;
//     outline: none;
//     border: none;
// `;

// const PicktureIcon = styled(PictureOutlined)`
//     font-size: 20px;
//     color: #555;
// `;

// const SubmitButton = styled.button`
//     width: 50px;
//     color: #fff;
//     background: #999;
//     border: 1px solid #999;
//     outline: none;
// `;

const GuestForm = () => {
    return (
        <FormWrap 
            style={{ margin: '10px 0 20px' }} 
            encType="multipart/form-data" 
            // onFinish={onSubmit}
        >

            <textarea>

            </textarea>
            <Textarea
                // value={text}
                // onChange={onChangeText}
                maxLength={200}
                placeholder="오늘 기분은 어떠세요?"
            />

            <PasswordInput 
                type="text" 
                placeholder="비밀번호"
                maxLength={10}
            />
            
            <ButtonArea>
                <input type="file" name="image" multiple hidden 
                    // ref={imageInput} onChange={onChangeImages} 
                />
                <PicktureButton 
                    // onClick={onClickImageUpload}
                >
                    <PicktureIcon />
                </PicktureButton>
                <SubmitButton 
                    type="submit" 
                >
                    등록
                </SubmitButton>
            </ButtonArea>
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