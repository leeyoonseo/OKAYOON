import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';

import Loading from '../../Loading';
import Form from './Form';
import Card from './Card';
import EditForm from './EditForm';

const Guestbook = () => {
    const dispatch = useDispatch();
    const { guestbook, loadGuestbookLoading } = useSelector((state) => state.guestbook);

    const MAX_TEXTAREA_LENGTH = 100;

    useEffect(() => {
        dispatch({
            type: LOAD_GUESTBOOK_REQUEST
        });
    }, []);

    return (
        <>
            <div>
                <Form
                    MAX_TEXTAREA_LENGTH={MAX_TEXTAREA_LENGTH}
                />

                {guestbook && guestbook.map((v, i) => {

                    if (v.edit) {
                        return (
                            <EditForm 
                                key={`edit_${v.nickname.charAt(0)}_${i}`}
                                MAX_TEXTAREA_LENGTH={MAX_TEXTAREA_LENGTH}
                                {...v}
                            />
                        )
                    } 

                    return (
                        <Card 
                            key={`card_${v.nickname.charAt(0)}_${i}`}
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