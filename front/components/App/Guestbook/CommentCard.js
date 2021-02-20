import React, { useState, useCallback } from 'react';
import dayjs from 'dayjs';

import { Avatar } from 'antd';

import { getSrc } from './index';
import { useSelector } from 'react-redux';

const CommentCard = ({
    id,
    avatar,
    nickname,
    createdAt,
    content,
    GuestbookId,
}) => {
    const { avatarList } = useSelector((state) => state.user);

    return (
        <div>
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
                    <button>수정</button>
                    <button>삭제</button>
                </div>
            </div>

            <div>
                {content}
            </div>
        </div>
    );
};

export default CommentCard;