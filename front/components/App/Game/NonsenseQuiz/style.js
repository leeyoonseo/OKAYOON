import styled from 'styled-components';

export const Wrap = styled.div`
    position: relative;
    padding: 5%;
    height: calc(100% - ${({ theme }) => theme.calcRem(30)});
    font-size: ${({ theme }) => theme.calcRem(16)};
    text-align: center;
    background: ${({ theme }) => theme.nonsenseColors.lightPink};
    border-radius: 0 0 ${({ theme }) => theme.calcRem(20)} ${({ theme }) => theme.calcRem(20)};
`;