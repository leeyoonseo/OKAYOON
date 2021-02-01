import React from 'react';

const InfoContent = () => {
    return (
        <div>
            사용: react, redux-saga, reducer, next, antd, styled-components, eslint, github,
            dayjs, axios, immer, 
        </div>
    );
};

export default InfoContent;

export const INFO_MODAL_ID = 'MI_M_0'; // 페이지컴포넌트_모달_인덱스
export const INFO_MODAL_DATA = {
    id: INFO_MODAL_ID,
    location: {
        x: 50,
        y: 50
    },
    visible: false,
    size: {
        w: '300px',
        h: '300px'
    },
    title: "Info",
    content: InfoContent,
    buttonDisabled : {
        Maximize: true,
        Minimization: true
    },   
};
