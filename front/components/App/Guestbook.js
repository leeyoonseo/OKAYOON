import React from 'react';

const Guestbook = () => {
    return (
        <div>
            Guestbook
        </div>
    );
};

export default Guestbook;

export const GUESTBOOK_MODAL_ID = 'MG_M_2'; // 페이지컴포넌트_모달_인덱스
export const GUESTBOOK_MODAL_DATA = {
    id: GUESTBOOK_MODAL_ID,
    location: ['50%', '50%'],
    visible: false,
    size: {
        w: '600px',
        h: '600px'
    },
    title: "방명록",
    content: Guestbook,
    buttonDisabled : {
        Maximize: true,
        Minimization: true
    },   
};

// TODO:
// DB 연결