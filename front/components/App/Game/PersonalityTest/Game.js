import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { STEP_FINISH } from './index';
import Layout from './Layout';

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
        font-size: 22px;
        line-height: 1;
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

const Game = ({
    data, 
    type,
    setType,
    onChangeStep, 
}) => {
    const [round, setRound] = useState(1);

    useEffect(() => setType(null), []);

    const onClickExam = useCallback((e) => {
        const i = e.target.dataset.index;

        setType(type ? type + i : i);

        if (!type) {
            setRound(round + 1);

        } else {
            onChangeStep(STEP_FINISH)();
        }
    }, [type, round]);

    return (
        <Layout>
            {data && data.map((v) => {
                if (v.round !== round) return;

                return (
                    <Step key={`${v.round}_${v.question.charAt(0)}`}>
                        <Round>
                            {v.round}번 질문
                        </Round>

                        <Question dangerouslySetInnerHTML={{ __html: v.question }}/>

                        <Example>
                            {v.example.map((o) => {
                                return (
                                    <Items key={`answer_${o.type}`}>
                                        <button 
                                            onClick={onClickExam}
                                            data-index={o.type}
                                        >
                                            {o.answer}
                                        </button>
                                    </Items>
                                )
                            })}
                        </Example>
                    </Step>
                )   
            })}
        </Layout>
    );
};

export default Game;