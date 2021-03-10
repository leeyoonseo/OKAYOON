import styled, { css } from 'styled-components';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export const InfoArea = styled.div`
    display:block;
    text-align: center;

    div + div {
        margin-top: ${({ theme }) => theme.calcRem(20)};
    }
`;

const defaultAvatar = css`
    margin-bottom: ${({ theme }) => theme.calcRem(20)};
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
    margin-bottom: ${({ theme }) => theme.calcRem(20)};
`;

export const InputWrap = styled.div`
    position: relative;
    border: ${({ theme }) => theme.calcRem(2)} solid ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.calcRem(3)};
    opacity: 0.8;
    box-sizing: border-box;
`;

export const UserIcon = styled(UserOutlined)`
    position: absolute;
    top: 0;
    left: 0;
    color: ${({ theme }) => theme.colors.white};
    transform: translate(50%, 50%);
`;

export const Input = styled.input`
    padding: 0 10%;
    width: 100%;
    height: ${({ theme }) => theme.calcRem(35)};
    font-size: ${({ theme }) => theme.calcRem(16)};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    background: none;
    box-sizing: border-box;

    &:hover,
    &:focus {
        outline: none;

    }    

    &::placeholder {
        color: ${({ theme }) => theme.colors.white};
    }
`;

export const Nickname = styled.div`
    padding: 2% 0;
    font-size: ${({ theme }) => theme.calcRem(16)};
    line-height: ${({ theme }) => theme.calcRem(16)};
    color: ${({ theme }) => theme.colors.white};
    box-sizing: border-box;
`;

export const InfoButtonArea = styled.div`
    text-align: center;

    button {
        height: ${({ theme }) => theme.calcRem(35)};
    }
`;

export const RemoveButton = styled.button`
    padding: 0;
    margin-left: ${({ theme }) => theme.calcRem(5)};
    line-height: 1;
    color: ${({ theme }) => theme.colors.white};
    border: none;
    background: none;
    cursor: pointer;
    outline: none;

    &:hover,
    &:focus { 
        color: ${({ theme }) => theme.colors.white};
        border: none;
    }
`;

export const InfoButton = styled(Button)`
    padding: 2% 5%;
    font-size: ${({ theme }) => theme.calcRem(16)};
    line-height: ${({ theme }) => theme.calcRem(16)};
    color: ${({ theme }) => theme.colors.white};
    border: ${({ theme }) => theme.calcRem(2)} solid ${({ theme }) => theme.colors.white};
    background: none;
    cursor: pointer;

    &:hover,
    &:focus {
        color: ${({ theme }) => theme.colors.white};
        border-color: ${({ theme }) => theme.colors.white};
        background: none;
        opacity: 0.5;
    }

    & + button {
        margin-left: ${({ theme }) => theme.calcRem(15)};
    }
`;