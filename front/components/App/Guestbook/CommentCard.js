import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { DELETE_COMMENT_REQUEST } from '../../../reducers/guestbook';
import styled from 'styled-components';
import { colors, calcRem } from '../../../theme/styles';

import { getSrc } from './index';
import WindowDialog from '../../WindowDialog/index';

import { Avatar } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    padding: 3%;
    background: ${colors.white};
    box-sizing: border-box;

    & + div {
        margin-top: ${calcRem(20)};
    }

    &:after {
        content: '';
        display: block;
        clear: both;
    }
`;

const Inner = styled.div`
    position: relative;
    min-height: ${calcRem(70)};
`;

const AvatarWrap = styled.div`
    position: absolute;
    top: 0;
    float: left;
    display: flex;
    width: ${calcRem(42)};
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    float: right;
    padding-left: ${calcRem(15)};
    width: calc(100% - ${calcRem(42)});
    height: 100%;
    box-sizing: border-box;
`;

const Nickname = styled.span`
    display: block;
    font-size: 90%;
    font-weight: 700;
`;

const CreatedDate = styled.span`
    display: block;
    font-size: 80%;
    line-height: 1;
`;

const ContentWrap = styled.div`
    margin-top: ${calcRem(5)};
    width: 100%;
    line-heioght: 1.25;
    overflow-y: auto;
`;

const MenuArea = styled.div`
    text-align: right;
    line-height: 1;
    clear: both;

    button {
        padding: 0;
        line-height: 1;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
    }
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

                    <ContentWrap>
                        {content}
                    </ContentWrap>
                </Container>

                <MenuArea>
                    <button onClick={onClickDelete}>
                        <DeleteOutlined />
                        <span className="hidden">삭제</span>
                    </button>
                </MenuArea>
            </Inner>

            {openedModal && (
                <WindowDialog
                    type="prompt"
                    text="삭제 비밀번호를 입력해주세요." 
                    callback={passwordCheck}
                />
            )}
        </Wrap>
    );
};

export default CommentCard;