import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import PropTypes from 'prop-types';

import { UserOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import {
    Wrap, AvatarButton, NicknameArea,NicknameInputWrap, 
    NicknameInput, UserIcon, Nickname, CloseButton, CheckButton
} from './style';

const UserInfo = ({ id, avatar, nickname, setNickname, forwordRef, onClickModal }) => {
    const { me } = useSelector((state) => state.user);

    useEffect(() => {
        forwordRef.current && forwordRef.current.focus();
        console.log('type', typeof forwordRef);

        if(me.nickname){
            setNickname(me.nickname);
        }
    }, []);

    const onRemoveNickname = useCallback(() => {
        setNickname('');
    }, []);

    const onSaveNickname = useCallback(() => {
        const val = forwordRef.current.value; 
        setNickname(val);
    }, []);

    return(
        <Wrap>
            <AvatarButton 
                size={64} 
                src={avatar ? avatar : null}
                icon={<UserOutlined />} 
                onClick={onClickModal(id)}
            />

            <NicknameArea>
                {
                    nickname 
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
                            />

                            <CheckButton onClick={onSaveNickname}>
                                <CheckOutlined />
                            </CheckButton>
                        </NicknameInputWrap>
                    )
                } 
            </NicknameArea>
        </Wrap>
    );
};

UserInfo.propTypes = {
    // TODO: ID 사용중인가?
    // id: PropTypes.string, 
    avatar: PropTypes.string, 
    nickname: PropTypes.string, 
    setNickname: PropTypes.func.isRequired, 
    forwordRef: PropTypes.object,
    onClickModal: PropTypes.func.isRequired,
};

UserInfo.defaultProps = {
    avatar: null,
    nickname: 'Guest',
};

export default UserInfo;

// TODO:
// - props 전달할때 대문자 못씀?
// - 색 디자인 새로하자 밝게?