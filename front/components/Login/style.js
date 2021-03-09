import styled, { css } from 'styled-components';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { colors, calcRem } from '../../theme/styles';

export const InfoArea = styled.div`
    display:block;
    text-align: center;

    div + div {
        margin-top: ${calcRem(20)};
    }
`;

const defaultAvatar = css`
    margin-bottom: ${calcRem(20)};
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
    margin-bottom: ${calcRem(20)};
`;

export const InputWrap = styled.div`
    position: relative;
    border: ${calcRem(2)}; solid ${colors.white};
    border-radius: ${calcRem(3)};
    opacity: 0.8;
    box-sizing: border-box;
`;

export const UserIcon = styled(UserOutlined)`
    position: absolute;
    top: 0;
    left: 0;
    color: ${colors.white};
    transform: translate(50%, 50%);
`;

export const Input = styled.input`
    padding: 2% 10%;
    width: 100%;
    font-size: ${calcRem(16)};
    color: ${colors.white};
    border: none;
    background: none;
    box-sizing: border-box;

    &:hover,
    &:focus {
        outline: none;

    }    

    &::placeholder {
        color: ${colors.white};
    }
`;

export const Nickname = styled.div`
    padding: 2% 0;
    font-size: ${calcRem(16)};
    line-height: ${calcRem(16)};
    color: ${colors.white};
    box-sizing: border-box;
`;

export const RemoveButton = styled.button`
    padding: 0;
    margin-left: ${calcRem(5)};
    line-height: 1;
    color: ${colors.white};
    border: none;
    background: none;
    cursor: pointer;
    outline: none;

    &:hover,
    &:focus { 
        color: ${colors.white};
        border: none;
    }
`;

export const InfoButtonArea = styled.div`
    text-align: center;
`;

export const InfoButton = styled(Button)`
    padding: 2% 5%;
    font-size: ${calcRem(16)};
    line-height: ${calcRem(16)};
    color: ${colors.white};
    border: ${calcRem(2)} solid ${colors.white};
    background: none;
    cursor: pointer;

    &:hover,
    &:focus {
        color: ${colors.white};
        border-color: ${colors.white};
        background: none;
        opacity: 0.5;
    }

    & + button {
        margin-left: ${calcRem(15)};
    }
`;