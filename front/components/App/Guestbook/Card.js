import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { Avatar } from 'antd';
import { UserOutlined, EllipsisOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    position: relative;
    margin-top: 5%;
    padding: 4%;
    border-radius: 3px;
    box-sizing: border-box;
    background: #fff;
`;

const Side = styled.div`
    display: inline-block;
    width: 65px;
`;

const Container = styled.div`
    padding: 0 2% 2% 2%;
    display: inline-block;
    position: relative;
    width: calc(100% - 65px);
    vertical-align: middle;
`;

const Header = styled.div`    
    position: relative;
    margin-bottom: 5px;
`;

const Nickname = styled.span`
    font-weight: 700;
`;

const Date = styled.span`
    margin-left: 5px;
    font-size: 11px;
`;

const MenuButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0;
    cursor: pointer;
    background: none;
    border: none;
    outline: none;

    &:focus, 
    &:hover {
        opacity: 0.5;
    }
`;

const MenuWrap = styled.div`
    padding: 3% 0 1% 0;
    display: none;
    position: absolute;
    top: 100%;
    right: -30px;
    width: 80px;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    clip-path: polygon(65% 15%,100% 15%,100% 100%,0 100%,0 15%,45% 15%,55% 0%);
    z-index: 999;

    &.visible { 
        display: block;
    }

    button {
        width: 100%;
        border: none;
        background: none;
        outline: none;
        cursor: pointer;

        &:focus,
        &:hover {
            opacity: 0.5;
        }
    }

    button + button {
        margin-top: 5px;
    }
`;

const Content = styled.div``;



const Card = () => {

    // TODO: 유저가 내가 아니라 포스트 등록한 유저여야함
    const { me } = useSelector((state) => state.user);
    const [isVisibleMenu, setIsVisibleMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", onClickOutside);

        return () => {
            document.removeEventListener("click", onClickOutside);
        };
    }, []);

    const onClickOutside = useCallback(({ target }) => {
        if (menuRef.current && !menuRef.current.contains(target)) {
            setIsVisibleMenu(false);
        }
    }, []);

    const onClickButton = useCallback(() => {
        setIsVisibleMenu(!isVisibleMenu);
    }, [isVisibleMenu]);

    return (
        <Wrap>
            <Side>
                <Avatar 
                    size={64} 
                    src={me.avatar ? me.avatar : null}
                    icon={<UserOutlined />} 
                />
            </Side>

            <Container>
                <Header>
                    <Nickname>닉네임</Nickname>
                    <Date>2020.01.01 AM 3:00</Date>

                    <div ref={menuRef}>
                        <MenuButton onClick={onClickButton}>
                            <EllipsisOutlined />
                        </MenuButton>                        

                        <MenuWrap className={isVisibleMenu ? 'visible' : ''}>
                            <button>수정</button>
                            <button>삭제</button>
                        </MenuWrap>
                    </div>
                </Header>
                
                <Content>
                    컨텐츠
                </Content>
            </Container>            
        </Wrap>
    );
};

export default Card;