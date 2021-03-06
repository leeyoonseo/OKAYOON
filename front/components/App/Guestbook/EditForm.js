import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import useInput from '../../../hooks/useInput';
import { UPDATE_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';

import { UploadOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    margin-bottom: 20px;
`;

const Textarea = styled.textarea`
    padding: 3%;
    width: 100%;
    height: 100px;
    border: none;
    outline: none;
`; 

const BottomWrap = styled.div`
    margin-top: 10px;
    position: relative;
    text-align: right;
`;

const LetterCheck = styled.span`
    position: absolute;
    top: 0;
    left: 0;

    &.max {
        color: red;
    }
`;

const BottomInner = styled.div`
    display: inline-block;
`;

const Button = styled.button`
    margin-left: 10px;
    padding: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const EditForm = ({
    MAX_TEXTAREA_LENGTH,
    id,
    content,
    nickname,
    avatar
}) => {
    const dispatch = useDispatch();
    const [text, onChangetext, setText] = useInput('');
    const textareaRef = useRef(null);

    useEffect(() => {
        textareaRef.current.focus();
        setText(content);
    }, []);

    const onSubmit = useCallback(() => {
        if (!text || !text.trim()) {
            return alert('내용을 입력해주세요.');
        }

        dispatch({
            type: UPDATE_GUESTBOOK_REQUEST,
            data: {
                id: id,
                nickname: nickname,
                avatar: avatar,
                content: text,
            }
        });   
    }, [text]);

    return (
        <Wrap>
            <Textarea
                maxLength={MAX_TEXTAREA_LENGTH}
                onChange={onChangetext}
                value={text}
                ref={textareaRef}
                placeholder="수정할 글을 작성해주세요."
            />

            <BottomWrap>
                <LetterCheck className={text.length >= MAX_TEXTAREA_LENGTH ? 'max' : ''}>
                    {text.length}/{MAX_TEXTAREA_LENGTH}
                </LetterCheck>

                <BottomInner>
                    {/* TODO: 이미지업로드 기능 */}
                    <Button>
                        <UploadOutlined />
                    </Button>

                    <Button type="button" onClick={onSubmit}>
                        완료
                    </Button>
                </BottomInner>
            </BottomWrap>
        </Wrap>
    );
};

export default EditForm;