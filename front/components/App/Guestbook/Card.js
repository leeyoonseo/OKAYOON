import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import { Avatar } from 'antd';

import WindowDialog from '../../WindowDialog/index';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
import { DELETE_GUESTBOOK_REQUEST, GET_PERMISSION_REQUEST } from '../../../reducers/guestbook';

const GuestbookCard = ({
    id,
    nickname,
    avatar,
    createdAt,
    content,
    Comments,
}) => {
    const dispatch = useDispatch();
    const [openedComment, setOpenedComment] = useState(false);
    const [openedModal, setOpenedModal] = useState(false);
    const [reqStatus, setReqStatus] = useState('');

    const passwordCheck = useCallback(({state, text}) => {
        setOpenedModal(false);

        if (state) {
            let dataType = DELETE_GUESTBOOK_REQUEST;

            if (reqStatus === 'edit') {
                dataType = GET_PERMISSION_REQUEST;
            } 

            dispatch({
                type: dataType,
                data: {
                    id: id,
                    password: text
                }
            });
        }
        
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
                    <Avatar 
                        src={null}
                        // TODO: null하니까 get 요청가버림.. 
                        // src={avatar}
                    />
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