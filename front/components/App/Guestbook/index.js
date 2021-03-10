import React, { forwardRef, useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { LOAD_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';

import { Button } from 'antd';

import Loading from '../../Loading';
import Form from './Form';
import Card from './Card';
import EditForm from './EditForm';

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

    if(!item) { 
        return null;
    }

    return item.src;
};

const Guestbook = () => {
    const dispatch = useDispatch();
    const { me, admin } = useSelector((state) => state.user);
    const { guestbook, guestbookCount, loadGuestbookLoading, } = useSelector((state) => state.guestbook);
    const [isFirstReq, setIsFirstReq] = useState(false);
    const [nickname, setNickname] = useState(null);
    const [avatar, setAvatar] = useState(me.avatar ? me.avatar : 'nickname');
    const MAX_TEXTAREA_LENGTH = 100;

    useEffect(() => {
        // TODO: 메인에서 load되지 않도록 수정할 것
        dispatch({
            type: LOAD_GUESTBOOK_REQUEST
        });
    }, []);

    useEffect(() => {
        if (me.nickname) {
            setNickname(me.nickname);

        } else if (admin.userId){
            setNickname(`관리자${admin.userId.charAt().toUpperCase()}`);
        }
    }, [me, admin]);

    const renderLoading = useCallback(() => {
        if (!loadGuestbookLoading) return;

        return (
            <Loading bgcolor="#777" />
        );
    }, [loadGuestbookLoading]);

    const onClickMore = useCallback(() => {
        const lastId = guestbook[guestbook.length - 1].id;

        if(!isFirstReq) setIsFirstReq(true);

        dispatch({
            type: LOAD_GUESTBOOK_REQUEST,
            lastId: lastId
        })

    }, [guestbook]);

    return (
        <>
            <div>
                {/* TODO: 엔터시 동작하도록, 폼 전체들!! */}
                <Form 
                    MAX_TEXTAREA_LENGTH={MAX_TEXTAREA_LENGTH} 
                    nickname={nickname}
                    avatar={avatar}
                />
                
                {/* TODO: 새로고침때나 로그아웃-> 로그인 시에 닫혀야함, edit!! */}
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
                            authorNickname={nickname}
                            authorAvatar={avatar}
                            {...v}
                        />
                    )
                })}

                {guestbookCount > guestbook.length && (
                    <MoreWrap>
                        <MoreButton loading={loadGuestbookLoading} onClick={onClickMore}>
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
