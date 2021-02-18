import React, { useCallback, useEffect, useState } from 'react';

import { Avatar } from 'antd';

import CommentForm from './CommentForm';
import Comment from './Comment';
import { useDispatch } from 'react-redux';

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

    const onClickComment = useCallback(() => {
        setOpenedComment(!openedComment);
    }, [openedComment]);

    return (
        <div>
            <div>
                <Avatar 
                    src={null}
                    // TODO: null하니까 get 요청가버림.. 
                    // src={avatar}
                />
            </div>

            <div>
                <span>{nickname}</span>
                <span>{createdAt}</span>

                <div>
                    {content}
                </div>
            </div>

            <div>
                <button onClick={onClickComment}>
                    코멘트보기
                </button>
            </div>

            {/* <div>
                코멘트 비밀번호
            </div> */}

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
    );
};

export default GuestbookCard;