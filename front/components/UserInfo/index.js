import React, { useCallback, useEffect, useState } from 'react';

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
    const { logInLoading, userInfo } = useSelector((state) => state.user);
    const [nickname, onChangeNickname, setNickname] = useInput(userInfo?.nickname || '');
    const [avatarImgSrc, onChangeAvatarImgSrc, setAvatarImgSrc] = useInput(userInfo?.avatarImgSrc || null);

    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        // setNickname('a');
        // setAvatarImgSrc('https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDEyMjRfNzMg%2FMDAxNjA4ODAzMzc4Mzcy.vZ5GlzHy_7o9AC578mihp-bM3lKjVGK8NJb1Lx0DPSkg.FQUiTGbFXhfLE5p-fiJXjv4iKeYAMb4Zn42mPIusik8g.JPEG.rlafksdud1%2FIMG_0028.JPG&type=sc960_832');
    }, []);

    const onClickAvatar = useCallback(() => setIsModalVisible(true), []);
    const onCloseAvatarPopup = useCallback((changeAvatar) => () => {
        setIsModalVisible(false);
        
        if(changeAvatar){
            console.log('확인 클릭');
        }
    }, []);

    const onRemoveNickname = useCallback(() => {
        setNickname('');
    }, []);

    const onPressEnterInput = useCallback(({target}) => {
        setNickname(target.value);
    }, []);

    const onClickReset = useCallback(() => {
        
    }, []);

    const onClickAccess = useCallback(() => {
        console.log('onClickAccess', logInLoading);

        const data = {
            nickname, 
            avatarImageSrc
        }

        dispatch({
            type: LOG_IN_REQUEST,
            data
        });
    }, []);

    return(
        <>
            <Avatar 
                size={64} 
                src={avatarImgSrc ? avatarImgSrc : null}
                icon={<UserOutlined />} 
                style={{ cursor: 'pointer' }}
                onClick={onClickAvatar}
            />
        
            <AvatarPopup visible={isModalVisible} onClosePopup={onCloseAvatarPopup} />

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
                        placeholder="Please your nickname" 
                        prefix={<UserOutlined />}
                        onPressEnter={onPressEnterInput}
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