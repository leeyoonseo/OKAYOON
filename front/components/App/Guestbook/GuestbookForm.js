import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { ADD_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';

import { UploadOutlined } from '@ant-design/icons';

const GuestbookForm = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);

    const [text, onChangeText, setText] = useInput('');
    const [password, onChangePassword, setPassword] = useInput('');

    const onSubmit = useCallback(() => {
        // TODO: 테스트를 위해 임시로 값 넣은거 삭제
        const avatar = me.avatar ? me.avatar : 'null';
        const nickname = me.nickname ? me.nickname : 'Guest';
        // TODO:

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

    return (
        <div>
            <textarea 
                onChange={onChangeText}
            />

            <div>
                <span>
                    1/100
                </span>
                <div>
                    <input
                    // TODO: password로 변경할 것
                        type="text"
                        placeholder="비밀번호"
                        onChange={onChangePassword}
                    />

                    {/* <button>
                        <UploadOutlined />
                    </button> */}

                    <button
                        onClick={onSubmit}
                    >
                        입력
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GuestbookForm;