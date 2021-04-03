import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { DELETE_GUESTBOOK_REQUEST, GET_PERMISSION_REQUEST } from '../../../reducers/guestbook';
import { getSrc } from './index';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isEmptyObj } from '../../../util/common';
import WindowDialog from '../../WindowDialog/index';
import Comment from './Comment';

import { Avatar } from 'antd';
import { MessageOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    padding: 3%;
    background: white;
    box-sizing: border-box;

    & + div {
        margin-top: ${({ theme }) => theme.calcRem(30)};
    }

    &:after {
        content: '';
        display: block;
        clear: both;
    }
`;

const Inner = styled.div`
    position: relative;
    min-height: ${({ theme }) => theme.calcRem(100)};
`;

const AvatarWrap = styled.div`
    position: absolute;
    top: 0;
    float: left;
    display: flex;
    width: ${({ theme }) => theme.calcRem(64)};
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    float: right;
    padding-left: ${({ theme }) => theme.calcRem(20)};
    width: calc(100% - ${({ theme }) => theme.calcRem(64)});
    height: 100%;
    box-sizing: border-box;
`;

const Nickname = styled.div`
    font-weight: 700;
`;

const CreatedDate = styled.div`
    font-size: 80%;
    line-height: 1;
`;

const ContentWrap = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(5)};
    width: 100%;
    overflow-y: auto;
`;

const MenuArea = styled.div`
    width: 100%;
    text-align: right;
    clear: both;

    button {
        padding: 0;
        line-height: 1;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
    }

    button + button {
        margin-left: ${({ theme }) => theme.calcRem(10)};
    }
`;

const GuestbookCard = ({
    id,
    nickname,
    avatar,
    createdAt,
    content,
    Comments,
    authorNickname,
    authorAvatar,
}) => {
    const dispatch = useDispatch();
    const { avatarList, admin } = useSelector((state) => state.user);
    const [openedComment, setOpenedComment] = useState(false);
    const [openedModal, setOpenedModal] = useState(false);
    const [modalText, setModalText] = useState(false);
    const [reqStatus, setReqStatus] = useState('');
    const MENU_COMMENT = 'comment';
    const MENU_EDIT = 'edit';
    const MENU_DELETE = 'delete';

    useEffect(() => {
        const text = admin.userId 
            ? '관리자 권한으로 삭제합니다.' 
            : `${(reqStatus === 'edit') ? '수정' : '삭제'} 비밀번호를 입력해주세요`;

        setModalText(text);
    }, [admin, reqStatus]);

    const dialogCallback = useCallback(({ value }) => {
        if (!value) return;
        passwordCheck(value);
    }, [admin, reqStatus, id]);

    const passwordCheck = useCallback((value) => {
        if (!value) return;
        
        let typeStr = (reqStatus === 'edit') ? GET_PERMISSION_REQUEST : DELETE_GUESTBOOK_REQUEST;
        let val = value;

        if(!isEmptyObj(admin)) {
            typeStr = DELETE_GUESTBOOK_REQUEST;
            val = admin.userId;
        }

        dispatch({
            type: typeStr,
            data: {
                id: id,
                password: val,
            }
        });
    }, [admin, reqStatus, id]);

    const onClickMenu = useCallback((type) => () => {
        if (type === MENU_EDIT && !isEmptyObj(admin)) return;
        if (type === MENU_COMMENT) {
            setOpenedComment(!openedComment);
            return;
        } 
        
        setOpenedModal(true);
        setReqStatus(type);
    }, [admin, openedComment]);

    return (
        <Wrap>
            <Inner>
                <AvatarWrap>
                    {avatar === 'nickname' ? (
                        <Avatar size={64}>
                            {nickname}
                        </Avatar>
                    ) : (
                        <Avatar 
                            size={64} 
                            src={getSrc(avatarList, avatar)} 
                        />
                    )}
                </AvatarWrap>

                <Container>
                    <Nickname>{nickname}</Nickname>
                    <CreatedDate>
                        {dayjs(createdAt).format('YYYY.MM.DD | a hh:mm')}
                    </CreatedDate>

                    <ContentWrap>
                        {content}
                    </ContentWrap>
                </Container>

                <MenuArea>
                    <button
                        onClick={onClickMenu(MENU_EDIT)}
                    >
                        <FormOutlined />
                        <span className="hidden">수정</span>
                    </button>

                    <button 
                        onClick={onClickMenu(MENU_DELETE)}
                    >
                        <DeleteOutlined />
                        <span className="hidden">삭제</span>
                    </button>

                    <button 
                        onClick={onClickMenu(MENU_COMMENT)}
                    >
                        <MessageOutlined />
                        <span className="hidden">댓글</span>
                    </button>

                </MenuArea>
            </Inner>
            
            {openedComment && (
                <Comment 
                    id={id}
                    Comments={Comments}
                    authorNickname={authorNickname}
                    authorAvatar={authorAvatar}
                />
            )}
            
            {openedModal && (
                <WindowDialog
                    type="prompt"
                    text={modalText}  
                    setOpened={setOpenedModal}
                    callback={dialogCallback}
                />
            )}
        </Wrap>
    );
};

GuestbookCard.propTypes = {
    id: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    Comments: PropTypes.array,
    authorNickname: PropTypes.string.isRequired,
    authorAvatar: PropTypes.string.isRequired,
};

export default GuestbookCard;