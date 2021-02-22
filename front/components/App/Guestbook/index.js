import React, { forwardRef, useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { LOAD_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';

import { DownCircleOutlined } from '@ant-design/icons';

import Loading from '../../Loading';
import Form from './Form';
import Card from './Card';
import EditForm from './EditForm';

const MoreWrap = styled.div`
    margin-top:15px !important;
    text-align: center;
`;

const MoreButton = styled.button`
    padding: 5px 15px;
    line-height: 1;
    border: 1px solid #666;
    background: #fff;
    outline: none;
    cursor: pointer;

    &:hover {
        background: #eee;
    }
`;

const MoreIcon = styled(DownCircleOutlined)`
    color: #666;
    vertical-align: middle;
`;

export const getSrc = (list, title) => {
    const item = list.find((v) => v.title === title);

    if(!item) { 
        return null;
    }

    return item.src;
};

const Guestbook = () => {
    const dispatch = useDispatch();
    const { guestbook, guestbookCount, loadGuestbookLoading, } = useSelector((state) => state.guestbook);
    const MAX_TEXTAREA_LENGTH = 100;

    useEffect(() => {
        dispatch({
            type: LOAD_GUESTBOOK_REQUEST
        });
    }, []);

    const onClickMore = useCallback(() => {
        const lastId = guestbook[guestbook.length - 1].id;

        console.log('lastId', lastId);

        dispatch({
            type: LOAD_GUESTBOOK_REQUEST,
            lastId: lastId
        })

    }, [guestbook]);

    return (
        <>
            <div>
                <Form MAX_TEXTAREA_LENGTH={MAX_TEXTAREA_LENGTH} />

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

                {guestbookCount > guestbook.length && (
                    <MoreWrap>
                        <MoreButton onClick={onClickMore}>
                            More <MoreIcon />
                        </MoreButton>
                    </MoreWrap>
                )}
            </div>

            { loadGuestbookLoading && <Loading bgcolor="#777" />}
        </>
    );
};

export default Guestbook;