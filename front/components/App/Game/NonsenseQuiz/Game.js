import React, { useCallback, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { ClockCircleOutlined, CheckOutlined, CloseOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { STEP_FINISH } from './index';
import { shuffleArray } from '../index';

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 5%;
    height: calc(100% - ${({ theme }) => theme.calcRem(30)});
    font-size: ${({ theme }) => theme.calcRem(16)};
    text-align: center;
    background: ${({ theme }) => theme.nonsenseColors.lightPink};
    border-radius: 0 0 ${({ theme }) => theme.calcRem(20)} ${({ theme }) => theme.calcRem(20)};
`;

const resultFadeIn = keyframes`
    0% {
        font-size: ${({ theme }) => theme.calcRem(10)};
    }
    100% {
        font-size: ${({ theme }) => theme.calcRem(60)};
    }
`;

const Inner = styled.div`
    display: inline-block;
    min-height: ${({ theme }) => theme.calcRem(380)};
    position: relative;

    & > div + div {
        margin-top: ${({ theme }) => theme.calcRem(20)};
    }
`;

const QuizArea = styled.div`
    span {
        display: block;
        text-align: center;
    }
`;

const Question = styled.span`
    font-size: ${({ theme }) => theme.calcRem(35)};
    font-weight: 700;
    line-height: 1.25;
    text-shadow: -${({ theme }) => theme.calcRem(2)} 0  ${({ theme }) => theme.nonsenseColors.black}, 
                0 ${({ theme }) => theme.calcRem(2)}  ${({ theme }) => theme.nonsenseColors.black}, 
                ${({ theme }) => theme.calcRem(2)} 0  ${({ theme }) => theme.nonsenseColors.black}, 
                0 -${({ theme }) => theme.calcRem(2)}  ${({ theme }) => theme.nonsenseColors.black};
    color: ${({ theme }) => theme.nonsenseColors.orange};
`;

const TimerArea = styled.div`
    text-align: center;
    line-height: 1;
    font-weight: 700;
    color: ${({ theme }) => theme.nonsenseColors.black};
`;

const TimerIcon = styled(ClockCircleOutlined)`
    font-size: ${({ theme }) => theme.calcRem(20)};
    margin-right: ${({ theme }) => theme.calcRem(5)};
`;

const Time = styled.span`
    font-size: ${({ theme }) => theme.calcRem(25)};
`;

const AnswerArea = styled.div`
    width: 100%;
    max-width: ${({ theme }) => theme.calcRem(400)};
    margin: ${({ theme }) => theme.calcRem(20)} auto 0;

    &:after {
        display: block;
        content: '';
        clear: both;
    }

    & > div:nth-child(2n) {
        margin-left: 6%;
    }

    & > div:nth-child(n + 3) {
        margin-top: 5%;
    }
`;

const Items = styled.div`
    width: 47%;
    float: left;
    height: ${({ theme }) => theme.calcRem(100)};
    overflow: hidden;
    
    button {
        padding: 10%;
        width: 100%;
        height: 100%;
        font-size: ${({ theme }) => theme.calcRem(25)};
        line-height: 1.25;
        border: ${({ theme }) => theme.calcRem(2)} solid ${({ theme }) => theme.nonsenseColors.black};
        border-radius: ${({ theme }) => theme.calcRem(15)};
        background: ${({ theme }) => theme.nonsenseColors.skyBlue};
        outline: none;
        box-sizing: border-box;
        cursor: pointer;

        &[disabled] {
            cursor: default;
        }
    }
`;

const Result = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    line-height: 1;
    text-align: center;
    border-radius: ${({ theme }) => theme.calcRem(5)};
    transform: translate(-50%, -50%);
    animation: ${resultFadeIn} 0.1s linear ;
`;

const Message = styled.span`
    font-size: ${({ theme }) => theme.calcRem(200)};   
    color: ${props => props.isCorrect ? '#26ca3f' : '#ff6059'};
`;
const Game = ({ 
    score,
    setScore, 
    onChangeStep, 
    data, 
    MAX_ROUND, 
    MAX_TIME,
}) => {
    const [openedResult, setOpenedResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);

    const [quizList, setQuizList] = useState(null); // [D] 퀴즈배열 
    const [quiz, setQuiz] = useState(null); // [D] 현재퀴즈
    const [example, setExample] = useState(null); // [D] 보기
    const [round, setRound] = useState(null);
    const [time, setTime] = useState(null);

    // TODO: 여러번 리렌더링되는지 확인할 것
    useEffect(() => {
        if(!data) return;

        setQuizList(data);
        setRound(0);
    }, []);

    useEffect(() => {
        if(round === null) return;

        const q = quizList[round];
        const ex = (typeof q.example === 'string') ? JSON.parse(q.example) : q.example;
        const shuffleEx = shuffleArray(Object.values(ex));

        setQuiz(q);
        setExample(shuffleEx);
        setTime(MAX_TIME);
    }, [quizList, round]); 

    useEffect(() => {
        if (time === null) return;

        if (openedResult) {
            return clearInterval(timer);
        }

        // [D] 시간제한 실패
        if (time === 0) {
            clearInterval(timer);
            moveNextRound({ scoreUp: false });  
            return;
        };

        const timer = setInterval(() => {
            setTime(time - 10);
        }, 100);

        return () => {
            clearInterval(timer);
        }
    }, [time, openedResult]); 

    const moveNextRound = useCallback(({ scoreUp }) => {
        if (scoreUp) {
            setScore(score + 1);
        }

        setIsCorrect(scoreUp);
        setOpenedResult(true);

        setTimeout(() => {
            setOpenedResult(false);
            
            if (round > MAX_ROUND || round >= (data.length - 1)) {
                setRound(null);
                onChangeStep(STEP_FINISH)();
                return;
            }

            setRound(round + 1);
            setTime(MAX_TIME);
        }, 1000);
    }, [round, score]);

    const onClickExample = useCallback((state) => () => {
        if (openedResult) return;

        moveNextRound({ scoreUp: state });
    }, [round, openedResult]);

    return (
        <Wrap>
            <Inner>
                {quiz && (
                    <>
                        <QuizArea>
                            <Question>
                                {`Q. ${round + 1} ${quiz.question}`}
                            </Question>
                        </QuizArea>

                        <TimerArea>
                            <TimerIcon /> 
                            <Time>
                                {Math.floor(time / 100)}
                            </Time>
                        </TimerArea>

                        <AnswerArea>
                            {example && example.map((v, i) => {
                                const { question, answer, isCorrect } = v;
                                
                                return (
                                    <Items key={`Q_${i}_${question}`}>
                                        <button 
                                            onClick={onClickExample(isCorrect)}
                                            disabled={openedResult}
                                        >
                                            {answer}
                                        </button>
                                    </Items>
                                )
                            })}
                        </AnswerArea>
                    </>
                )}     

                {openedResult && (
                    <Result>
                        <Message isCorrect={isCorrect}> 
                            {isCorrect ? <CheckOutlined /> : <CloseOutlined />}
                        </Message>
                    </Result>
                )}
            </Inner>
        </Wrap>
    );
};

export default Game;