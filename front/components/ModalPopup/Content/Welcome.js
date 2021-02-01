import React from 'react';

const ModalWelcomeContent = () => {
    return (
        <div>
            Welcome!
        </div>
    );
};

export default ModalWelcomeContent;

export const WELCOME_MODAL_ID = 'MW_M_0'; // 페이지컴포넌트_모달_인덱스
export const WELCOME_MODAL_DATA = {
    id: WELCOME_MODAL_ID,
    // location: ['50%', '50%', 1],
    visible: false,
    size: {
        w: '300px',
        h: '300px'
    },
    title: "Welcome",
    content: ModalWelcomeContent,
    buttonDisabled : {
        Maximize: true,
        Minimization: true
    },   
};
