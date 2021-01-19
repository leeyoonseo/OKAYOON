import React, { useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Input, Button, Modal } from 'antd';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { LOG_IN_REQUEST } from '../../reducers/user';
import AvatarPopup from './AvatarPopup';

const NicknameWrapper = styled.div`
    margin:10px 0;

    button:hover{
        color:#333;
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
        <>
            <Avatar 
                size={64} 
                src={avatar ? avatar : null}
                icon={<UserOutlined />} 
                style={{ cursor: 'pointer' }}
                onClick={onOpenAvatarPopup}
            />
        
            <AvatarPopup 
                visible={isModalVisible} 
                onClosePopup={onCloseAvatarPopup} 
            />

            {
                nickname 
                ? (
                    <NicknameWrapper className="nickname">
                        <span>{nickname}</span>
                        <Button
                            icon={<CloseOutlined />}
                            onClick={onRemoveNickname}
                        />
                    </NicknameWrapper>
                )
                :
                (
                    <Input 
                        size="large" 
                        maxLength="10"
                        placeholder="Please enter your nickname" 
                        prefix={<UserOutlined />}
                        onPressEnter={onChangeNickname}
                    />
                )
            } 

            <Button
                onClick={onClickReset}
            >
                초기화
            </Button>

            <Button 
                onClick={onClickAccess} 
                loading={logInLoading}
            >
                접속하기
            </Button>           
        </>
    );
};

export default UserInfo;