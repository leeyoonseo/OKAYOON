import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { UPDATE_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';

const EditForm = ({
    MAX_TEXTAREA_LENGTH,
    id,
    content,
}) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const [text, onChangetext, setText] = useInput(content ? content : '');
    const [avatar, setAvatar] = useState(me.avatar? me.avatar : 'nickname');
    const [nickname, setNickname] = useState(me.nickname ? me.nickname : 'Guest');

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
        <div>
            <textarea
                maxLength={MAX_TEXTAREA_LENGTH}
                onChange={onChangetext}
                value={text}
                placeholder="수정할 글을 작성해주세요."
            />
            <button onClick={onSubmit}>완료</button>
        </div>
    );
};

export default EditForm;