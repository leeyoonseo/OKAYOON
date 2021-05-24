import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { LOAD_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';
import { Button } from 'antd';
import Form from './Form';
import Loading from '../../Loading';
import Card from './Card';
export const FORM_CREATE = 'FORM_CREATE';
export const FORM_EDIT = 'FORM_EDIT';
export const FORM_COMMENT = 'FORM_COMMENT';

const MoreWrap = styled.div`
    text-align: center;
`;

const MoreButton = styled(Button)`
    padding: ${({ theme }) => theme.calcRem(10)} ${({ theme }) => theme.calcRem(25)};
    height: auto;
    line-height: 1;
    border: 1px solid ${({ theme }) => theme.colors.black};
    background: none;
    outline: none;
    cursor: pointer;

    &:hover,
    &:focus {
        color: ${({ theme }) => theme.colors.black};
        border: 1px solid ${({ theme }) => theme.colors.black};
        background: none;
    }

    &:hover {
        opacity: 0.5;
    }
`;

export const getSrc = (list, title) => {
    const item = list.find((v) => v.title === title);
    return item ? item.src : null;
};

const Guestbook = () => {
    const dispatch = useDispatch();
    const { me, admin } = useSelector(state => state.user);
    const { guestbook, guestbookCount, loadGuestbookLoading } = useSelector((state) => state.guestbook);
    const [isFirstReq, setIsFirstReq] = useState(false);
    const [nickname, setNickname] = useState(null);
    const [avatar, setAvatar] = useState(me.avatar ? me.avatar : 'nickname');
    const MAX_TEXTAREA_LENGTH = 100;

    useEffect(() => {
        if (guestbook.length < 1) {
            dispatch({ type: LOAD_GUESTBOOK_REQUEST });
        }
    }, []);

    useEffect(() => {
        setNickname(
            admin.userId 
                ? `관리자${admin.userId.charAt().toUpperCase()}` 
                : me.nickname
        );
    }, [me, admin]);

    const renderLoading = useCallback(() => {
        if (!loadGuestbookLoading) return;
        
        return <Loading bgcolor="#777" />
    }, [loadGuestbookLoading]);

    const onClickMore = useCallback(() => {
        const lastId = guestbook[guestbook.length - 1]?.id;

        if(!isFirstReq) {
            setIsFirstReq(true);
        }

        dispatch({
            type: LOAD_GUESTBOOK_REQUEST,
            lastId
        });
    }, [guestbook]);

    return (
        <>
            <div>
                <Form 
                    formtype={FORM_CREATE}
                    MAX_TEXTAREA_LENGTH={MAX_TEXTAREA_LENGTH} 
                    nickname={nickname}
                    avatar={avatar}
                />
                
                {guestbook && guestbook.map((v, i) => {
                    const { edit, nickname } = v;

                    if (edit) {
                        return (
                            <Form 
                                formtype={FORM_EDIT}
                                MAX_TEXTAREA_LENGTH={MAX_TEXTAREA_LENGTH}
                                key={`edit_${nickname.charAt(0)}_${i}`}
                                {...v}
                            />
                        )
                    } 

                    return (
                        <Card 
                            key={`card_${nickname.charAt(0)}_${i}`}
                            authorNickname={nickname}
                            authorAvatar={avatar}
                            {...v}
                        />
                    )
                })}

                {guestbookCount > guestbook.length && (
                    <MoreWrap>
                        <MoreButton 
                            loading={loadGuestbookLoading} 
                            onClick={onClickMore}
                        >
                            More
                        </MoreButton>
                    </MoreWrap>
                )}
            </div>
                    
            {!isFirstReq && renderLoading()}
        </>
    );
};

export default Guestbook;
