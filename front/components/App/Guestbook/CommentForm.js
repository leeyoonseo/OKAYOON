import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { ADD_COMMENT_REQUEST } from '../../../reducers/guestbook';

const Wrap = styled.div`
    margin-bottom: ${({ theme }) => theme.calcRem(15)};
`;

const Textarea = styled.textarea`
    padding: 2%;
    width: 100%;
    height: ${({ theme }) => theme.calcRem(100)};
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
        color: ${({ theme }) => theme.colors.darkPink};
    }
`;

const PasswordWrap = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(5)};
    position: relative;
    display: inline-block;
`;

const Input = styled.input`
    padding: ${({ theme }) => theme.calcRem(2)} ${({ theme }) => theme.calcRem(20)} ${({ theme }) => theme.calcRem(2)} ${({ theme }) => theme.calcRem(10)};
    width: ${({ theme }) => theme.calcRem(150)};
    border: none;
    outline: none;
    box-sizing: border-box;
`;

const VisibleButtonPW = styled.button`
    position: absolute;
    right: ${({ theme }) => theme.calcRem(5)};
    padding: 0;
    height: 100%;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const SubmitButton = styled.button`
    margin-left: ${({ theme }) => theme.calcRem(10)};
    padding: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const CommentForm = ({ 
    id,
    nickname,
    avatar,
}) => {
    const dispatch = useDispatch();
    const { addCommentDone } = useSelector((state) => state.guestbook);
    const [text, onChangeText, setText] = useInput('');
    const [password, onChangePassword, setPassword] = useInput('');
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

    const onClickVisiblePassword = useCallback(() => {
        setVisiblePassword(!visiblePassword);
    }, [visiblePassword]);

    const onKeyPressPassword = useCallback(({ code }) => {
        if (code === 'Enter') {
            onSubmit();
        }
    }, [text, password]);

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
                        onKeyPress={onKeyPressPassword}
                        autoComplete="new-password"
                        required
                    />

                    <VisibleButtonPW onClick={onClickVisiblePassword}>
                    {visiblePassword ? <EyeInvisibleOutlined /> : <EyeOutlined /> }
                    </VisibleButtonPW>
                </PasswordWrap>

                <SubmitButton 
                    type="button" 
                    onClick={onSubmit}
                >
                    등록
                </SubmitButton>
            </BottomInner>
        </Wrap>
    );
};

CommentForm.propTypes = {
    id: PropTypes.number.isRequired,
    nickname: PropTypes.string,
    avatar: PropTypes.string,
};

export default CommentForm;