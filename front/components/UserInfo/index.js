import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';

import styled, { css } from 'styled-components';
import { Avatar, Button, Modal } from 'antd';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';
import { LOG_IN_REQUEST } from '../../reducers/user';

import ModalPopup from '../ModalPopup/index';
import ModalContentAvatar from './ModalContentAvatar';

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

const NicknameCloseButton = styled.button`
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

const defaultButtonStyle = css`
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

const ResetButton = styled(Button)`
    ${defaultButtonStyle}
`;

const AccessButton = styled(Button)`
    ${defaultButtonStyle}
`;

const SourceText = styled.span`
    display:block;
    text-align:left;
    font-size:60%;
    color:#aaa;
`;

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

    const onClosePopup = useCallback((isOk, avatarSrc = null) => () => {
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

            { isVisible && (
                <ModalPopup 
                    button_disabled={{
                        Maximize: true,
                        Minimization: true
                    }}
                    visible={isVisible} 
                    modal_width="500"
                    title="아바타 설정"
                    content={<ModalContentAvatar onClosePopup={onClosePopup} />}
                    footer={<SourceText>이미지출처: https://www.pngwing.com/ko/free-png-zvldq/download</SourceText>}
                    onClosePopup={onClosePopup} 
                />
            )}

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