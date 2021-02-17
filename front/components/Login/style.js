import styled, { css } from 'styled-components';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export const InfoArea = styled.div`
    display:block;
    text-align: center;

    div + div {
        margin-top: 10px;
    }
`;

const defaultAvatar = css`
    margin-bottom: 10px;
    opacity: 0.8;
`;

export const AvatarButton = styled(Avatar)`
    ${defaultAvatar}
    cursor: pointer;
`;

export const DefaultAvatar = styled(Avatar)`
    ${defaultAvatar}
`;

export const NicknameWrap = styled.div`
    margin-bottom: 10px;
`;

export const InputWrap = styled.div`
    position: relative;
    height: 36px;
    border: 1px solid #fff;
    border-radius: 3px;
    opacity: 0.8;
    box-sizing: border-box;
`;

export const UserIcon = styled(UserOutlined)`
    position: absolute;
    top: 50%;
    left: 7px;
    color: #fff;
    transform: translateY(-50%);
`;

export const Input = styled.input`
    margin: 6px 0;
    padding: 0 30px;
    width: 100%;
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
    padding: 6px 0;
    margin-bottom: 10px;
    height: 36px;
    color: #fff;
    box-sizing: border-box;
`;

export const RemoveButton = styled.button`
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

export const InfoButtonArea = styled.div`
    text-align: center;
`;

export const InfoButton = styled(Button)`
    padding: 5px 10px;
    color: #fff;
    background: none;
    border: 1px solid #fff;
    cursor: pointer;

    &:hover,
    &:focus {
        color: #fff;
        border-color: #fff;
        background: none;
        opacity: 0.8;
    }

    & + button {
        margin-left: 10px;
    }
`;