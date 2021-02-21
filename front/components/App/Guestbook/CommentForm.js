import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import styled from 'styled-components';

import { UploadOutlined, EyeOutlined } from '@ant-design/icons';
import { ADD_COMMENT_REQUEST } from '../../../reducers/guestbook';

const Wrap = styled.div`
    margin-bottom: 15px;
`;

const Textarea = styled.textarea`
    padding: 2%;
    width: 100%;
    height: 80px;
    border: none;
    outline: none;
    box-sizing: border-box;
    resize: none;
`;

const BottomInner = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
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

const PasswordWrap = styled.div`
    position: relative;
    display: inline-block;
`;

const Input = styled.input`
    padding: 2px 20px 2px 10px;
    width: 150px;
    border: none;
    outline: none;
    box-sizing: border-box;
`;

const ToggleButton = styled.button`
    position: absolute;
    right: 5px;
    padding: 0;
    height: 100%;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const Button = styled.button`
    margin-left: 10px;
    padding: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const CommentForm = ({ id }) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { addCommentDone } = useSelector((state) => state.guestbook);
    const [text, onChangeText, setText] = useInput('');
    const [password, onChangePassword, setPassword] = useInput('');
    const [avatar, setAvatar] = useState(me.avatar ? me.avatar : 'nickname');
    const [nickname, setNickname] = useState(me.nickname ? me.nickname : 'Guest');
    const [visiblePassword, setVisiblePassword] = useState(false);

    const MAX_TEXTAREA_LENGTH = 50; 

    useEffect(() => {
        if (addCommentDone) {
            setText('');
            setPassword('');
        }
    }, [addCommentDone]);

    const onBlurTextarea = useCallback(() => {
        if (text.length > MAX_TEXTAREA_LENGTH) {
            setText(text.substr(0, MAX_TEXTAREA_LENGTH));
        }
    }, [text]);

    // TODO: 비밀번호 암호화
    const onSubmit = useCallback(() => {
        if (!text || !text.trim()) {
            return alert('댓글을 입력하세요.');
        }

        if (!password || !password.trim()) {
            return alert('댓글 비밀번호를 입력하세요.');
        }

        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                GuestbookId: id,
                password: password,
                nickname: nickname,
                avatar: avatar,
                content: text,
            }
        });
    }, [text, password]);

    const onClickVisiblePassword = useCallback(() => setVisiblePassword(!visiblePassword), [visiblePassword]);

    return (
        <Wrap>
            <Textarea 
                maxLength={MAX_TEXTAREA_LENGTH}
                value={text}
                onChange={onChangeText}
                onBlur={onBlurTextarea}
                placeholder="댓글을 입력해주세요."
            />
            <BottomInner>
                <LetterCheck className={text.length >= MAX_TEXTAREA_LENGTH ? 'max' : ''}>
                    {text.length}/{MAX_TEXTAREA_LENGTH}
                </LetterCheck>

                <PasswordWrap>
                    <Input
                        maxLength={20}
                        type={visiblePassword ? 'text' : 'password'}
                        placeholder="비밀번호"
                        value={password}
                        onChange={onChangePassword}
                    />

                    <ToggleButton onClick={onClickVisiblePassword}>
                        <EyeOutlined />
                    </ToggleButton>
                </PasswordWrap>

                <Button type="button" onClick={onSubmit}>
                    등록
                </Button>
            </BottomInner>
        </Wrap>
    );
};

export default CommentForm;