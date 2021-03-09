import styled, { css } from 'styled-components';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export const InfoArea = styled.div`
    display:block;
    text-align: center;

    div + div {
        margin-top: 1.25rem;
    }
`;

const defaultAvatar = css`
    margin-bottom: 1.25rem;
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
    margin-bottom: 1.25rem;
`;

export const InputWrap = styled.div`
    position: relative;
    border: 2px solid #FFFFF3;
    border-radius: 0.188rem;
    opacity: 0.8;
    box-sizing: border-box;
`;

export const UserIcon = styled(UserOutlined)`
    position: absolute;
    top: 0;
    left: 0;
    color: #FFFFF3;
    transform: translate(50%, 50%);
`;

export const Input = styled.input`
    padding: 2% 10%;
    width: 100%;
    font-size: 1rem;
    color: #FFFFF3;
    border: none;
    background: none;
    box-sizing: border-box;

    &:hover,
    &:focus {
        outline: none;

    }    

    &::placeholder {
        color: #FFFFF3;
    }
`;

export const Nickname = styled.div`
    padding: 2% 0;
    font-size: 1rem;
    line-height: 1rem;
    color: #FFFFF3;
    box-sizing: border-box;
`;

export const RemoveButton = styled.button`
    padding: 0;
    margin-left: 0.313rem;
    line-height: 1;
    color: #FFFFF3;
    border: none;
    background: none;
    cursor: pointer;
    outline: none;

    &:hover,
    &:focus { 
        color: #FFFFF3;
        border: none;
    }
`;

export const InfoButtonArea = styled.div`
    text-align: center;
`;

export const InfoButton = styled(Button)`
    padding: 2% 5%;
    font-size: 1rem;
    line-height: 1rem;
    color: #FFFFF3;
    border: 2px solid #FFFFF3;
    background: none;
    cursor: pointer;

    &:hover,
    &:focus {
        color: #FFFFF3;
        border-color: #FFFFF3;
        background: none;
        opacity: 0.5;
    }

    & + button {
        margin-left: 0.938rem;
    }
`;