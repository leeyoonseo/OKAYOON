import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import useInput from '../../hooks/useInput';

import { Avatar, Button, Modal } from 'antd';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';
import { LOG_IN_REQUEST } from '../../reducers/user';

import AvatarPopup from './AvatarPopup';

const UserInfoWrap = styled.div`
    display:inline-block;
    width: 300px;
    text-align: center;
`;

const AvatarButton = styled(Avatar)`
    margin-bottom: 10px;
    cursor: pointer;
    opacity: 0.8;
`;

const NicknameWrap = styled.div`
    margin-bottom: 10px;
`;

const UserIcon = styled(UserOutlined)`
    color: #fff;
    opacity: 0.8;
`;

const NicknameInputWrap = styled.div`
    padding: 6px;
    height: 36px;
    border: 1px solid #fff;
    border-radius: 3px;
    opacity: 0.8;
    box-sizing: border-box;
`;

const NicknameInput = styled.input`
    padding: 0 5px;
    margin-left: 5px;
    width: 80%;
    height: 24px;
    border: none;
    background: none;
    color: #fff;

    &:hover,
    &:focus {
        outline: none;

    }    

    &::placeholder {
        color: #fff;
    }
`;

const Nickname = styled.div`
    margin-bottom: 10px;
    color: #fff;

    height: 36px;
    padding: 6px 0;
    box-sizing: border-box;
`;

const CloseButton = styled.button`
    padding: 0;
    margin-left: 5px;
    line-height: 1;
    color: #fff;
    border: none;
    background: none;
    cursor: pointer;
    outline: none;

    &:hover,
    &:focus { 
        color: #fff;
        border: none;
    }
`;

const CloseIcon = styled(CloseOutlined)`
`;

const UserInfoButton = styled(Button)`
    color: #fff;
    background: none;

    & + button {
        margin-left: 5px;
    }

    &:hover,
    &:focus {
        color: #fff;
        background: none;
        border-color: #fff;
    }
`;

const UserInfo = () => {
    const dispatch = useDispatch();
    const { logInLoading, sampleAvatarList, userInfo } = useSelector((state) => state.user);
    const [nickname, onChangeNickname, setNickname] = useInput(userInfo?.nickname || '');
    const [avatar, setAvatar] = useState(userInfo?.avatar || null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onOpenAvatarPopup = useCallback(() => setIsModalVisible(true), []);
    const onCloseAvatarPopup = useCallback((isOk, avatarIndex = null) => () => {
        setIsModalVisible(false);

        if(isOk){
            const src = (avatarIndex === null) ? null : sampleAvatarList[avatarIndex].src;
            setAvatar(src);
        }
    }, []);

    const onKeyPressInput = useCallback((e) => {
        if(e.key === 'Enter'){
            console.log('onKeyPressInput', e.target.value);
            setNickname(e.target.value);
        }
    }, []);

    const onRemoveNickname = useCallback(() => setNickname(''), []);

    const onClickReset = useCallback(() => {
        setNickname('');
        setAvatar(null);
    }, []);
    const onClickAccess = useCallback(() => {
        const data = {};

        if(!nickname.trim()){
            setNickname('Guest');
            data.nickname = 'Guest';
        }

        if(avatar !== null){
            data.avatar = avatar;
        }

        dispatch({
            type: LOG_IN_REQUEST,
            data
        });
    }, [nickname, avatar]);

    return(
        <UserInfoWrap>
            <AvatarButton 
                size={64} 
                src={avatar ? avatar : null}
                icon={<UserOutlined />} 
                onClick={onOpenAvatarPopup}
            />

            <AvatarPopup 
                visible={isModalVisible} 
                onClosePopup={onCloseAvatarPopup} 
            />

            <NicknameWrap>
                {
                    nickname 
                    ? (
                        <Nickname className="nickname">
                            <span>{nickname}</span>
                            <CloseButton onClick={onRemoveNickname}>
                                <CloseIcon />
                            </CloseButton>
                        </Nickname>
                    ) : (

                        <NicknameInputWrap>
                            <UserIcon />

                            <NicknameInput 
                                maxLenght="10"
                                placeholder="Please enter your nickname" 
                                onKeyPress={onKeyPressInput}
                            />
                        </NicknameInputWrap>
                    )
                } 
            </NicknameWrap>
            
            <UserInfoButton onClick={onClickReset}>
                초기화
            </UserInfoButton>

            <UserInfoButton onClick={onClickAccess} loading={logInLoading}>
                접속하기
            </UserInfoButton>           
        </UserInfoWrap>
    );
};

export default UserInfo;