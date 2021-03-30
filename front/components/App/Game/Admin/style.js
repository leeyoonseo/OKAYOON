import styled from 'styled-components';

export const Wrap = styled.div`
    padding: 2%;
    width: 100%;
    height: ${({ theme }) => theme.calcRem(400)};
    font-size: ${({ theme }) => theme.calcRem(16)};
    background: ${({ theme }) => theme.colors.black};

    & > div + div {
        margin-top: ${({ theme }) => theme.calcRem(40)};
    }
`;

export const BackButton = styled.button`
    padding: 0;
    line-height: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

export const SelectArea = styled.div`
    text-align: center;
`;

export const Title = styled.div`
    display: inline-block;
    font-size: ${({ theme }) => theme.calcRem(20)};
    border-bottom: 1px solid white;
`;

export const Select = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(15)};
`;

export const OptionItems = styled.div`
    display: inline-block;
    
    label {
        opacity: 0.3;
        cursor: pointer;
    }

    input[type='radio'],
    input[type='radio']:checked {
        appearance: none;
        background: none;
        outline: none;
        cursor: pointer;
    }

    input[type='radio']:checked + label {
        opacity: 1;
    }

    label[disabled],
    input[disabled] {
        display: none;
    }

    & + div {
        margin-left: ${({ theme }) => theme.calcRem(10)};
    }
`;

export const NotifyMessage = styled.div`
    display: flex;
    margin: 0 !important;
    height: calc(100% - ${({ theme }) => theme.calcRem(110)});
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
`;