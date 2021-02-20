import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { DELETE_GUESTBOOK_REQUEST, GET_PERMISSION_REQUEST } from '../../../reducers/guestbook';
import { getSrc } from './index';

import WindowDialog from '../../WindowDialog/index';
import Comment from './Comment';
// import CommentForm from './CommentForm';
// import CommentCard from './CommentCard';

import { Avatar } from 'antd';
import { CommentOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    padding: 3%;
    background: #fff;
    box-sizing: border-box;

    & + div {
        margin-top: 30px;
    }

    &:after {
        content: '';
        display: block;
        clear: both;
    }
`;

const Inner = styled.div`
    position: relative;
    min-height: 100px;
`;

const AvatarWrap = styled.div`
    position: absolute;
    top: 0;
    float: left;
    display: flex;
    width: 64px;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    float: right;
    padding-left: 20px;
    width: calc(100% - 64px);
    height: 100%;
    box-sizing: border-box;
`;

const Nickname = styled.div`
    font-size: 13px;
    font-weight: 700;
`;

const CreatedDate = styled.div`
    font-size: 70%;
`;

const Menu = styled.div`
    position: absolute;
    right: 0;
    top: 0;

    button {
        padding: 5px;
        line-height: 1;
        border: 1px solid #aaa;
        outline: none;
        background: none;
        cursor: pointer;
    }

    button + button {
        border-left: none;
    }
`;

const ContentWrap = styled.div`
    margin-top: 5px;
    width: calc(100% - 30px);
    // height: 60px;
    overflow-y: auto;
`;

const CommentButton = styled.button`
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0;
    font-size: 16px;
    line-height: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const GuestbookCard = ({
    id,
    nickname,
    avatar,
    createdAt,
    content,
    Comments,
}) => {
    const dispatch = useDispatch();
    const { avatarList } = useSelector((state) => state.user);
    const [openedComment, setOpenedComment] = useState(false);
    const [openedModal, setOpenedModal] = useState(false);
    const [reqStatus, setReqStatus] = useState('');

    const passwordCheck = useCallback(({state, text}) => {
        setOpenedModal(false);

        if (!state) return;

        dispatch({
            type: (reqStatus === 'edit') ? GET_PERMISSION_REQUEST : DELETE_GUESTBOOK_REQUEST,
            data: {
                id: id,
                password: text
            }
        });
    }, [reqStatus, id]);

    const onClickEdit = useCallback(() => {
        setOpenedModal(true);
        setReqStatus('edit');
    }, []);

    const onClickDelete = useCallback(() => {
        setOpenedModal(true);
        setReqStatus('delete');
    }, []);

    const onClickComment = useCallback(() => {
        setOpenedComment(!openedComment);
    }, [openedComment]);

    return (
        <Wrap>
            <Inner>
                <AvatarWrap>
                    {avatar === 'nickname' ? (
                        <Avatar size={64}>{nickname}</Avatar>
                    ) : (
                        <Avatar size={64} src={getSrc(avatarList, avatar)} />
                    )}
                </AvatarWrap>

                <Container>
                    <Nickname>{nickname}</Nickname>
                    <CreatedDate>{dayjs(createdAt).format('YYYY.MM.DD')}</CreatedDate>

                    <Menu>
                        <button
                            onClick={onClickEdit}
                        >
                            <FormOutlined />
                        </button>
                        <button
                            onClick={onClickDelete}
                        >
                            <DeleteOutlined />
                        </button>
                    </Menu>

                    <ContentWrap>
                        {content}
                    </ContentWrap>
                </Container>

                <CommentButton onClick={onClickComment}>
                    <CommentOutlined />
                </CommentButton>
            </Inner>
            
            {openedComment && (
                <>
                    <Comment 
                        id={id}
                        // content={}
                        Comments={Comments}
                    />
                </>
            )}
            
            {openedModal && (
                <WindowDialog
                    type="prompt"
                    text="비밀번호를 입력해주세요." 
                    callback={passwordCheck}
                />
            )}
        </Wrap>
    );
};

export default GuestbookCard;