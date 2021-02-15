import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { Avatar } from 'antd';

import WindowDialog from '../../WindowDialog/index';
// import ChatRoom from './ChatRoom';

const InitWrap = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const InitInner = styled.div`
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
    const [startedChat, setStartedChat] = useState(false);
    const [openedDialog, setOpenedDialog] = useState(false);

    const onCloseDialog = useCallback((res) => {
        // [D] true면 확인, false면 취소
        console.log(res);
        setOpenedDialog(false);
        setStartedChat(!res.state);

        // TODO: 대화내용 리셋
        if (res.state) {}
    }, []);

    const onOpenRoom = useCallback(() => setStartedChat(true), []);
    const onCloseRoom = useCallback(() => setOpenedDialog(true), []);
    
    return (
        <>
            {!startedChat && (
                <InitWrap>
                    <InitInner>
                        <Avatar 
                            size={100}
                            src={me.avatar} 
                        />    
                        <Nickname>
                            123{me.nickname}
                        </Nickname> 

                        <AccessButton
                            onClick={onOpenRoom}
                        >
                            접속하기
                        </AccessButton>
                    </InitInner>
                </InitWrap>
            )}

            {startedChat && (
                <div>
                    <button
                        onClick={onCloseRoom}
                    >
                        뒤로
                    </button>

                    <div>
                        대화창
                    </div>

                    <div>
                        <input 
                            placeholder="글을 입력하세요."
                        />

                        <button>전송</button>
                    </div>
                </div>
            )}

            {openedDialog && (
                <WindowDialog 
                    type="confirm"
                    text="대화내용이 지워집니다. <br> 진행하시겠습니까?"
                    callback={onCloseDialog}
                />
            )}
        </>
    );
};

export default Simsimi;