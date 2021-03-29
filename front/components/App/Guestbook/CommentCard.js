import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { DELETE_COMMENT_REQUEST } from '../../../reducers/guestbook';
import styled from 'styled-components';

import { getSrc } from './index';
import WindowDialog from '../../WindowDialog/index';

import { Avatar } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    padding: 3%;
    background: ${({ theme }) => theme.colors.white};
    box-sizing: border-box;

    & + div {
        margin-top: ${({ theme }) => theme.calcRem(20)};
    }

    &:after {
        content: '';
        display: block;
        clear: both;
    }
`;

const Inner = styled.div`
    position: relative;
    min-height: ${({ theme }) => theme.calcRem(70)};
`;

const AvatarWrap = styled.div`
    position: absolute;
    top: 0;
    float: left;
    display: flex;
    width: ${({ theme }) => theme.calcRem(42)};
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    float: right;
    padding-left: ${({ theme }) => theme.calcRem(15)};
    width: calc(100% - ${({ theme }) => theme.calcRem(42)});
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
    margin-top: ${({ theme }) => theme.calcRem(5)};
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
    const { avatarList, admin } = useSelector((state) => state.user);
    const [openedModal, setOpenedModal] = useState(false);
    const [reqStatus, setReqStatus] = useState('');
    const [modalText, setModalText] = useState(false);

    useEffect(() => {
        let text = ''; 

        if (admin.userId) {
            text = '관리자 권한으로 삭제합니다.';

        } else {
            text = `${(reqStatus === 'edit') ? '수정' : '삭제'} 비밀번호를 입력해주세요`;
        }

        setModalText(text);
    }, [admin, reqStatus]);

    const passwordCheck = useCallback(({state, text}) => {
        setOpenedModal(false);
        if (!state) return;

        let type = '';

        if (admin.userId) {
            type = DELETE_COMMENT_REQUEST;
            text = admin.userId;
            
        } else {
            type = (reqStatus === 'edit') 
                ? GET_PERMISSION_REQUEST 
                : DELETE_COMMENT_REQUEST;
        }

        dispatch({
            type: type,
            data: {
                id: id,
                password: text
            }
        });
    }, [admin, reqStatus, id]);

    const onClickDelete = useCallback(() => {
        setOpenedModal(true);
        setReqStatus('delete');
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
                    text={modalText}
                    callback={passwordCheck}
                />
            )}
        </Wrap>
    );
};

export default CommentCard;