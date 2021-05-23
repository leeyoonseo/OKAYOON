import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { STEP_FINISH } from './index';
import Frame from '../Module/Frame';

const Step = styled.div`
    max-width: ${({ theme }) => theme.calcRem(620)};

    & > div + div {
        margin-top: ${({ theme }) => theme.calcRem(20)};
    }
`;

const Round = styled.div`
    display: inline-block;
    padding: ${({ theme }) => theme.calcRem(5)} ${({ theme }) => theme.calcRem(15)};
    font-size: ${({ theme }) => theme.calcRem(20)};
    border-radius: ${({ theme }) => theme.calcRem(30)};
    background: black;
`;

const Question = styled.div`
    margin: ${({ theme }) => theme.calcRem(20)} auto 0;
    width: 90%;
    word-break: keep-all;
    font-size: ${({ theme }) => theme.calcRem(26)};
    line-height: 1.25;
    color: black;
`;

const Example = styled.div`
    display: inline-block;
    padding: ${({ theme }) => theme.calcRem(50)} ${({ theme }) => theme.calcRem(20)};
    width: 100%;
    color: black;
    border: 1px solid black;
    background: white;
`;

const Items = styled.div`
    button {
        padding: 0;
        font-size: ${({ theme }) => theme.calcRem(22)};
        line-height: 1.25;
        border: none;
        background: none;
        outline: none;
        cursor: pointer;

        &:hover {
            opacity: 0.5;
        }
    }

    & + div {
        margin-top: ${({ theme }) => theme.calcRem(20)};
    }
`;

const Game = ({ data, type, setType, onChangeStep }) => {
    const [round, setRound] = useState(1);

    useEffect(() => setType(null), []);

    const onClickExam = useCallback(({ target }) => {
        const i = target.dataset.index;

        setType(type ? type + i : i);

        if (type) {
            return onChangeStep(STEP_FINISH);
        }

        setRound(round + 1);
    }, [type, round]);

    return (
        <Frame>
            {data && data.map(({ round: dataRound, question, example }) => {
                if (dataRound !== round) return;

                return (
                    <Step key={`${dataRound}_${question.charAt(0)}`}>
                        <Round>
                            {dataRound}번 질문
                        </Round>

                        <Question dangerouslySetInnerHTML={{ __html: question }}/>

                        <Example>
                            {example.map(({ type, answer }) => (
                                <Items key={`answer_${type}`}>
                                    <button 
                                        onClick={onClickExam}
                                        data-index={type}
                                    >
                                        {answer}
                                    </button>
                                </Items>
                            ))}
                        </Example>
                    </Step>
                )   
            })}
        </Frame>
    );
};

export default Game;