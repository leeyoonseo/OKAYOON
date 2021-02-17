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
    avatar, setAvatar
}) => {
    const dispatch = useDispatch();
    const { me, logInLoading } = useSelector((state) => state.user);
    const [nickname, onChangeNickname, setNickname] = useInput(me?.nickname ? me.nickname : '');
    const inputRef = useRef(null);
    const [haveNickname, setHaveNickname] = useState(false);

    useEffect(() => {
        inputRef.current && inputRef.current.focus();

        if (nickname) {
            setHaveNickname(true);
        }
    }, []);

    const onClickReset = useCallback(() => {
        setNickname('');
        setAvatar(null);
        setHaveNickname(false);
    }, []);

    const onClickAccess = useCallback(() => {
        const data = {};

        if(!nickname){
            setNickname('Guest');
            data.nickname = 'Guest';
            
        }else {
            data.nickname = nickname;
        }

        data.avatar = avatar;

        dispatch({
            type: LOG_IN_REQUEST,
            data: data
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
            onClickAccess();
        }
    }, [nickname]); 

    return (
        <>
            <InfoArea>
                <AvatarButton 
                    size={64} 
                    src={avatar ? avatar : null}
                    icon={<UserOutlined />} 
                    onClick={onClickModal(AVATAR_MODAL_ID)}
                />

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
                    onClick={onClickAccess} 
                >
                    접속
                </InfoButton>
            </InfoButtonArea>
        </>
    );
};

export default User;