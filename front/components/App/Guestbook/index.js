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

// TODO:
// DB 연결