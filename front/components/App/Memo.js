import React from 'react';

const Memo = () => {
    return (
        <div>
            Memo
        </div>
    );
};

export default Memo;

export const MEMO_MODAL_ID = 'MM_M_0'; // 페이지컴포넌트_모달_인덱스
export const MEMO_MODAL_DATA = {
    id: MEMO_MODAL_ID,
    location: {
        x: '50%',
        y: '50%'
    },
    visible: false,
    size: {
        w: '200px',
        h: '300px'
    },
    title: "메모",
    content: Memo,
    buttonDisabled : {
        Maximize: true,
        Minimization: true
    },   
};

// TODO:
// DB 연결