import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';

import { UploadOutlined } from '@ant-design/icons';
import { ADD_COMMENT_REQUEST } from '../../../reducers/guestbook';

const CommentForm = ({
    content,
    id,
}) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const [text, onChangeText, setText] = useInput();
    const [password, onChangePassword, setPassword] = useInput();

    // TODO: 비밀번호 암호화
    const onSubmit = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            // TODO: 테스트를 위해 값을 미리 넣어둔거 삭제
            data: {
                nickname: '하하',
                avatar: 'null',
                content: text,
                password: password,
                GuestbookId: id,
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
                        placeholder="비밀번호"
                        onChange={onChangePassword}
                    />
                    {/* TODO: 이미지 업로드.. */}
                    {/* <button>
                        <UploadOutlined />
                    </button> */}

                    <button onClick={onSubmit}>
                        완료
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentForm;