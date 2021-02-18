import React, { useState, useCallback } from 'react';

const Comment = ({
    id,
    avatar,
    nickname,
    createdAt,
    GuestbookId,
}) => {
    return (
        <>
            Comment!! : {nickname}
        </>
    );
};

export default Comment;