import styled, { css } from 'styled-components';
import { Avatar, Button, Modal } from 'antd';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';

export const Wrap = styled.div`
    display:block;
    // width: 300px;
    text-align: center;
`;

export const AvatarButton = styled(Avatar)`
    margin-bottom: 10px;
    cursor: pointer;
    opacity: 0.8;
`;

export const NicknameArea = styled.div`
    margin-bottom: 10px;
`;

export const NicknameInputWrap = styled.div`
    height: 36px;
    border: 1px solid #fff;
    border-radius: 3px;
    opacity: 0.8;
    box-sizing: border-box;
`;

export const UserIcon = styled(UserOutlined)`
    display: inline-block;
    width: 10%; 
    color: #fff;
    text-align: right;
    opacity: 0.8;
    box-sizing: border-box;
`;

export const NicknameInput = styled.input`
    margin: 6px 0;
    padding: 0 5px;
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

export const CheckButton = styled.button`
    width: 10%;
    height: 100%;
    color: #fff;
    border: none;
    border-left: 1px solid #fff;
    background: none;
    outline: none; 
    cursor: pointer;

    &:hover,
    &:focus { 
        background: none;
    }
`;

export const CloseButton = styled.button`
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