import React from 'react';

const Blog = () => {
    return (
        <div>
            Blog
        </div>
    );
};

export default Blog;

export const BLOG_MODAL_ID = 'MB_M_0'; // 페이지컴포넌트_모달_인덱스
export const BLOG_MODAL_DATA = {
    id: BLOG_MODAL_ID,
    location: {
        x: '50%',
        y: '50%'
    },
    visible: false,
    size: {
        w: '200px',
        h: '300px'
    },
    title: "블로그",
    content: Blog,
    buttonDisabled : {
        Maximize: true,
        Minimization: true
    },   
};

// TODO:
// DB 연결