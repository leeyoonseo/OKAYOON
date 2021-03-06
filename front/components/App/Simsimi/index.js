import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Avatar } from 'antd';
import ChatRoom from './ChatRoom';

const Wrap = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const Inner = styled.div`
    display: inline-block;
    text-align: center;
`;

const Nickname = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(20)};
    font-weight: 700;
    text-align: center;
`;

const AccessButton = styled.button`
    padding: ${({ theme }) => theme.calcRem(7)} ${({ theme }) => theme.calcRem(20)};
    margin-top: ${({ theme }) => theme.calcRem(20)};
    width: 100%;
    font-size: ${({ theme }) => theme.calcRem(16)};
    color: ${({ theme }) => theme.colors.black};
    border: 1px solid ${({ theme }) => theme.colors.black};
    outline: none;
    background: none;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

const Simsimi = () => {
    const { me, admin, avatarList } = useSelector((state) => state.user);
    const [avatar, setAvatar] = useState(me.avatar ? me.avatar : null);
    const [nickname, setNickname] = useState(me.nickname ? me.nickname : null);
    const [start, setStart] = useState(false);
    const NICKNAME = 'nickname';

    useEffect(() => {
        if (admin.userId) {
            setAvatar(NICKNAME);
            setNickname(`관리자${admin.userId.charAt().toUpperCase()}`);
        }
    }, [admin]);

    const moveStep = useCallback(() => setStart(!start), [start]);
    const getSrc = useCallback(() => {
        const item = avatarList.find(({ title }) => title === avatar);
        return item ? item.src : null;
    }, [avatar]);

    return (
        <>  
            {start ? (
                <ChatRoom onPrevStep={moveStep} />

            ) : (
                <Wrap>
                    <Inner>
                        {avatar === NICKNAME ? (
                            <Avatar size={100}>
                                {nickname}
                            </Avatar>

                        ) : (
                            <Avatar 
                                size={100}
                                src={getSrc()} 
                            /> 
                        )}
                        <Nickname>
                            {me.nickname}
                        </Nickname> 

                        <AccessButton onClick={moveStep}>
                            심심이랑 놀기
                        </AccessButton>
                    </Inner>
                </Wrap> 
            )}
        </>
    );
};

export default Simsimi;