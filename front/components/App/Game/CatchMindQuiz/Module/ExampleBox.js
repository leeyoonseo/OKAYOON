import React, { useMemo } from 'react';
import styled from 'styled-components';

const Button = styled.button`
    padding: 0;
    display: inline-block;
    width: 16%;
    font-size: ${({ theme }) => theme.calcRem(20)};
    color: ${({ theme }) => theme.cColors.black};
    background: white;
    border: ${({ theme }) => theme.calcRem(2)} solid ${({ theme }) => theme.cColors.black};
    border-radius: ${({ theme }) => theme.calcRem(3)};;
    outline: none;
    cursor: pointer;

    &[disabled] {
        cursor: default;
    }

    &:nth-child(7n) {
        margin-left: 0;
    }

    &:nth-child(n + 6) { 
        margin-top: 0.5%;
    }

    &.active {
        background: ${({ theme }) => theme.cColors.orange};
        color: ${({ theme }) => theme.cColors.orange};
        box-shadow: inset ${({ theme }) => theme.calcRem(2)} ${({ theme }) => theme.calcRem(3)} ${({ theme }) => theme.calcRem(5)} ${({ theme }) => theme.colors.rgbaBlack};
    }

    & + button {
        margin-left: 0.5%;
    }
`;

const ExampleBox = ({ example, examRef, openedResult, onClickExample }) => {
    return useMemo(() => {
        return examRef.length >= 1 && example.map((val, i) => {
            return (
                <Button 
                    key={`example_${val}_${i}`}
                    value={val}
                    onClick={onClickExample}
                    ref={examRef[i]}
                    disabled={openedResult}
                > 
                    {val}
                </Button>
            )
        })
    }, [example, examRef, openedResult, onClickExample]);
};

export default ExampleBox;