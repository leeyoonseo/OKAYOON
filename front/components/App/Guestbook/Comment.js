import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import CommentForm from './CommentForm';
import CommentContent from './CommentContent';

const Comment = (props) => {

    console.log('!!!', props.comment);
    useCallback(() => {
        console.log('comment props', props.comment);
    }, []);

    return (
        <>
            <CommentForm />

            {props.comment.map((v, i) => (
                <CommentContent 
                    // TODO: key 수정
                    key={i}
                    nickname={v.nickname} 
                    avatar={v.avatar} 
                    content={v.content} 
                    createDt={v.createDt}
                />
            ))}
        </>
    );
};

export default Comment;