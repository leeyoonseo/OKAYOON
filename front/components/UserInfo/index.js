import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import PropTypes from 'prop-types';

import { UserOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import {
    Wrap, AvatarButton, NicknameArea,NicknameInputWrap, 
    NicknameInput, UserIcon, Nickname, CloseButton, CheckButton
} from './style';

const UserInfo = ({ 
    id, avatar, 
    nickname, onChangeNickname, setNickname, 
    forwordRef, onClickModal 
}) => {
    const [haveNickname, setHaveNickname] = useState(false);

    useEffect(() => {
        forwordRef.current && forwordRef.current.focus();

        if (nickname) {
            setHaveNickname(true);
        }
    }, []);

    const onRemoveNickname = useCallback(() => {
        setNickname('');
        setHaveNickname(false);
    }, []);

    const onSaveNickname = useCallback(() => {
        setNickname(nickname);
        setHaveNickname(true);
    }, [nickname]);

    const onKeyPressInput = useCallback((e) => {
        if (e.code === 'Enter') {
            onSaveNickname();
        }
    }, [nickname]); 

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
                    haveNickname 
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
                                maxLength="20"
                                placeholder="Please your nickname" 
                                ref={forwordRef}
                                value={nickname}
                                onChange={onChangeNickname}
                                onKeyPress={onKeyPressInput}
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
    id: PropTypes.string.isRequired, 
    avatar: PropTypes.string, 
    nickname: PropTypes.string, 
    setNickname: PropTypes.func.isRequired, 
    forwordRef: PropTypes.object.isRequired,
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