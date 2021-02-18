import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { REMOVE_GUESTBOOK_REQUEST, EDIT_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';

import { Avatar } from 'antd';
import { UserOutlined, EllipsisOutlined, CommentOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import GuestbookForm from './GuestbookForm';
import CommentForm from './CommentForm';
import CommentContent from './CommentContent';

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
    padding: 0 0 2% 2%;
    display: inline-block;
    position: relative;
    width: calc(100% - 65px);
    vertical-align: middle;
`;

const Header = styled.div`    
    position: relative;
    text-align: left;
    line-height: 1.25;
    margin-bottom: 5px;
`;

const Nickname = styled.span`   
    display: block;
    font-weight: 700;
`;

const Date = styled.span`
    margin-top: 5px;
    display: block;
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
    position: absolute;
    top: calc(100% - 8px);
    right: -30px;
    width: 80px;
    color: #333;
    background: #ccc;
    border-radius: 5px;
    z-index: 999;
`;

const MenuInner = styled.div`
    position: relative;
    padding: 8px;

    &:before {
        display: block;
        position:absolute;
        top: -7px;
        left: calc(50% - 4px);
        content: '';
        width: 0px;
        height: 0px;
        border-top: none;
        border-bottom: 8px solid #ccc;
        border-right: 8px solid transparent;
        border-left: 8px solid  transparent;
    }
`;

const MenuItemButton = styled.button`
    padding: 0;
    width: calc(50% - 3px);
    border: none;
    background: none;
    outline: none;
    cursor: pointer;

    &:focus,
    &:hover {
        opacity: 0.5;
    }

    & + button {
        margin-left: 6px;
    }
`;

const Content = styled.div`
    text-align: left;
`;

const Footer = styled.div`
    text-align: right;
`;

const CommentButton = styled.button`
    padding: 0;
    display: inline-block;
    font-size: 16px;
    line-height: 1;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
`;

const GuestbookContent = ({
    nickname,
    avatar,
    content,
    createdAt,
    comment,
}) => {
    const dispatch = useDispatch();
    const [openedMenu, setOpenedMenu] = useState(false);
    const [openedComment, setOpenedComment] = useState(false);
    const [edited, setEdited] = useState(false);
    const menuButtonRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", onClickOutside);

        return () => {
            document.removeEventListener("click", onClickOutside);
        };
    }, []);

    const onClickOutside = useCallback(({ target }) => {
        if (menuButtonRef.current && !menuButtonRef.current.contains(target)) {
            setOpenedMenu(false);
        }
    }, []);

    const onClickMenu = useCallback(() => setOpenedMenu(!openedMenu), [openedMenu]);

    const onClickComment = useCallback(() => {
        setOpenedComment(!openedComment);
    }, [openedComment]);

    const onClickEdit = useCallback(() => {
        console.log('onClickEdit');
        setOpenedMenu(false);
        
        // TODO: 수정
        setEdited(true);
    }, []);

    const onClickDelete = useCallback(() => {
        console.log('onClickDelete');
        setOpenedMenu(false);

        // TODO: 삭제
    }, []);

    return (
        <>
            {edited && (
                <GuestbookForm 
                    content={content}
                />
            )}
            <Wrap>
                <Side>
                    <Avatar 
                        size={64} 
                        src={avatar ? avatar : null}
                        icon={<UserOutlined />} 
                    />
                </Side>

                <Container>
                    <Header>
                        <Nickname>{nickname}</Nickname>
                        <Date>{dayjs(createdAt).format('YYYY.MM.DD')}</Date>

                        <div ref={menuButtonRef}>
                            <MenuButton onClick={onClickMenu}>
                                <EllipsisOutlined />
                            </MenuButton>                        

                            {openedMenu && (
                                <MenuWrap>
                                    <MenuInner>
                                        <MenuItemButton onClick={onClickEdit}>수정</MenuItemButton>
                                        <MenuItemButton onClick={onClickDelete}>삭제</MenuItemButton>
                                    </MenuInner>
                                </MenuWrap>
                            )}
                        </div>
                    </Header>
                    
                    <Content>
                        {content}
                    </Content>
                </Container>     

                {comment && (
                    <Footer>
                        <CommentButton
                            onClick={onClickComment}
                        >
                            <CommentOutlined />
                        </CommentButton>

                        {openedComment && (
                            <>
                                <CommentForm />

                                {comment.map((v, i) => (
                                    <CommentContent 
                                        // TODO: key 수정
                                        key={i}
                                        nickname={v.nickname} 
                                        avatar={v.avatar} 
                                        content={v.content} 
                                        createdAt={v.createdAt}
                                    />
                                ))}
                            </>
                        )}
                    </Footer>       
                )}
            </Wrap>
        </>
    );
};

GuestbookContent.propTypes = {
    comment: PropTypes.arrayOf(PropTypes.shape({
        nickname: PropTypes.string,
        avatar: PropTypes.any,
        createdAt: PropTypes.string,
        content: PropTypes.string,  
    })),

}

GuestbookContent.defaultProps = {
    comment: null,
}

export default GuestbookContent;


// TODO:
// - 카드 껍데기안에 폼 넣고 뭐 넣고 하기...