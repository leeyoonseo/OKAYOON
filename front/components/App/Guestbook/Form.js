import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { ADD_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';

import { UploadOutlined, EyeOutlined } from '@ant-design/icons';

const GuestbookForm = ({
    MAX_TEXTAREA_LENGTH,
}) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { addGuestbookDone } = useSelector((state) => state.guestbook);
    const [text, onChangeText, setText] = useInput('');
    const [password, onChangePassword, setPassword] = useInput('');
    const [visiblePassword, setVisiblePassword] = useState(false);
    const textareaRef = useRef(null);


    useEffect(() => textareaRef.current.focus(), []);
    useEffect(() => {
        if (addGuestbookDone) {
            setText('');
            setPassword('');
        }
    }, [addGuestbookDone]);

    // TODO: 이미지 업로드 구현

    const onSubmit = useCallback(() => {
        // TODO: 테스트를 위해 임시로 값 넣은거 삭제
        const avatar = me.avatar ? me.avatar : 'null';
        const nickname = me.nickname ? me.nickname : 'Guest';
        // TODO:

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
                content: text,
            }
        });
    }, [text, password]);

    const onClickVisiblePassword = useCallback(() => setVisiblePassword(!visiblePassword), [visiblePassword]);

    return (
        <div>
            <textarea 
                maxLength={MAX_TEXTAREA_LENGTH}
                ref={textareaRef}
                onChange={onChangeText}
                value={text}
                placeholder="안녕하세요. 오늘의 기분은 어떠신가요?"
            />

            <div>
                <span
                    className={text.length === MAX_TEXTAREA_LENGTH ? 'full' : ''}
                >
                    {text.length}/{MAX_TEXTAREA_LENGTH}
                </span>
                <div>
                    <input
                        maxLength={20}
                        type={visiblePassword ? 'text' : 'password'}
                        placeholder="비밀번호"
                        onChange={onChangePassword}
                        value={password}
                    />

                    <button 
                        onClick={onClickVisiblePassword}
                    >
                        <EyeOutlined />
                    </button>

                    {/* TODO: 이미지업로드 기능
                    <button>
                        <UploadOutlined />
                    </button> */}

                    <button
                        onClick={onSubmit}
                    >
                        등록
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GuestbookForm;

// TODO:
// - 보안 작업 (스크립트 금지 등)