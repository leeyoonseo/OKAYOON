import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { Avatar } from 'antd';

import { DELETE_GUESTBOOK_REQUEST, GET_PERMISSION_REQUEST } from '../../../reducers/guestbook';
import { getSrc } from './index';

import WindowDialog from '../../WindowDialog/index';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';

const GuestbookCard = ({
    id,
    nickname,
    avatar,
    createdAt,
    content,
    Comments,
}) => {
    const dispatch = useDispatch();
    const { avatarList } = useSelector((state) => state.user);
    const [openedComment, setOpenedComment] = useState(false);
    const [openedModal, setOpenedModal] = useState(false);
    const [reqStatus, setReqStatus] = useState('');

    const passwordCheck = useCallback(({state, text}) => {
        setOpenedModal(false);

        if (!state) return;

        dispatch({
            type: (reqStatus === 'edit') ? GET_PERMISSION_REQUEST : DELETE_GUESTBOOK_REQUEST,
            data: {
                id: id,
                password: text
            }
        });
    }, [reqStatus, id]);

    const onClickEdit = useCallback(() => {
        setOpenedModal(true);
        setReqStatus('edit');
    }, []);

    const onClickDelete = useCallback(() => {
        setOpenedModal(true);
        setReqStatus('delete');
    }, []);

    const onClickComment = useCallback(() => {
        setOpenedComment(!openedComment);
    }, [openedComment]);

    return (
        <>
            <div style={{border: '1px solid red'}}>
                <div>
                    {avatar === 'nickname' ? (
                        <Avatar>{nickname}</Avatar>
                    ) : (
                        <Avatar src={getSrc(avatarList, avatar)} />
                    )}
                </div>

                <div>
                    <span>{nickname}</span>
                    <span>{dayjs(createdAt).format('YYYY.MM.DD')}</span>

                    <div>
                        <button
                            onClick={onClickEdit}
                        >
                            수정
                        </button>
                        <button
                            onClick={onClickDelete}
                        >
                            삭제
                        </button>
                    </div>

                    <div>
                        {content}
                    </div>
                </div>

                <div>
                    <button onClick={onClickComment}>
                        코멘트보기
                    </button>
                </div>
            </div>
            
            {openedComment && (
                <>
                    <CommentForm 
                        id={id}
                        content={content}
                    />

                    {Comments && Comments.map((v, i) => {
                        return (
                            <CommentCard 
                                key={`comment_${v.nickname.charAt(0)}_${i}`}
                                {...v}
                            />
                        )
                    })}
                </>
            )}
            
            {openedModal && (
                <WindowDialog
                    type="prompt"
                    text="비밀번호를 입력해주세요." 
                    callback={passwordCheck}
                />
            )}
        </>
    );
};

export default GuestbookCard;