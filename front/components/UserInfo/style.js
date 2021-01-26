import styled, { css } from 'styled-components';
import { Avatar, Button, Modal } from 'antd';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';

export const UserInfoWrap = styled.div`
    display:inline-block;
    width: 300px;
    text-align: center;
`;

export const AvatarButton = styled(Avatar)`
    margin-bottom: 10px;
    cursor: pointer;
    opacity: 0.8;
`;

export const NicknameWrap = styled.div`
    margin-bottom: 10px;
`;

export const UserIcon = styled(UserOutlined)`
    color: #fff;
    opacity: 0.8;
`;

export const NicknameInputWrap = styled.div`
    padding: 6px;
    height: 36px;
    border: 1px solid #fff;
    border-radius: 3px;
    opacity: 0.8;
    box-sizing: border-box;
`;

export const NicknameInput = styled.input`
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

export const Nickname = styled.div`
    margin-bottom: 10px;
    color: #fff;

    height: 36px;
    padding: 6px 0;
    box-sizing: border-box;
`;

export const NicknameCloseButton = styled.button`
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

export const CloseIcon = styled(CloseOutlined)`
`;

export const defaultButtonStyle = css`
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

export const ResetButton = styled(Button)`
    ${defaultButtonStyle}
`;

export const AccessButton = styled(Button)`
    ${defaultButtonStyle}
`;

export const SourceText = styled.span`
    display:block;
    text-align:left;
    font-size:60%;
    color:#aaa;
`;
