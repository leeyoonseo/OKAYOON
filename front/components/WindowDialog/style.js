import styled, { css } from 'styled-components';

const defaultButtonStyle = css`
    padding: ${({ theme }) => theme.calcRem(2)} ${({ theme }) => theme.calcRem(10)};
    border: 1px solid ${({ theme }) => theme.colors.black};
    box-sizing: border-box;
    outline: none;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

export const Wrap = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 3%;
    max-width: ${({ theme }) => theme.calcRem(300)};
    max-height: ${({ theme }) => theme.calcRem(300)};
    transform: translate(-50%, -50%);
    background: white;
    border-radius: ${({ theme }) => theme.calcRem(5)};
    box-shadow: ${({ theme }) => theme.calcRem(1)} ${({ theme }) => theme.calcRem(1)} ${({ theme }) => theme.calcRem(5)} ${({ theme }) => theme.colors.rgbaBlack};
    box-sizing: border-box;
    z-index: 9999999;
`;

export const Text = styled.div`
    overflow-y: auto;
`;

export const InputWrap = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(10)};

    input {
        padding: ${({ theme }) => theme.calcRem(5)} ${({ theme }) => theme.calcRem(10)};
        width: 100%;
        border: 1px solid ${({ theme }) => theme.colors.black};
        box-sizing: border-box;
        outline: none;
    }
`;

export const ButtonArea = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(15)};
    text-align: center;

    button + button {
        margin-left: ${({ theme }) => theme.calcRem(15)};
    }
`;

export const CancelButton = styled.button`
    ${defaultButtonStyle}
    background: none;
`;

export const ConfirmButton = styled.button`
    ${defaultButtonStyle}
    background: ${({ theme }) => theme.colors.lightYellowGray};
`;