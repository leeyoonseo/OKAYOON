import React from 'react';

const WelcomeContent = () => {
    return (
        <div>
            Welcome!
        </div>
    );
};

export default WelcomeContent;

export const WELCOME_MODAL_ID = 'MW_M_0'; // 페이지컴포넌트_모달_인덱스
export const WELCOME_MODAL_DATA = {
    id: WELCOME_MODAL_ID,
    visible: false,
    size: {
        w: '300px',
        h: '300px'
    },
    title: "Welcome",
    content: WelcomeContent,
    buttonDisabled : {
        Maximize: true,
    },   
};
