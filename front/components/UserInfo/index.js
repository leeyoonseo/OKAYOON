import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';

import styled, { css } from 'styled-components';
import { Avatar, Button, Modal } from 'antd';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';

import {
    UserInfoWrap, AvatarButton, UserIcon, 
    NicknameWrap,NicknameInputWrap, NicknameInput, Nickname,
    NicknameCloseButton, CloseIcon, ResetButton, AccessButton, SourceText,
} from './style';

import { LOG_IN_REQUEST } from '../../reducers/user';

import ModalPopup from '../ModalPopup/index';
import ModalContentAvatar from './ModalContentAvatar';

const UserInfo = () => {
    const dispatch = useDispatch();
    const { logInLoading, userInfo } = useSelector((state) => state.user);
    const [nickname, onChangeNickname, setNickname] = useInput(userInfo?.nickname || '');
    const [avatar, setAvatar] = useState(userInfo?.avatar || null);
    const [isVisible, setIsVisible] = useState(false);
    const inputEl = useRef(null);

    useEffect(() => {
        inputEl && inputEl.current.focus();
    }, []);

    const onClickAvatar = useCallback(() => setIsVisible(true), []);

    const onCloseModal = useCallback((isOk, avatarSrc = null) => () => {
        setIsVisible(false);

        if(isOk){
            const src = (avatarSrc === null) ? null : avatarSrc;
            setAvatar(avatarSrc);
        }
    }, []);

    const onKeyPressInput = useCallback(({ key, target }) => {
        if(key === 'Enter'){
            setNickname(target.value);
        }
    }, []);

    const onRemoveNickname = useCallback(() => setNickname(''), []);

    const onClickReset = useCallback(() => {
        setNickname('');
        setAvatar(null);
    }, []);

    const onClickAccess = useCallback(() => {
        const data = {};
        const inputVal = inputEl ? inputEl.current.value : null;

        if(!nickname.trim() && !inputVal.trim()){
            setNickname('Guest');
            data.nickname = 'Guest';
        }

        if(inputVal){
            setNickname(inputVal);
            data.nickname = inputVal;
        }

        if(avatar !== null){
            data.avatar = avatar;
        }

        dispatch({
            type: LOG_IN_REQUEST,
            data
        });
    }, [nickname, avatar]);

    const test = {}

    return(
        <UserInfoWrap>
            <AvatarButton 
                size={64} 
                src={avatar ? avatar : null}
                icon={<UserOutlined />} 
                onClick={onClickAvatar}
            />

            <ModalPopup 
                button_disabled={{
                    Maximize: true,
                    Minimization: true
                }}
                visible={isVisible} 
                modal_width="500px"
                modal_height="500px"
                title="아바타 설정"
                onClose={onCloseModal} 
            >
                <ModalContentAvatar onCloseModal={onCloseModal} />
                <SourceText>
                    이미지출처: https://www.pngwing.com/ko/free-png-zvldq/download
                </SourceText>
            </ModalPopup>

            <NicknameWrap>
                {
                    nickname 
                    ? (
                        <Nickname className="nickname">
                            <span>{nickname}</span>

                            <NicknameCloseButton onClick={onRemoveNickname}>
                                <CloseIcon />
                            </NicknameCloseButton>
                        </Nickname>
                    ) : (

                        <NicknameInputWrap>
                            <UserIcon />

                            <NicknameInput 
                                type="text"
                                maxLenght="10"
                                placeholder="Please enter your nickname" 
                                ref={inputEl}
                                onKeyPress={onKeyPressInput}
                            />
                        </NicknameInputWrap>
                    )
                } 
            </NicknameWrap>
            
            <ResetButton onClick={onClickReset}>
                초기화
            </ResetButton>

            <AccessButton 
                loading={logInLoading} 
                onClick={onClickAccess} 
            >
                접속하기
            </AccessButton>           
        </UserInfoWrap>
    );
};

export default UserInfo;

// TODO
// - props 전달할때 대문자 못씀?