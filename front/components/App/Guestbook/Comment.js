import React from 'react';
import styled from 'styled-components';

import CommentForm from './CommentForm';
import CommentCard from './CommentCard';

const Wrap = styled.div`
    padding: ${({ theme }) => theme.calcRem(20)};
    margin: ${({ theme }) => theme.calcRem(20)};
    border-radius: ${({ theme }) => theme.calcRem(5)};
    background: ${({ theme }) => theme.colors.lightGray};
`;

const Comment = ({
    id,
    Comments,
    authorAvatar,
    authorNickname,
}) => {
    return (
        <Wrap>
            <CommentForm 
                id={id}
                avatar={authorAvatar}
                nickname={authorNickname}
            />

            {Comments && Comments.map((v, i) => {
                return (
                    <CommentCard 
                        key={`comment_${v.nickname.charAt(0)}_${i}`}
                        {...v}
                    />
                )
            })} 
        </Wrap>
    );
};

export default Comment;