import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';


import { UserOutlined, CloseOutlined } from '@ant-design/icons';
import {
    Wrap, AvatarButton, UserIcon, 
    NicknameArea,NicknameInputWrap, NicknameInput, Nickname,
    CloseButton, ResetButton, AccessButton, SourceText,
} from './style';

const UserInfo = ({ avatar, nickname, onChangeNickname, forwordRef, onClickModal }) => {
    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        forwordRef && forwordRef.current.focus();
    }, []);

    const onRemoveNickname = useCallback(() => {
        onChangeNickname('');
    }, []);

    return(
        <Wrap>
            <AvatarButton 
                size={64} 
                src={avatar ? avatar : null}
                icon={<UserOutlined />} 
                onClick={onClickModal()}
            />

            <NicknameArea>
                {
                    userInfo.nickname 
                    ? (
                        <Nickname className="nickname">
                            <span>{nickname}</span>

                            <CloseButton onClick={onRemoveNickname}>
                                <CloseOutlined />
                            </CloseButton>
                        </Nickname>
                    ) : (

                        <NicknameInputWrap>
                            <UserIcon />

                            <NicknameInput 
                                type="text"
                                maxLenght="10"
                                placeholder="Please your nickname" 
                                ref={forwordRef}
                                onChange={onChangeNickname}
                            />
                        </NicknameInputWrap>
                    )
                } 
            </NicknameArea>
        </Wrap>
    );
};

export default UserInfo;

// TODO
// - props 전달할때 대문자 못씀?