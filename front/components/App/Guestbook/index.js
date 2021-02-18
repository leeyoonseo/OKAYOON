import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';

import GuestbookForm from './GuestbookForm';
import GuestbookCard from './GuestbookCard';

const index = () => {
    const dispatch = useDispatch();
    const { guestbook } = useSelector((state) => state.guestbook);

    useEffect(() => {
        console.log('guestbook index 입니다.');

        dispatch({
            type: LOAD_GUESTBOOK_REQUEST
        });
    }, []);

    return (
        <div>
            <GuestbookForm />

            {guestbook && guestbook.map((v, i) => {
                return (
                    <GuestbookCard 
                        key={`card_${v.nickname.charAt(0)}_${i}`}
                        {...v}
                    />
                )
            })}
        </div>
    );
};

export default index;