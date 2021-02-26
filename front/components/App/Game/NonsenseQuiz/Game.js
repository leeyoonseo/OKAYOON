import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import dayjs from 'dayjs';

import { RightOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { STEP_FINISH } from './index';

const resultFadeIn = keyframes`
    0% {
        font-size: 10px;
    }
    100% {
        font-size: 60px;
    }
`;

const Wrap = styled.div`
    position: relative;        
    display: flex;
    height: calc(100% - 31px);
    align-items: center;
    justify-content: center;
`;

const Inner = styled.div`
    display: inline-block;
    max-width: 400px;
`;

const QuizArea = styled.div`
    span {
        display: block;
        text-align: center;
    }
`;

const Round = styled.span`
    font-size: 36px;
    color: skyblue;
`;

const Question = styled.span`
    font-size: 28px;
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
    }
`;

const Result = styled.span`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 60px;    
    color: ${props => props.isCorrect ? '#26ca3f' : '#ff6059'};
    transform: translate(-50%, -50%);
    text-shadow: 1px 1px 5px rgb(0 0 0);
    animation: ${resultFadeIn} 0.1s linear ;
`;

const PassButton = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    
    padding: 5px;
    line-height: 1;
    border: 1px solid #fff;
    outline: none;
    background: none;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;
const Game = ({ onChangeStep }) => {
    const { nonsenseQuiz } = useSelector((state) => state.game);
    const [openedResult, setOpenedResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);

    const [quizList, setQuizList] = useState(null); // [D] 퀴즈배열 
    const [quiz, setQuiz] = useState(null); // [D] 현재퀴즈
    const [example, setExample] = useState(null); // [D] 보기
    const [round, setRound] = useState(null);
    const [time, setTime] = useState(null);
    const [score, setScore] = useState(0);

    const MAX_ROUND = 20;
    const MAX_TIMER = 500;

    useEffect(() => {
        const list = shuffleArray(nonsenseQuiz); 

        setQuizList(list);
        setRound(0);
    }, []);

    useEffect(() => {
        if(round === null || !quizList) return;
        const q = quizList[round];
        const ex = shuffleArray(Object.values(q.example));

        setQuiz(q);
        setExample(ex);
        setTime(MAX_TIMER);
    }, [quizList, round]); 

    useEffect(() => {
        if (time === 0) {
            clearInterval(timer);
            onClickExample(false)();
            return;
        };

        const timer = setInterval(() => {
            setTime(time - 10);
        }, 100);

        return () => {
            clearInterval(timer);
        }
    }, [time]); 
    
    const setNextRound = useCallback((state) => {
        if (state) setScore(score + 1);

        setIsCorrect(state);
        setOpenedResult(true);

        setTimeout(() => {
            setOpenedResult(false);
            
            if (round > MAX_ROUND || round >= (nonsenseQuiz.length - 1)) {
                setRound(null);
                onChangeStep(STEP_FINISH)();
                return;
            }

            setRound(round + 1);
            setTime(MAX_TIMER);
        }, 500);
    }, [round]);

    const onClickExample = useCallback((state) => () => {
        setNextRound(state);
    }, [round]);

    const onClickPass = useCallback(() => {
        setNextRound(false);
    }, [round]);

    return (
        <Wrap>
            <Inner>
                {quiz && (
                    <>
                        <QuizArea>
                            <Round>{`Q. ${round + 1}`}</Round>
                            <Question>{quiz.question}</Question>
                        </QuizArea>

                        <Timer>
                            <TimerIcon /> <TimerTime>{Math.floor(time / 100)}</TimerTime>
                        </Timer>

                        <AnswerArea>
                            {example && example.map((v, i) => {
                                if (v.isCorrect) {
                                    return (
                                        <Items key={`Q_${i}_${v.question}`}>
                                            <button onClick={onClickExample(true)}>
                                                {v.answer}
                                            </button>
                                        </Items>
                                    )
                                } 
                                
                                return (
                                    <Items key={`Q_${i}_${v.question}`}>
                                        <button onClick={onClickExample(false)}>
                                            {v.answer}
                                        </button>
                                    </Items>
                                )
                            })}
                        </AnswerArea>
                    </>
                )}                

                {openedResult && (
                    <Result isCorrect={isCorrect}>
                        {isCorrect ? '정답' : '오답'}
                    </Result>
                )}
            </Inner>

            <PassButton onClick={onClickPass}>
                통과 <RightOutlined />
            </PassButton>
        </Wrap>
    );
};

function shuffleArray (arr){
    let temp = arr.map((v) => {
        return cloneObject(v);
    });

    for(let i = temp.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }

    return temp;
};

function cloneObject(obj) {
    let clone = {};

    for (var key in obj) {
        if (typeof obj[key] == 'object' && obj[key] != null) {
            clone[key] = cloneObject(obj[key]);
        } else {
            clone[key] = obj[key];
        }
    }

    return clone;
}

export default Game;