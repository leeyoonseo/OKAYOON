import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import useInput from '../../hooks/useInput';
import PropTypes from 'prop-types';
import {
    InfoArea, AvatarButton, NicknameWrap, InputWrap, 
    Input, UserIcon, Nickname, RemoveButton, 
    InfoButtonArea, InfoButton, ClickText
} from './style';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';

import { AVATAR_MODAL_ID } from '../ModalPopup/data';
import { LOG_IN_REQUEST } from '../../reducers/user';
import { ALL_CLOSED_MODAL } from '../../reducers/site';

const User = ({ onClickModal, avatar, setAvatar }) => {
    const dispatch = useDispatch();
    const { me, logInLoading, avatarList } = useSelector(state => state.user);
    const [nickname, onChangeNickname, setNickname] = useInput(me?.nickname ? me.nickname : 'Guest');
    const [cookies, setCookies, removeCookies] = useCookies(['me']);
    const [haveNickname, setHaveNickname] = useState(false);
    const [isFirstClicked, setIsFirstClicked] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current && inputRef.current.focus();
    }, []);

    const getAvatarSrc = useCallback(() => {
        const item = avatarList.find(({ title }) => title === avatar);
        return item ? item.src : null;
    }, [avatar]);

    const onClickReset = useCallback(() => {
        setNickname('Guest');
        setAvatar('nickname');
        setHaveNickname(false);
    }, []);

    const onSubmit = useCallback(() => {
        setCookies('me', { avatar, nickname },{ maxAge: 2000 });
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                avatar,
                nickname
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

    const onClickAvatar = useCallback(() => {
        onClickModal(AVATAR_MODAL_ID);
        setIsFirstClicked(true);
    }, [AVATAR_MODAL_ID]);

    return (
        <>
            <InfoArea>
                {!isFirstClicked && <ClickText>↓ Click</ClickText>}
                {avatar === 'nickname' ? (
                    <AvatarButton 
                        size={80} 
                        onClick={onClickAvatar}
                    >
                        {nickname.substr(0, 5)}
                    </AvatarButton>
                ) : (
                    <AvatarButton 
                        size={80} 
                        src={getAvatarSrc()}
                        icon={<UserOutlined />} 
                        onClick={onClickAvatar}
                    />
                )}
                <NicknameWrap>
                    {haveNickname ? (
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

User.propTypes = {
    onClickModal: PropTypes.func.isRequired,
    avatar: PropTypes.string.isRequired, 
    setAvatar: PropTypes.func.isRequired,
}

export default User;