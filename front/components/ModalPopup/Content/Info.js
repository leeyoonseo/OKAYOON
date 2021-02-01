import React from 'react';

const ModalInfoContent = () => {
    return (
        <div>
            사용: react, redux-saga, reducer, next, antd, styled-components, eslint, github,
            dayjs, axios, immer, 
        </div>
    );
};

export default ModalInfoContent;

export const INFO_MODAL_ID = 'MI_M_0'; // 페이지컴포넌트_모달_인덱스
export const INFO_MODAL_DATA = {
    id: INFO_MODAL_ID,
    // location: ['50%', '50%', 1],
    visible: false,
    size: {
        w: '300px',
        h: '300px'
    },
    title: "Info",
    content: ModalInfoContent,
    buttonDisabled : {
        Maximize: true,
        Minimization: true
    },   
};
