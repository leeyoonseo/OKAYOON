import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { DELETE_COMMENT_REQUEST } from '../../../reducers/guestbook';

import { getSrc } from './index';
import WindowDialog from '../../WindowDialog/index';

import { Avatar } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    padding: 2%;
    background: #fff;
    box-sizing: border-box;

    & + div {
        margin-top: 15px;
    }

    &:after {
        content: '';
        display: block;
        clear: both;
    }
`;

const Inner = styled.div`
    position: relative;
    min-height: 70px;
`;

const AvatarWrap = styled.div`
    position: absolute;
    top: 0;
    float: left;
    display: flex;
    width: 42px;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    float: right;
    padding-left: 10px;
    width: calc(100% - 42px);
    height: 100%;
    box-sizing: border-box;
`;

const Nickname = styled.span`
    display: block;
    font-size: 13px;
    font-weight: 700;
`;

const CreatedDate = styled.span`
    display: block;
    font-size: 70%;
`;

const Menu = styled.div`
    position: absolute;
    right: 0;
    top: 0;

    button {
        padding: 0;
        line-height: 1;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
    }
`;

const ContentWrap = styled.div`
    margin-top: 5px;
    width: calc(100% - 30px);
    overflow-y: auto;
`;

const CommentCard = ({
    id,
    avatar,
    nickname,
    createdAt,
    content,
}) => {
    const dispatch = useDispatch();
    const { avatarList } = useSelector((state) => state.user);
    const [openedModal, setOpenedModal] = useState(false);
    const [reqStatus, setReqStatus] = useState('');

    const passwordCheck = useCallback(({state, text}) => {
        setOpenedModal(false);

        if (!state) return;

        dispatch({
            type: DELETE_COMMENT_REQUEST,
            data: {
                id: id,
                password: text
            }
        });
    }, [reqStatus, id]);

    const onClickDelete = useCallback(() => {
        setOpenedModal(true);
        setReqStatus();
    }, []);

    return (
        <Wrap>
            <Inner>
                <AvatarWrap>
                    {avatar === 'nickname' ? (
                        <Avatar size={42}>{nickname}</Avatar>
                    ) : (
                        <Avatar size={42} src={getSrc(avatarList, avatar)} />
                    )}
                </AvatarWrap>
                <Container>
                    <Nickname>{nickname}</Nickname>
                    <CreatedDate>{dayjs(createdAt).format('YYYY.MM.DD')}</CreatedDate>

                    <Menu>
                        <button onClick={onClickDelete}>
                            <DeleteOutlined />
                            <span className="hidden">삭제</span>
                        </button>
                    </Menu>

                    <ContentWrap>
                        {content}
                    </ContentWrap>
                </Container>
            </Inner>

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

export default CommentCard;