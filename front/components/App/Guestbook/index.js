import React from 'react';
import GuestForm from './GuestForm';
import Card from './Card';

const Guestbook = () => {
    return (
        <div>
            <GuestForm />
            <Card />
        </div>
    );
};

export default Guestbook;

export const GUESTBOOK_MODAL_ID = 'MG_M_2'; // 페이지컴포넌트_모달_인덱스
export const GUESTBOOK_MODAL_DATA = {
    id: GUESTBOOK_MODAL_ID,
    visible: false,
    size: {
        w: '600px',
        h: '600px'
    },
    title: "방명록",
    content: Guestbook,
};

// TODO:
// DB 연결