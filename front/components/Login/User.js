import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';

import {
    InfoArea, AvatarButton, NicknameWrap, InputWrap, 
    Input, UserIcon, Nickname, RemoveButton, 
    InfoButtonArea, InfoButton, 
} from './style';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';

import { AVATAR_MODAL_ID } from '../ModalPopup/data';
import { LOG_IN_REQUEST } from '../../reducers/user';
import { ALL_CLOSED_MODAL } from '../../reducers/site';

const User = ({
    onClickModal,
    avatar, 
    setAvatar
}) => {
    const dispatch = useDispatch();
    const { me, logInLoading, avatarList } = useSelector((state) => state.user);
    const [nickname, onChangeNickname, setNickname] = useInput(me?.nickname ? me.nickname : 'Guest');
    const [haveNickname, setHaveNickname] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current && inputRef.current.focus();
    }, []);

    const getAvatarSrc = useCallback(() => {
        const item = avatarList.find((v) => v.title === avatar);

        if (item) {
            return item.src;
        }

        return null;
    }, [avatar]);

    const onClickReset = useCallback(() => {
        setNickname('');
        setAvatar(null);
        setHaveNickname(false);
    }, []);

    const onSubmit = useCallback(() => {
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                avatar: avatar,
                nickname: nickname
            }
        });

        dispatch({ type: ALL_CLOSED_MODAL });
    }, [nickname, avatar]);

    const onRemoveNickname = useCallback(() => {
        setNickname('');
        setHaveNickname(false);
    }, []);

    const onKeyPressInput = useCallback(({ code }) => {
        if (code === 'Enter') {
            setNickname(nickname);
            setHaveNickname(true);
            onSubmit();
        }
    }, [nickname]); 

    return (
        <>
            <InfoArea>
                {avatar === 'nickname' ? (
                    <AvatarButton 
                        size={64} 
                        onClick={onClickModal(AVATAR_MODAL_ID)}
                    >
                        {nickname.substr(0, 5)}
                    </AvatarButton>
                ) : (
                    <AvatarButton 
                        size={64} 
                        src={getAvatarSrc()}
                        icon={<UserOutlined />} 
                        onClick={onClickModal(AVATAR_MODAL_ID)}
                    />
                )}

                <NicknameWrap>
                    {
                        haveNickname
                        ? (
                            <Nickname className="nickname">
                                <span>{nickname}</span>

                                <RemoveButton onClick={onRemoveNickname}>
                                    <CloseOutlined />
                                </RemoveButton>
                            </Nickname>
                        ) : (
                            <InputWrap>
                                <UserIcon />

                                <Input 
                                    type="text"
                                    maxLength="20"
                                    placeholder="Please your nickname" 
                                    ref={inputRef}
                                    value={nickname}
                                    onChange={onChangeNickname}
                                    onKeyPress={onKeyPressInput}
                                />
                            </InputWrap>
                        )
                    } 
                </NicknameWrap>
            </InfoArea>

            <InfoButtonArea>
                <InfoButton onClick={onClickReset}>초기화</InfoButton>
                
                <InfoButton 
                    loading={logInLoading}
                    onClick={onSubmit} 
                >
                    접속
                </InfoButton>
            </InfoButtonArea>
        </>
    );
};

export default User;