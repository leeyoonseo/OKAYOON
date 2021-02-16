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
    const { me } = useSelector((state) => state.user);
    const [openedChatRoom, setOpenedChatRoom] = useState(false);

    const toggleStep = useCallback(() => setOpenedChatRoom(!openedChatRoom), [openedChatRoom]);

    return (
        <>  
            {!openedChatRoom && (
                <Wrap>
                    <Inner>
                        <Avatar 
                            size={100}
                            src={me.avatar} 
                        />    
                        <Nickname>
                            {me.nickname}
                        </Nickname> 

                        <AccessButton onClick={toggleStep}>
                            접속하기
                        </AccessButton>
                    </Inner>
                </Wrap>
            )}

            {openedChatRoom && (
                <ChatRoom 
                    onPrevStep={toggleStep}
                />
            )}
        </>
    );
};

export default Simsimi;