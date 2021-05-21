import styled from 'styled-components';

export const Form = styled.form`
    position: relative;
    padding: ${({ theme }) => theme.calcRem(20)};
    width: 100%;
`;

export const Item = styled.div`
    text-align: center;    

    & + div {
        margin-top: ${({ theme }) => theme.calcRem(15)};
    }
`;

export const Input = styled.input`
    padding: ${({ theme }) => theme.calcRem(3)} ${({ theme }) => theme.calcRem(10)};
    width: 70%;
    color: ${({ theme }) => theme.colors.black};
    border: none;
    outline: none;
`;

export const ButtonArea = styled.div`
    text-align: center;    

    button {
        padding: ${({ theme }) => theme.calcRem(3)} ${({ theme }) => theme.calcRem(10)};
        border: 1px solid white;
        outline: none; 
        background: none;
        cursor: pointer;
    }

    button + button {
        margin-left: ${({ theme }) => theme.calcRem(15)};
    }
`;