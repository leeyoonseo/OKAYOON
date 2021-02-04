import React from 'react';
import Card from './Card';

const CommentContent = ({
    nickname, 
    avatar, 
    content, 
    createDt,
}) => {
    console.log('CommentContent', nickname);

    return (
        <Card
            nickname={nickname}
            avatar={avatar}
            content={content}
            createDt={createDt}
        />
);
};

export default CommentContent;