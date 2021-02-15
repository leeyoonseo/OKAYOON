import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';


import { Avatar } from 'antd';

import WindowDialog from '../../WindowDialog/index';
import ChatRoom from './ChatRoom';

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

    const onOpenRoom = useCallback(() => {
        setStartedChat(true);
    }, []);

    const onCloseRoom = useCallback(() => {
        setOpenedDialog(true);
    }, []);
    
    return (
        <>
            {!startedChat && (
                <div>
                    <div>
                        <Avatar src={me.avatar} />    
                    </div>
                    <div>{me.nickname}</div> 

                    <div>
                        <button
                            onClick={onOpenRoom}
                        >
                            접속하기
                        </button>
                    </div>
                </div>
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
                    text="대화내용이 지워집니다.\n진행하시겠습니까?"
                    callback={onCloseDialog}
                />
            )}
        </>
    );
};

export default Simsimi;