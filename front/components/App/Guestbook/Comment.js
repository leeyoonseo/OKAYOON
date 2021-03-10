import React from 'react';
import styled from 'styled-components';
import { colors, calcRem } from '../../../theme/styles';

import CommentForm from './CommentForm';
import CommentCard from './CommentCard';

const Wrap = styled.div`
    padding: ${calcRem(20)};
    margin: ${calcRem(20)};
    border-radius: ${calcRem(5)};
    background: ${colors.lightGray};
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