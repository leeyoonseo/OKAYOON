import React, { useCallback, useState } from 'react';
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
`;

const Nickname = styled.div`
    margin-top: 20px;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
`;

const AccessButton = styled.button`
    padding: 5px 10px;
    margin-top: 20px;
    width: 100%;
    color: #666;
    border: 1px solid #666;
    outline: none;
    background: none;
    cursor: pointer;
`;

const Simsimi = () => {
    const { me, avatarList } = useSelector((state) => state.user);
    const [avatar, setAvatar] = useState(me.avatar ? me.avatar : 'nickname');
    const [nickname, setNickname] = useState(me.nickname ? me.nickname : 'Guest');
    const [startChat, setStartChat] = useState(false);

    const toggleStep = useCallback(() => setStartChat(!startChat), [startChat]);
    const getSrc = useCallback(() => {
        const item = avatarList.find((v) => v.title === avatar);

        if(!item) { 
            return null;
        }
    
        return item.src;
    }, [avatar]);

    
    return (
        <>  
            {!startChat ? (
                <Wrap>
                    <Inner>
                        {avatar === 'nickname' ? (
                            <Avatar size={100}>{nickname}</Avatar>

                        ) : (
                            <Avatar 
                                size={100}
                                src={getSrc()} 
                            /> 
                        )}
                        <Nickname>
                            {me.nickname}
                        </Nickname> 

                        <AccessButton onClick={toggleStep}>
                            접속하기
                        </AccessButton>
                    </Inner>
                </Wrap> 

            ) : (
                <ChatRoom onPrevStep={toggleStep} />
            )}
        </>
    );
};

export default Simsimi;