import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';

import { UploadOutlined } from '@ant-design/icons';
import { ADD_COMMENT_REQUEST } from '../../../reducers/guestbook';

const CommentForm = ({
    id,
    content,
}) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const [text, onChangeText] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [avatar, setAvatar] = useState(me.avatar ? me.avatar : 'nickname');
    const [nickname, setNickname] = useState(me.nickname ? me.nickname : 'Guest');

    // TODO: 비밀번호 암호화
    const onSubmit = useCallback(() => {
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

    return (
        <div>
            <textarea 
                value={text}
                onChange={onChangeText}
                placeholder="댓글을 입력해주세요."
            />
            <div>
                <span>
                    1/50
                </span>
                <div>
                    <input 
                        placeholder="비밀번호"
                        value={password}
                        onChange={onChangePassword}
                    />
                    
                    <button onClick={onSubmit}>
                        완료
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentForm;