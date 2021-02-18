import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';

import GuestbookForm from './GuestbookForm';
import GuestbookContent from './GuestbookContent';
import Loading from '../../Loading';

const Guestbook = () => {
    const dispatch = useDispatch();
    const { guestbook, loadGuestbookLoading } = useSelector((state) => state.guestbook);

    useEffect(() => {
        dispatch({ type: LOAD_GUESTBOOK_REQUEST });
    }, []);

    return (
        <>
            <div>
                <GuestbookForm />

                {guestbook.map((v, i) => {
                    return(
                        <GuestbookContent 
                            key={`${v.nickname.charAt(0)}_${v.createdAt}_${i}`} 
                            {...v} 
                        />
                    )
                })}
            </div>

            { loadGuestbookLoading && <Loading bgcolor="#777" />}
        </>
    );
};

export default Guestbook;

// TODO:
// DB 연결
// - 방명록 리스트 데이터로드 스크롤링방식으로 변경하자!!, 10개씩?