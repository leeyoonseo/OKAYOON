import React, { useState, useCallback, useEffect, useRef, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../../../hooks/useInput';
import { DELETE_MESSAGE, SEND_MESSAGE_REQUEST } from '../../../reducers/simsimi';

import styled, { keyframes } from 'styled-components';

import { Avatar } from 'antd';
import { LeftOutlined, ArrowUpOutlined, RetweetOutlined } from '@ant-design/icons';

import WindowDialog from '../../WindowDialog/index';
import Chat from './Chat';

const Wrap = styled.div`
    width: 100%;
    height: 100%;
`;

const Header = styled.div`
    position: relative;
    display: flex;
    height: 10%;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    box-sizing: border-box;
`;

const BackButton = styled.button`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    padding: 0;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
`;

const BackIcon = styled(LeftOutlined)`
    font-size: ${({ theme }) => theme.calcRem(16)};
    color: ${({ theme }) => theme.colors.black};
`;

const Content = styled.div`
    padding: 5%;
    height: 85%;
    overflow-y: auto;
    box-sizing: border-box;

    div + div {
        margin-top: ${({ theme }) => theme.calcRem(10)};
    }
`;

const EmptyData = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Footer = styled.div`
    height: 5%;
`;

const Input = styled.input`
    padding: ${({ theme }) => theme.calcRem(5)} ${({ theme }) => theme.calcRem(10)};
    width: 80%;
    height: ${({ theme }) => theme.calcRem(35)};
    border: 1px solid ${({ theme }) => theme.colors.gray};
    outline: none;
    box-sizing: border-box;
`;

const SendButton = styled.button`
    width: 20%;
    height: ${({ theme }) => theme.calcRem(35)};
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-left: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const loadingAni = keyframes`
    0%, 100% {
        transform: translateY(-1px);
    }
    50% {
        transform: translateY(1px);
    }
`;

const LoadingText = styled.div`
    span {
        display: inline-block;
        animation: ${loadingAni} .7s infinite;
    }

    span:nth-child(2) { animation-delay: 0.1s; }
    span:nth-child(3) { animation-delay: 0.2s; }
    span:nth-child(4) { animation-delay: 0.3s; }
    span:nth-child(5) { animation-delay: 0.4s; }
    span:nth-child(6) { animation-delay: 0.5s; }
`;

const ChatRoom = ({ onPrevStep }) => {
    const dispatch = useDispatch();
    const { chatList, sendMessageLoading, sendMessageDone } = useSelector((state) => state.simsimi);
    const [message, onChangeMessage, setMessage] = useInput('');
    const [scrollTop, setScrollTop] = useState(null);
    const [openedDialog, setOpenedDialog] = useState(false);
    const [startedChat, setStartedChat] = useState(false);
    const [myTurn, setMyTurn] = useState(true);
    const chatContRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.focus();
    }, []); 

    useEffect(() => {
        if (sendMessageLoading) {
            setMessage('');
            onScrollTop();
            setMyTurn(false);
        }
    }, [sendMessageLoading]);

    useEffect(() => {
        if (sendMessageDone) {
            setMyTurn(true);
        }
    }, [sendMessageDone]);

    const onScrollTop = useCallback(() => {
        if (!chatContRef.current) return;
        const { scrollHeight } = chatContRef.current;

        if (scrollTop === scrollHeight) return;
        
        chatContRef.current.scrollTop = scrollHeight;
        setScrollTop(scrollHeight);
    }, [scrollTop, chatContRef]);

    const onCloseDialog = useCallback(({ state }) => {
        setOpenedDialog(false);

        if (!state) return;

        onPrevStep();
        dispatch({ type: DELETE_MESSAGE });
    }, []);

    const onCloseRoom = useCallback(() => {
        if (startedChat) {
            setOpenedDialog(true);

        } else {
            onPrevStep();
        }
    }, [startedChat]);

    const onSendMessage = useCallback(() => {
        if (!message || !message.trim()) return;
        if (!startedChat) {
            setStartedChat(true);
        }

        dispatch({
            type: SEND_MESSAGE_REQUEST,
            data: {
                simsimi: false,
                text: message
            }
        });
    }, [message]);

    const onInput = useCallback(() => onScrollTop(), []);
    const onKeyPress = useCallback(({ code }) => {
        if (code === 'Enter') {
            onSendMessage();
        }
    }, [message]);

    return (
        <>   
            <Wrap>
                <Header>
                    <BackButton onClick={onCloseRoom}>
                        <BackIcon />
                    </BackButton>

                    <Avatar
                        size={48}
                        src="../../avatar/avatar_simsimi.png"
                    />
                </Header>

                <Content ref={chatContRef}>
                    {(!startedChat && !message) && (
                        <EmptyData>심심이와 대화를 시작해보세요!</EmptyData>
                    )}

                    {chatList.map(({ simsimi, text }, i) => {
                        return (
                            <Chat 
                                key={`chat_${i}`}
                                simsimi={simsimi}
                            >
                                {text}
                            </Chat>
                        )
                    })}

                    {/* [D] loading */}
                    {(message || sendMessageLoading) && (
                        <Chat simsimi={!myTurn}>
                            <LoadingText>
                                {('입력중...').split('').map((v, i) => {
                                    return (
                                        <span key={`loading_text_${v}_${i}`}>
                                            {v}
                                        </span>
                                    )
                                })}
                            </LoadingText>
                        </Chat>
                    )}
                </Content>

                <Footer>
                    <div>
                        <Input 
                            ref={inputRef}
                            value={message}
                            onChange={onChangeMessage}
                            onKeyPress={onKeyPress}
                            onInput={onInput}
                            placeholder="채팅을 시작해보세요"
                        />

                        <SendButton
                            onClick={onSendMessage}
                        >
                            <ArrowUpOutlined /> 
                            <span className="hidden">전송</span>
                        </SendButton>
                    </div>
                </Footer>
            </Wrap>

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

ChatRoom.propTypes = {
    onPrevStep: PropTypes.func.isRequired,    
};

export default ChatRoom;