import React, { useEffect } from 'react';
import Form from './Form';
import Card from './Card';
import { useSelector } from 'react-redux';

const Guestbook = () => {
    const { guestbook } = useSelector((state) => state.guestbook);

    return (
        <div>
            <Form />
            {guestbook.map((v, i) => {
                return(
                    // TODO: Key 수정하기
                    <Card key={i} {...v} />
                )
            })}
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