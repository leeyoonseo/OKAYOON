import React from 'react';

const Delete = () => {
    return (
        <div>
            Delete
        </div>
    );
};

export default Delete;

export const DELETE_MODAL_ID = 'MD_M_0'; // 페이지컴포넌트_모달_인덱스
export const DELETE_MODAL_DATA = {
    id: DELETE_MODAL_ID,
    location: ['50%', '50%'],
    visible: false,
    size: {
        w: '200px',
        h: '300px'
    },
    title: "휴지통",
    content: Delete,
    buttonDisabled : {
        Maximize: true,
        Minimization: true
    },   
};

// TODO:
// DB 연결