import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import { RightOutlined } from '@ant-design/icons';

import { STEP_FINISH } from './index';
import Progress from '../Progress';

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

    > div + div {
        margin-top: 40px;
    }
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
    color: ${props => props.resultStr === 'correct' ? '#26ca3f' : '#ff6059'};
    transform: translate(-50%, -50%);
    text-shadow: 1px 1px 5px rgb(0 0 0);
    animation: ${resultFadeIn} 0.1s linear ;
`;

const Timer = styled.div`
    width: 400px;
    border: 1px solid #fff; 
    box-sizing: border-box;
    overflow: hidden;
`;

// const Progress = styled.span`
//     display: block;
//     width: ${props => props.time * 100}%;
//     height: 15px;
//     background: #fff;
// `;

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
    const [resultStr, setResultStr] = useState(null);

    const [quizList, setQuizList] = useState(null); // [D] 퀴즈배열 
    const [quiz, setQuiz] = useState(null); // [D] 현재퀴즈
    const [example, setExample] = useState(null); // [D] 보기
    const [round, setRound] = useState(null);
    const [time, setTime] = useState(null);

    const CORRECT = 'correct';
    const INCORRECT = 'incorrect';
    const MAX_ROUND = 20;
    const QUIZ_TIME = 10;

    useEffect(() => {
        // 배열을 섞는다. 그리고 여기서 q를 찾아 또 섰는다.
        const list = shuffleArray(nonsenseQuiz); // 이게 qlist

        setQuizList(list);
        setRound(1);
        // setQuestion(list);
    }, []);

    useEffect(() => {
        if(!round || !quizList) return;

        const q = quizList[round];
        const ex = shuffleArray(Object.values(q.example));

        setQuiz(q);
        setExample(ex);
        setTime(QUIZ_TIME);
    }, [quizList, round]); 

    useEffect(() => {
        if (!time) return; 

        const timer = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, [time]); 
    
    // TODO: 결과 보여주기, 시간 초기화, 다음 라운드로가기, 
    const onClickExam = useCallback((resultStr) => () => {
        setResultStr(resultStr);
        setOpenedResult(true);
        setTimeout(() => onClickNextRound(), 500);
    }, [round]);

    const onClickNextRound = useCallback(() => {
        setOpenedResult(false);

        const roundIdx = (round - 1);
        if (roundIdx === MAX_ROUND || roundIdx === (nonsenseQuiz.length - 1)) {
            // TODO: 종료 처리
            alert('라운드 종료');  
            return onChangeStep(STEP_FINISH)();  
        }

        setTime(QUIZ_TIME);
        setRound(round + 1);
    }, [round]);

    return (
        <Wrap>
            <Inner>
                {quiz && (
                    <>
                        <QuizArea>
                            <Round>{`Q. ${round}`}</Round>
                            <Question>{quiz.question}</Question>
                        </QuizArea>

                        <AnswerArea>
                            {example && example.map((v, i) => {
                                if (v.isCorrect) {
                                    return (
                                        <Items key={`Q_${i}_${v.question}`}>
                                            <button onClick={onClickExam(CORRECT)}>
                                                {v.answer}
                                            </button>
                                        </Items>
                                    )
                                } 
                                
                                return (
                                    <Items key={`Q_${i}_${v.question}`}>
                                        <button onClick={onClickExam(INCORRECT)}>
                                            {v.answer}
                                        </button>
                                    </Items>
                                )
                            })}
                        </AnswerArea>

                        <Progress time={time}/>

                        {/* <Timer>
                            <Progress time={time}>
                                타임: {time}
                            </Progress>
                        </Timer> */}
                    </>
                )}                

                {openedResult && (
                    <Result resultStr={resultStr}>
                        {resultStr === CORRECT ? '정답' : '오답'}
                    </Result>
                )}
            </Inner>

            <PassButton onClick={onClickNextRound}>
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