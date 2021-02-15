import React, { useState, useCallback, useEffect, useRef, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../hooks/useInput';

import styled from 'styled-components';
import { Avatar } from 'antd';
import { LeftOutlined, ArrowUpOutlined } from '@ant-design/icons';

import WindowDialog from '../../WindowDialog/index';
import { SEND_MESSAGE_REQUEST } from '../../../reducers/simsimi';

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
    border-bottom: 1px solid #ccc;
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
    font-size: 16px;
    color: #666;
`;

const Content = styled.div`
    padding: 5%;
    height: 85%;
    box-sizing: border-box;

    div + div {
        margin-top: 10px;
    }
`;

const ChatLine = styled.div`
    text-align: ${props => props.align};
`;

const SpeechBubble = styled.div`
    padding: 5px 10px;
    display: inline-block;
    border-radius: 5px;
    background: ${props => props.bgcolor};
`;

const Footer = styled.div`
    height: 5%;
`;

const Input = styled.input`
    padding: 5px 10px;
    width: 80%;
    height: 30px;
    border: 1px solid #ddd;
    outline: none;
    box-sizing: border-box;
`;

const SendButton = styled.button`
    width: 20%;
    height: 30px;
    border: 1px solid #ddd;
    border-left: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const ChatRoom = ({ onPrevStep }) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const { me } = useSelector((state) => state.user);
    // const [chatList, setChatList] = useState();
    const [openedDialog, setOpenedDialog] = useState(false);
    const [message, onChangeMessage, setMessage] = useInput('');

    useEffect(() => {
        inputRef.current.focus();
    }, []); 

    const onCloseDialog = useCallback((res) => {
        setOpenedDialog(false);

        // [D] true면 확인, false면 취소
        // TODO: 대화내용 리셋
        if (res.state) {
            onPrevStep();
        }
    }, []);

    const onCloseRoom = useCallback(() => setOpenedDialog(true), []);

    const onSendMessage = useCallback(() => {
        console.log('message', message);
        if (!message || !message.trim()) {
            return;
        }

        // Loading중일때 처리
        dispatch({
            type: SEND_MESSAGE_REQUEST,
            data: {
                nickname: me.nickname,
                text: message
            }
        });
    }, [message]);

    const onKeyPress = useCallback((e) => {
        if (e.code === 'Enter') {
            onSendMessage();
        }
    }, [message]);

    return (
        <>   
            <Wrap>
                <Header>
                    <BackButton
                        onClick={onCloseRoom}
                    >
                        <BackIcon />
                    </BackButton>

                    {/* TODO: simsimi 이미지 다운받아서 사용할 수 없을까? */}
                    <Avatar
                        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjUsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNDQxLjA4NHB4IiBoZWlnaHQ9IjM5MS43NjNweCIgdmlld0JveD0iMCAwIDQ0MS4wODQgMzkxLjc2MyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNDQxLjA4NCAzOTEuNzYzIg0KCSB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkUzNEYiIHN0cm9rZT0iIzMyMzUzRiIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iDQoJTTQyOC41NjUsMjE5LjA5OGMtOS41NzIsMC45ODQtMTcuMjE1LTIuOTI2LTIyLjc4OS03LjY0NmMxLjMwNS04Ljc5NSwxLjk4OS0xNy43OTMsMS45ODktMjYuOTUxYzAtMTAwLjUxNi04MS40ODMtMTgyLTE4Mi0xODINCgljLTEwMC41MTYsMC0xODIsODEuNDg0LTE4MiwxODJjMCwxMS42MjIsMS4xMDMsMjIuOTg0LDMuMTg1LDM0Yy03LjA5Miw3LjIxMS0xNy44MzgsMTQuMzI4LTMxLjk3NywxMi44NzUNCgljMCwwLTE1LjMzMi0wLjA4Ny0xMiwxNS41NTJjMCwwLDEuMzkzLDExLjYzOSwxOS4wMjksMTAuOTcyYzAsMCwxNi4xNjQtMS41ODIsMzEuMjkyLTE1LjEyOA0KCWMxNi44MDgsNDkuNzY0LDU0LjU1Miw4OS44NzgsMTAyLjc0OSwxMDkuODg1Yy0xLjU2Nyw3LjY0Ni0yLjM4NCwxOS4zNTQsMi42NSwzMS43NDhjMCwwLDMuMzMsNS45OTUsMTAuNjYxLDQuNjY4DQoJYzYuNDMzLTEuMTY1LDUuODk0LTguODI5LDUuNDExLTEzLjc5NmMtMC41NDUtNS41OTUtMC4zMTItMTAuNDYxLDEuMjQyLTE1LjY2MWMxNS44MTQsNC40ODQsMzIuNTA2LDYuODg2LDQ5Ljc1Nyw2Ljg4Ng0KCWMyNi44MzcsMCw1Mi4zMTUtNS44MTIsNzUuMjUtMTYuMjRjMS40MTEsNC40OTIsMi4xMzcsOS42LDIuMTE2LDExLjA2OWMtMC4wNjgsNS4wMTEtMy4yMTUsMTUuNjQ2LDQuMjQ4LDE3LjAwMg0KCWM2LjMzMiwxLjE0OSwxMC40MzItMy44MTcsMTEuOTM0LTkuNDMzYzEuOTIyLTcuMTksMi4yNi0xNS44MTYsMC44MzMtMjMuMTMyYy0wLjA0OS0wLjI1MS0wLjYwNi0yLjU3OC0xLjIxNy00Ljg5OQ0KCWM0MC4yMjUtMjQuMDE5LDcwLjM5OS02My4xMTEsODIuNzI4LTEwOS40ODRjMTAuODgzLDcuOTkyLDIxLjI2NCw5LjAxNiwyMS4yNjQsOS4wMTZjMTQuMTY1LDAuNTM1LDE1LjI4Mi04LjgxMSwxNS4yODItOC44MTENCglDNDQwLjg4LDIxOS4wMjgsNDI4LjU2NSwyMTkuMDk4LDQyOC41NjUsMjE5LjA5OHoiLz4NCjxwYXRoIGQ9Ik0yNTYuMzc5LDM4LjYwOGMtMjAuODY2LDMuODEtNy4yNjMsMjUuOTMzLDguMTkyLDIyLjU3NGMxMC4yNjQtMi4yMzUsMTguMTUyLTExLjQxMSwxNS42NjgtMjAuOTg5DQoJYy0yLjM5OC05LjIyNi0xNi45OS0xMy42NjItMjUuOTY3LTE0LjAxNWMtMTEuNTQ4LTAuNDY3LTIzLjE1LDQuMDY4LTI3LjI5MSwxNC41ODFjLTMuNjcsOS4zMTQsMS41MDIsMTkuMDg3LDguMzc4LDI1LjcxNA0KCWM4LjczOCw4LjQyNiwyMS4zMSw5LjcyOCwzMy4yMTEsNy4zNDNjOS44ODYtMS45ODIsMjMuMDA3LTguNDgsMjQuNTItMTguNTg1YzAuNDI1LTIuODc0LTMuODgzLTMuNTkyLTQuNzgyLTAuODUNCgljLTQuMzYzLDEzLjMzOS0yNC4zOTcsMTcuMzc4LTM3LjQ1OCwxNC41NTFjLTE0Ljc3MS0zLjE5OS0yNy4yMi0yMi42NjgtMTMuMzk4LTMzLjQxNGM4LjkzNy02Ljk1LDM5LjY1My01LjM1NSwzNy41MDgsOS42NTcNCgljLTEuMjM3LDguNjk5LTEyLjU3NCwxMi4wNjctMjAuMTY3LDkuMTIyYy00LjcwMy0xLjgyOS00LjUyMy02LjgwNiwzLjI4NS05LjYwM0MyNjAuODk5LDQzLjY4MSwyNTkuNTg5LDM4LjAyNywyNTYuMzc5LDM4LjYwOA0KCUwyNTYuMzc5LDM4LjYwOHoiLz4NCjxlbGxpcHNlIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgY3g9IjE2NS4zMDEiIGN5PSIxNDkuNjgxIiByeD0iMTEuNzA0IiByeT0iMTMuNTQzIi8+DQo8ZWxsaXBzZSBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGN4PSIzNzAuMTUzIiBjeT0iMTQzLjAwMSIgcng9IjkuNzA0IiByeT0iMTEuMjI5Ii8+DQo8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ig0KCU0xNTAuMDk4LDExMy4xMzdjMCwwLDEyLjY2Ny0xNiw0MC44MzMsNiIvPg0KPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSINCglNMzYwLjQ0OSwxMTkuMTM3YzAsMCwxMS4xNjctMTMuMTE5LDE5LjQwNy01LjgwOSIvPg0KPHBhdGggZmlsbD0iI0YxOEQ4QiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTE1NC44NDIsMTkyLjU2NQ0KCWMwLDAsMTAyLjUyNiwxMS44NjksMjIxLjg2LTguMDY1YzAsMCwxMi42NjYsNjYuNzMyLTEwNCw3Ni43MzJDMjcyLjcwMiwyNjEuMjMyLDE1Mi43NTEsMjc2LjQzMSwxNTQuODQyLDE5Mi41NjV6Ii8+DQo8cGF0aCBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ig0KCU0yNzIuNzAyLDI2MS4yMzIiLz4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iDQoJTTE1NS42MywyMDUuOTYzYy0wLjYyOS00LjE1OC0wLjkwNy04LjYxNy0wLjc4OC0xMy4zOTdjMCwwLDEwMi41MjYsMTEuODY5LDIyMS44Ni04LjA2NWMwLDAsMC41NjUsMi45ODEsMC4zNTYsNy43NzkiLz4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iDQoJTTE1NC44NDMsMTkyLjU2NWMtMC4xMTksNC43ODYsMC4xNzcsOS4yMzMsMC44MDksMTMuMzk2YzI1LjMwMSw0LjI4NywxMzIuMzgsMTkuNDE4LDIyMS40MDUtMTMuNjgzDQoJYzAuMjA4LTQuNzkzLTAuMzU0LTcuNzc4LTAuMzU0LTcuNzc4QzI1Ny4zNjksMjA0LjQzNSwxNTQuODQzLDE5Mi41NjUsMTU0Ljg0MywxOTIuNTY1eiIvPg0KPHBhdGggZmlsbD0iI0ZGNjQ2NCIgc3Ryb2tlPSIjMzIzNTNGIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSINCglNMjU3LjY1NywyNjEuNmMwLDAtMi40NjEtMTMuNjc4LDYuNjYxLTE0LjY5MWMwLDAsNi41MTUtMC4xNDUsNy4wOTUsNC45MjNjLTAuMzU3LTMuMTMsMi40MjItNC43MjksNS4xMTMtNC44ODgNCgljMy4xNDYtMC4xODYsNS45MTgsMS43Myw2LjYxNCw0LjkyOGMwLjUxNSwyLjM2OSwwLjc3Miw1LjEzMiwwLjY5NSw3LjU1MkMyODMuODM2LDI1OS40MjMsMjczLjEyOSwyNjIsMjU3LjY1NywyNjEuNnoiLz4NCjwvc3ZnPg0K"
                    />
                </Header>

                <Content>

                    <ChatLine align="left">
                        <SpeechBubble bgcolor="#aaa">
                            반가워~난 심심이야~~!
                        </SpeechBubble>
                    </ChatLine>
                    
                    <ChatLine align="right">
                        <SpeechBubble bgcolor="#37a4fc">
                            안녕
                        </SpeechBubble>
                    </ChatLine>
                    
                </Content>

                <Footer>
                    <div>
                        <Input 
                            ref={inputRef}
                            value={message}
                            onChange={onChangeMessage}
                            onKeyPress={onKeyPress}
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

export default ChatRoom;