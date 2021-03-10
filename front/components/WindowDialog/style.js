import styled, { css } from 'styled-components';
import { colors, calcRem } from '../../theme/styles';

const defaultButtonStyle = css`
    padding: ${calcRem(2)} ${calcRem(10)};
    border: 1px solid ${colors.black};
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
    max-width: ${calcRem(300)};
    max-height: ${calcRem(300)};
    transform: translate(-50%, -50%);
    background: ${colors.white};
    border-radius: ${calcRem(5)};
    box-shadow: ${calcRem(1)} ${calcRem(1)} ${calcRem(5)} ${colors.rgbaBlack};
    box-sizing: border-box;
    z-index: 9999999;
`;

export const Text = styled.div`
    overflow-y: auto;
`;

export const InputWrap = styled.div`
    margin-top: ${calcRem(10)};

    input {
        padding: ${calcRem(5)} ${calcRem(10)};
        width: 100%;
        border: 1px solid ${colors.black};
        box-sizing: border-box;
        outline: none;
    }
`;

export const ButtonArea = styled.div`
    margin-top: ${calcRem(15)};
    text-align: center;

    button + button {
        margin-left: ${calcRem(15)};
    }
`;

export const CancelButton = styled.button`
    ${defaultButtonStyle}
    background: none;
`;

export const ConfirmButton = styled.button`
    ${defaultButtonStyle}
    background: ${colors.gray};
`;