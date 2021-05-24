import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Form from './Form';
import Card from './Card';
import { FORM_COMMENT } from './index';

const Wrap = styled.div`
    padding: ${({ theme }) => theme.calcRem(20)};
    margin: ${({ theme }) => theme.calcRem(20)};
    border-radius: ${({ theme }) => theme.calcRem(5)};
    background: ${({ theme }) => theme.colors.lightGray};
`;

const Comment = ({ id, Comments, authorAvatar, authorNickname }) => {
    return (
        <Wrap>
            <Form
                formtype={FORM_COMMENT}
                MAX_TEXTAREA_LENGTH={50}
                id={id}
                avatar={authorAvatar}
                nickname={authorNickname}
            />

            {Comments && Comments.map((v, i) => (
                <Card 
                    key={`comment_${v.nickname.charAt(0)}_${i}`}
                    {...v}
                />
            ))} 
        </Wrap>
    );
};

Comment.propTypes = {
    id: PropTypes.number.isRequired,
    Comments: PropTypes.array,
    authorAvatar: PropTypes.string.isRequired,
    authorNickname: PropTypes.string.isRequired,
};

export default Comment;