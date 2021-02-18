import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import { Avatar } from 'antd';

import WindowDialog from '../../WindowDialog/index';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { DELETE_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';

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
    const [securityCheck, setSecurityCheck] = useState(false);

    const onClickComment = useCallback(() => {
        setOpenedComment(!openedComment);
    }, [openedComment]);

    const onClickDelete = useCallback(() => {
        setSecurityCheck(true);
    }, []);

    const onSecurityCheck = useCallback(({state, text}) => {
        setSecurityCheck(false);

        if (state) {
            dispatch({
                type: DELETE_GUESTBOOK_REQUEST,
                data: {
                    id: id,
                    password: text
                }
            })
        }
    }, []);

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
                        <button>수정</button>
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


                {openedComment && (
                    <>
                        <CommentForm 
                            id={id}
                            content={content}
                        />

                        {Comments && Comments.map((v, i) => {
                            return (
                                <Comment 
                                    key={`comment_${v.nickname.charAt(0)}_${i}`}
                                    {...v}
                                />
                            )
                        })}
                    </>
                )}
            </div>
            
            {securityCheck && (
                <WindowDialog
                    type="prompt"
                    text="비밀번호를 입력해주세요." 
                    callback={onSecurityCheck}
                    // callback={opendEditForm}
                />
            )}
        </>
    );
};

export default GuestbookCard;