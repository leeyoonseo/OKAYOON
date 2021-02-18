import React, { useState, useCallback } from 'react';

import { Avatar } from 'antd';

const Comment = ({
    id,
    avatar,
    nickname,
    createdAt,
    content,
    GuestbookId,
}) => {
    return (
        <div>
            <div>
                <Avatar />
            </div>
            <div>
                <span>{nickname}</span>
                <span>{createdAt}</span>

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

export default Comment;