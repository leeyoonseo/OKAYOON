import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import PropTypes from 'prop-types';
import { ADD_COMMENT_REQUEST, ADD_GUESTBOOK_REQUEST, REVOKE_PERMISSION_REQUEST, UPDATE_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';
import styled, { css } from 'styled-components';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { FORM_COMMENT, FORM_CREATE, FORM_EDIT } from './index';

const Wrap = styled.div`
    margin-bottom: ${({ theme }) => theme.calcRem(20)};
`;

const Textarea = styled.textarea`
    padding: 3%;
    width: 100%;
    height: ${({ h, theme }) => theme.calcRem(h)};
    border: none;
    box-sizing: border-box;
    outline: none;
    resize: none;
    IME-MODE: auto;
`;

const BottomWrap = styled.div`
    position: relative;
    margin-top: ${({ theme }) => theme.calcRem(10)};
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

const BottomInner = styled.div`
    display: inline-block;
`;

const PasswordWrap = styled.div`
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

const defaultButtonStyle = css`
    padding: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

const VisibleButtonPW = styled.button`
    ${defaultButtonStyle}
    position: absolute;
    right: ${({ theme }) => theme.calcRem(5)};
    height: 100%;
`;

const CancelButton = styled.button`
    ${defaultButtonStyle}
`;

const SubmitButton = styled.button`
    ${defaultButtonStyle}
    margin-left: ${({ theme }) => theme.calcRem(10)};
`;

const Form = ({ 
    formtype,
    MAX_TEXTAREA_LENGTH,
    avatar,
    nickname,
    id,
    content,
}) => {
    const dispatch = useDispatch();
    const { addGuestbookDone, addCommentDone } = useSelector((state) => state.guestbook);
    const [text, onChangeText, setText] = useInput('');
    const [password, onChangePassword, setPassword] = useInput('');
    const [visiblePassword, setVisiblePassword] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (formtype === FORM_EDIT) {
            setText(content);
        }

        textareaRef.current.focus();
    }, [formtype, content]);

    useEffect(() => {
        if (formtype === FORM_EDIT) return;

        if (addGuestbookDone || addCommentDone) {
            setText('');
            setPassword('');

            textareaRef.current.focus();
        }
    }, [formtype, addGuestbookDone, addCommentDone]);

    const onBlurTextarea = useCallback(() => {
        if (text.length > MAX_TEXTAREA_LENGTH) {
            setText(text.substr(0, MAX_TEXTAREA_LENGTH));
        }
    }, [text]);

    const validation = useCallback(() => {
        if (!text || !text.trim()) {
            alert('내용을 입력해주세요.');
            return false;
        }

        if (formtype !== FORM_EDIT && (!password || !password.trim())) {
            alert('비밀번호를 입력해주세요.');
            return false;
        }

        return true;
    }, [text, password, formtype]);

    const onClickCancel = useCallback(() => {
        dispatch({ 
            type: REVOKE_PERMISSION_REQUEST,
            data: {
                id: id
            },
        });
    }, [id]);

    const onSubmit = useCallback(() => {
        let type = '';
        let data = {};

        validation();

        if (formtype === FORM_CREATE) {
            type = ADD_GUESTBOOK_REQUEST;
            data.password = password;
            data.Comments = [];
        
        } else if (formtype === FORM_EDIT) {
            type = UPDATE_GUESTBOOK_REQUEST;
            data.id = id;

        } else if (formtype === FORM_COMMENT) {
            type = ADD_COMMENT_REQUEST;
            data.GuestbookId = id;
            data.password = password;
        }

        data = {
            ...data,
            nickname: nickname,
            avatar: avatar,
            content: text
        };

        dispatch({
            type: type,
            data: data,
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
                h={formtype === FORM_COMMENT ? 100 : 130}
                maxLength={MAX_TEXTAREA_LENGTH}
                ref={textareaRef}
                onChange={onChangeText}
                onBlur={onBlurTextarea}
                value={text}
                placeholder={
                    formtype === FORM_COMMENT
                    ? '댓글을 입력해주세요.'
                    : '글을 입력해주세요.'
                }
            />

            <BottomWrap>
                <LetterCheck className={text.length >= MAX_TEXTAREA_LENGTH ? 'max' : ''}>
                    {text.length}/{MAX_TEXTAREA_LENGTH}
                </LetterCheck>

                <BottomInner>
                    {formtype !== FORM_EDIT && (
                        <PasswordWrap>
                            <Input
                                type={visiblePassword ? 'text' : 'password'}
                                maxLength={20}
                                autoComplete="new-password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={onChangePassword}
                                onKeyPress={onKeyPressPassword}
                                required
                            />

                            <VisibleButtonPW onClick={onClickVisiblePassword}>
                                {visiblePassword ? <EyeInvisibleOutlined /> : <EyeOutlined /> }
                            </VisibleButtonPW>
                        </PasswordWrap>
                    )}  

                    {formtype === FORM_EDIT && (
                        <CancelButton
                            type="button"
                            onClick={onClickCancel}
                        >
                            취소
                        </CancelButton>
                    )}

                    <SubmitButton 
                        type="button" 
                        onClick={onSubmit}
                    >
                        {formtype === FORM_EDIT ? '수정' : '등록'}
                    </SubmitButton>
                </BottomInner>
            </BottomWrap>
        </Wrap>
    );
};

Form.propTypes = {
    formtype: PropTypes.string.isRequired,
    MAX_TEXTAREA_LENGTH: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    nickname: PropTypes.string,
    id: PropTypes.number,
    content: PropTypes.string,
};

export default Form;