import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { STEP_FINISH } from './index';
import { shuffleArray } from '../../../../../util/common';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Frame from '../Module/Frame';
import Timer from '../Module/Timer';

const resultFadeIn = keyframes`
    0% {
        font-size: ${({ theme }) => theme.calcRem(10)};
    }
    100% {
        font-size: ${({ theme }) => theme.calcRem(60)};
    }
`;

const Inner = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: ${({ theme }) => theme.calcRem(380)};
    justify-content: center;
    align-items: center;

    & > div + div {
        margin-top: ${({ theme }) => theme.calcRem(20)};
    }
`;

const Content = styled.div`
    display: inline-block;
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
    text-shadow: -${({ theme }) => theme.calcRem(2)} 0  ${({ theme }) => theme.nColors.black}, 
                0 ${({ theme }) => theme.calcRem(2)}  ${({ theme }) => theme.nColors.black}, 
                ${({ theme }) => theme.calcRem(2)} 0  ${({ theme }) => theme.nColors.black}, 
                0 -${({ theme }) => theme.calcRem(2)}  ${({ theme }) => theme.nColors.black};
    color: ${({ theme }) => theme.nColors.orange};
`;

const TimerArea = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(20)};
    text-align: center;
    line-height: 1;
    font-weight: 700;
    color: ${({ theme }) => theme.nColors.black};
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
        border: ${({ theme }) => theme.calcRem(2)} solid ${({ theme }) => theme.nColors.black};
        border-radius: ${({ theme }) => theme.calcRem(15)};
        background: ${({ theme }) => theme.nColors.skyBlue};
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

const Game = ({ score, setScore, onChangeStep, data, MAX_ROUND, MAX_TIME }) => {
    const [openedResult, setOpenedResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null); // [D] 정답 여부
    const [isRunning, setIsRunning] = useState(false); // [D] 게임 진행 여부
    const [quizList, setQuizList] = useState(null); // [D] 퀴즈배열 
    const [quiz, setQuiz] = useState(null); // [D] 현재퀴즈
    const [example, setExample] = useState(null); // [D] 보기
    const [round, setRound] = useState(null);

    useEffect(() => {
        if(!data) return;
        init();
    }, []);

    useEffect(() => {
        if(round === null) return;
        setGameQuest();
        setIsRunning(true);
    }, [quizList, round]); 

    const init = useCallback(() => {
        setQuizList(data);
        setRound(0);
    }, []);

    const setGameQuest = useCallback(() => {
        const q = quizList[round];
        const ex = (typeof q.example === 'string') ? JSON.parse(q.example) : q.example;
        const shuffleEx = shuffleArray(Object.values(ex));

        setQuiz(q);
        setExample(shuffleEx);
    }, [quizList, round]);

    const setNextRound = useCallback((isCorrect = false) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        setIsCorrect(isCorrect);
        setOpenedResult(true);
        setIsRunning(false);

        setTimeout(() => {
            setOpenedResult(false);
            
            if (round > MAX_ROUND || round >= (data.length - 1)) {
                setRound(null);
                onChangeStep(STEP_FINISH);
                return;
            }

            setRound(round + 1);
        }, 1000);
    }, [round, score]);

    const onClickExample = useCallback(isCorrect => {
        if (openedResult) return;

        setNextRound(isCorrect);
    }, [round, openedResult]);

    return (
        <Frame>
            <Inner>
                {quiz && (
                    <Content>
                        <QuizArea>
                            <Question>
                                {`Q.${round + 1} ${quiz.question}`}
                            </Question>
                        </QuizArea>

                        <TimerArea>
                            <Timer 
                                MAX_TIME={MAX_TIME}
                                isRunning={isRunning}
                                openedResult={openedResult}
                                setNext={setNextRound}
                            />
                        </TimerArea>

                        <AnswerArea>
                            {example && example.map(({ question, answer, isCorrect }, i) => (
                                <Items key={`Q_${i}_${question}`}>
                                    <button 
                                        onClick={(() => onClickExample(isCorrect))}
                                        disabled={openedResult}
                                    >
                                        {answer}
                                    </button>
                                </Items>
                            ))}
                        </AnswerArea>
                    </Content>
                )}     

                {openedResult && (
                    <Result>
                        <Message isCorrect={isCorrect}> 
                            {isCorrect ? <CheckOutlined /> : <CloseOutlined />}
                        </Message>
                    </Result>
                )}
            </Inner>
        </Frame>
    );
};

Game.propTypes = {
    MAX_ROUND: PropTypes.number.isRequired, 
    MAX_TIME: PropTypes.number.isRequired, 
    data: PropTypes.array.isRequired, 
    score: PropTypes.number.isRequired,  
    setScore: PropTypes.func.isRequired,
    onChangeStep: PropTypes.func.isRequired,
};

export default Game;