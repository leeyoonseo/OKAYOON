import React from 'react';

import { Button, Form, Input } from 'antd';
import styled from 'styled-components';

const FormWrap = styled(Form)`
    input, 
    textarea,
    button {
        font-size: 12px;
    }
`;

const TextArea = styled(Input.TextArea)`
`;

const GuestForm = () => {
    return (
        <FormWrap 
            style={{ margin: '10px 0 20px' }} 
            encType="multipart/form-data" 
            // onFinish={onSubmit}
        >
            <TextArea
                // value={text}
                // onChange={onChangeText}
                maxLength={200}
                placeholder="오늘 기분은 어떠세요?"
            />
            <div>
                <input 
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
                    사진
                </Button>
                <Button 
                    type="primary" 
                    style={{ float: 'right' }} 
                    htmlType="submit"
                >
                    등록
                </Button>
            </div>
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