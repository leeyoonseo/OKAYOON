import React, { useMemo } from 'react';
import styled from 'styled-components';

const Box = styled.span`
    display: inline-block;
    width: ${({ theme }) => theme.calcRem(50)};
    height: ${({ theme }) => theme.calcRem(50)};
    vertical-align: top;
    border-radius: ${({ theme }) => theme.calcRem(5)};
    background: ${({ theme }) => theme.cColors.ivory};
    border: ${({ theme }) => theme.calcRem(2)} solid ${({ theme }) => theme.cColors.black};
    box-shadow: inset 1px 1px ${({ theme }) => theme.calcRem(3)} ${({ theme }) => theme.colors.rgbaBlack};
    cursor: default;

    & + span {
        margin-left: ${({ theme }) => theme.calcRem(5)};
    }

    &.active {
        box-shadow: none;
    }
`;

const AnswerBox = ({ correctWord, userAnswer }) => {
    return useMemo(() => {
        return Array(correctWord.length).fill().map((_, i) => {
            const value = userAnswer.split('')[i];

            return (
                <Box 
                    key={`${correctWord}_word_${i}`}
                    className={value ? 'active' : ''}
                >
                    {value}
                </Box>
            )
        })
    }, [correctWord, userAnswer]);
};

export default AnswerBox;