import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { ADD_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';

import { UploadOutlined, EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Wrap = styled.div`
    margin-bottom: 10px;
`;

const Textarea = styled.textarea`
    padding: 2%;
    width: 100%;
    height: 100px;
    border: none;
    box-sizing: border-box;
    outline: none;
    resize: none;
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


const GuestbookForm = ({ MAX_TEXTAREA_LENGTH }) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { addGuestbookDone } = useSelector((state) => state.guestbook);
    const [text, onChangeText, setText] = useInput('');
    const [password, onChangePassword, setPassword] = useInput('');
    const [avatar, setAvatar] = useState(me.avatar ? me.avatar : 'nickname');
    const [nickname, setNickname] = useState(me.nickname ? me.nickname : 'Guest');
    const [visiblePassword, setVisiblePassword] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => textareaRef.current.focus(), []);
    useEffect(() => {
        if (addGuestbookDone) {
            setText('');
            setPassword('');
        }
    }, [addGuestbookDone]);

    const onBlurTextarea = useCallback(() => {
        if (text.length > MAX_TEXTAREA_LENGTH) {
            setText(text.substr(0, MAX_TEXTAREA_LENGTH));
        }
    }, [text]);

    // TODO: 이미지 업로드 구현

    const onSubmit = useCallback(() => {
        if (!text || !text.trim()) {
            return alert('내용을 입력하세요.');
        }

        if (!password || !password.trim()) {
            return alert('비밀번호를 입력하세요.');
        }

        dispatch({
            type: ADD_GUESTBOOK_REQUEST,
            data: {
                avatar: avatar,
                nickname: nickname,
                password: password,
                content: text
            }
        });
    }, [text, password]);

    const onClickVisiblePassword = useCallback(() => setVisiblePassword(!visiblePassword), [visiblePassword]);

    return (
        <Wrap>
            <Textarea 
                maxLength={MAX_TEXTAREA_LENGTH}
                ref={textareaRef}
                onChange={onChangeText}
                onBlur={onBlurTextarea}
                value={text}
                placeholder="안녕하세요. 오늘의 기분은 어떠신가요?"
            />

            <BottomWrap>
                <LetterCheck className={text.length >= MAX_TEXTAREA_LENGTH ? 'max' : ''}>
                    {text.length}/{MAX_TEXTAREA_LENGTH}
                </LetterCheck>

                <BottomInner>
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

                    {/* TODO: 이미지업로드 기능 */}
                    <Button>
                        <UploadOutlined />
                    </Button>

                    <Button type="button" onClick={onSubmit}>
                        등록
                    </Button>
                </BottomInner>
            </BottomWrap>
        </Wrap>
    );
};

export default GuestbookForm;

// TODO:
// - 보안 작업 (스크립트 금지 등)