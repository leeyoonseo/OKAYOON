import React, { useCallback, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { RightOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { STEP_FINISH } from './index';
import { shuffleArray, cloneObject } from '../index';

import { Wrap } from './style';

const resultFadeIn = keyframes`
    0% {
        font-size: 10px;
    }
    100% {
        font-size: 60px;
    }
`;

const Inner = styled.div`
    display: inline-block;
    // max-width: 400px;
`;

const QuizArea = styled.div`
    span {
        display: block;
        text-align: center;
    }
`;

const Round = styled.span`
    font-size: 70px;
    line-height: 1;
    color: ${({ theme }) => theme.nonsenseColors.orange};
`;

const Question = styled.span`
    margin-top: 10px;
    font-size: 35px;
    line-height: 1.25;
    color: ${({ theme }) => theme.nonsenseColors.orange};
`;

const Timer = styled.div`
    margin: 15px 0;
    text-align: center;
`;

const TimerIcon = styled(ClockCircleOutlined)`
    margin-right: 5px;
    font-size: 15px;
`;

const TimerTime = styled.span`
    font-size: 18px;
`;


const AnswerArea = styled.div`
    min-width: 300px;

    &:after {
        display: block;
        content: '';
        clear: both;
    }
`;

const Items = styled.div`
    width: 50%;
    float: left;
    height: 100px;

    button {
        padding: 10%;
        width: 100%;
        height: 100%;
        font-size: 18px;
        border: 1px solid #fff;
        outline: none;
        background: none;
        box-sizing: border-box;
        cursor: pointer;

        &[disabled] {
            cursor: default;
        }
    }
`;

const ResultModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 10px 20px;
    line-height: 1;
    text-align: center;
    background: #fff;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    animation: ${resultFadeIn} 0.1s linear ;
`;

const ResultMessage = styled.span`
    font-size: 60px;    
    color: ${props => props.isCorrect ? '#26ca3f' : '#ff6059'};
`;

const Description = styled.div`
    margin-top: 10px;
    font-size: 20px;
    color: #333;
`;

const PassButton = styled.button`
    position: absolute;
    bottom: 0;
    right: 0;
    
    padding: 0;
    line-height: 1;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    &[disabled] {
        cursor: default;
    }
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
        // if (time === 0) {
        //     clearInterval(timer);
        //     onClickExample(false)();
        //     return;
        // };

        // const timer = setInterval(() => {
        //     setTime(time - 10);
        // }, 100);

        // return () => {
        //     clearInterval(timer);
        // }
    }, [time]); 
    
    const moveNextRound = useCallback(({ scoreUp }) => {
        if (scoreUp) {
            setScore(score + 1);
        }

        setIsCorrect(scoreUp);
        setOpenedResult(true);

        setTimeout(() => {
            setOpenedResult(false);
            
            if (round > MAX_ROUND || round >= (gameData.length - 1)) {
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

    const onClickPass = useCallback(() => {
        if (openedResult) return;

        moveNextRound({ scoreUp: false });
    }, [round, openedResult]);

    return (
        <Wrap>
            <Inner>
                {quiz && (
                    <>
                        <img src="../../game/nonsense/icon_ask.png" alt="QnA 아이콘" />

                        <QuizArea>
                            <Round>{`Q. ${round + 1}`}</Round>
                            <Question>{quiz.question}</Question>
                        </QuizArea>

                        <Timer>
                            <TimerIcon /> <TimerTime>{Math.floor(time / 100)}</TimerTime>
                        </Timer>

                        <AnswerArea>
                            {example && example.map((v, i) => {
                                return (
                                    <Items key={`Q_${i}_${v.question}`}>
                                        <button 
                                            onClick={onClickExample(v.isCorrect)}
                                            disabled={openedResult}
                                        >
                                            {v.answer}
                                        </button>
                                    </Items>
                                )
                            })}
                        </AnswerArea>
                    </>
                )}                

                {openedResult && (
                    <ResultModal>
                        <ResultMessage isCorrect={isCorrect}>
                            {isCorrect ? '정답' : '오답'}
                        </ResultMessage>

                        <Description>
                            "{quiz && quiz.description}"
                        </Description>
                    </ResultModal>
                )}
            </Inner>

            <PassButton 
                onClick={onClickPass}
                disabled={openedResult}
            >
                통과 <RightOutlined />
            </PassButton>
        </Wrap>
    );
};

export default Game;