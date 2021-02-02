import React from 'react';

const Chatting = () => {
    return (
        <div>
            Chatting
        </div>
    );
};

export default Chatting;

export const CHATTING_MODAL_ID = 'MC_M_0'; // 페이지컴포넌트_모달_인덱스
export const CHATTING_MODAL_DATA = {
    id: CHATTING_MODAL_ID,
    visible: false,
    size: {
        w: '200px',
        h: '300px'
    },
    title: "채팅",
    content: Chatting,
};

// TODO:
// DB 연결