import React, { useEffect, useState, useCallback, createRef, useRef } from 'react';
import { useSelector } from 'react-redux';
import { shuffleArray, cloneObject } from '../index';

import styled, { css, keyframes } from 'styled-components';
import { ArrowLeftOutlined, ClockCircleOutlined, ConsoleSqlOutlined, DeleteOutlined } from '@ant-design/icons';
import useInput from '../../../../hooks/useInput';

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
    height: calc(100% - 31px);
`;

const OutputArea = styled.div`
    position: relative;

    &:after {
        content: '';
        display: block;
        clear: both;
    }
`;

const TimerWrap = styled.div`
    padding: 10px 0;
    text-align: center;
`;

const TimerIcon = styled(ClockCircleOutlined)`
    color: #ffbf2e;
    font-size: 18px;
    margin-right: 5px;
    line-height: 1;
    vertical-align: middle;
`;

const TimerInner = styled.div`
    display: inline-block;
    width: 400px;
`;

const TimerBar = styled.div`
    display: inline-block;
    height: 10px;
    width: 100%;
    text-align: center;
    border-radius: 0 3px 3px 0;
    background: none;
    overflow: hidden;

    &:after {
        content: '';
        display: block;
        width: ${props => props.progress}%;
        height: 100%;
        border-radius: 0 3px 3px 0;
        background: #ffbf2e;
    }
`;

const Container = styled.div`
    position: relative;
    float: left;
    width: 100%;
    height: 300px;
    border-radius: 10px;
    background: #fffff4;
`;  

const InputBox = styled.div`
    text-align: center;
    font-size: 30px;
    color: #666;

    span {
        display: inline-block;
        width: 50px;
        height: 50px;
        vertical-align: top;
        border-radius: 5px;
        background: #fffff4;
        box-shadow: 2px 2px 3px rgb(0 0 0);
        cursor: default;

        & + span {
            margin-left: 5px;
        }
    }
`;

const QuizBoard = styled.div`
    width: 100%;
    height: 100%;
    background: url(${props => props.bg})no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
`;

const Round = styled.span`
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: inline-block;
    font-size: 20px;
    line-height: 1;
    color: #666;
    1px 1px 1px rgb(0 0 0 / 50%)
`;

const Score = styled.span`
    position: absolute;
    right: 0;
    bottom: -20px;
    display: inline-block;
    font-size: 18px;
    line-height: 1;
`;

const InputArea = styled.div`
    > div {
        margin-top: 15px;
    }
`;

const initialLetterStyle = css`
    padding: 0;
    display: inline-block;
    font-size: 20px;
    color: #666;
    background: #fff;
    border: none;
    border-radius: 3px;
    outline: none;
    cursor: pointer;

    &[disabled] {
        cursor: default;
    }
`;

const ExampleArea = styled.div` 
    display: inline-block;
    width: 85%;
    
    button {
        ${initialLetterStyle}
        width: 16%;

        & + button {
            margin-left: 0.5%;
        }

        &:nth-child(7n) {
            margin-left: 0;
        }

        &:nth-child(n + 6) { 
            margin-top: 0.5%;
        }

        &.active {
            background: #ffbf2e;
            color: #ffbf2e;
            box-shadow: inset 2px 3px 5px rgba(0, 0, 0, 0.5);
        }
    }
`;

const RemoveButtons = styled.div`
    display: inline-block;
    width: 14%;

    button {
        ${initialLetterStyle}
        width: 100%;
        background: #ffbf2e;

        & + button {
            margin-top: 3%;
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

const Game = ({
    score, 
    setScore,
    MAX_ROUND,
    MAX_TIME,
    data,
    onChangeStep,
}) => {
    const [userAnswer, onChangeUserAnswer, setUserAnswer] = useInput('');
    const [openedResult, setOpenedResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null); // [D] 정답여부
    const [correctWord, setCorrectWord] = useState(''); // [D] 정답단어

    const [quizList, setQuizList] = useState(null); // [D] 퀴즈배열 
    const [quiz, setQuiz] = useState(null); // [D] 현재퀴즈
    const [example, setExample] = useState(null); // [D] 보기
    const [round, setRound] = useState(null);
    const [time, setTime] = useState(null);

    const [examRef, setExamRef] = useState([]);
    const userAnswerInputRef = useRef(null);

    useEffect(() => {
        if (data.length < 1) return;

        setQuizList(data);
        setRound(0);
        setScore(0);
        setTime(MAX_TIME);
    }, []);

    useEffect(() => {
        if (round === null || !quizList) return;

        const currentQuiz = quizList[round];
        let { correct, incorrect } = currentQuiz;
        incorrect = (typeof incorrect === 'string') ? JSON.parse(incorrect) : incorrect;
        const example = correct.split('').concat(incorrect).slice(0, 12);
        const shuffleExample = shuffleArray(example).map((v) => v[0]);

        setQuiz(currentQuiz);
        setCorrectWord(correct);
        setExample(shuffleExample);
        setTime(MAX_TIME);
    }, [quizList, round]);

    useEffect(() => {
        if(!example) return;

        setExamRef(examRef => (
            Array(example.length).fill().map((_, i) => examRef[i] || createRef())
        ));
    }, [example]);

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

    useEffect(() => {
        if (correctWord === '') return;
        if (correctWord.length !== userAnswer.length) return;

        moveNextRound({ 
            scoreUp: (correctWord === userAnswer) ? true : false 
        });   
    }, [correctWord, userAnswer]);

    const reset = useCallback(() => {
        examRef.forEach((v) => {
            const target = v.current;

            if (target.classList.contains('active')) {
                target.classList.remove('active');
                target.disabled = false;
            }
        });

        setUserAnswer('');
    }, [examRef]);

    const onClickAllRemove = useCallback(() => reset(), [examRef, userAnswer])
    const onClickRemove = useCallback(() => {
        if (userAnswer.trim() === '') return;
        const length = userAnswer.length - 1;
        const lastVal = userAnswer.charAt(length);
        
        examRef.forEach((v) => {
            const target = v.current;

            if (target.classList.contains('active') && target.value === lastVal) {
                target.classList.remove('active');
                target.disabled = false;
            }
        });

        setUserAnswer(userAnswer.substr(0, length));
    }, [userAnswer, examRef]);

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
            reset();
        }, 1000);
    }, [round, examRef]);

    const onClickExample = useCallback(({ target }) => {
        const currentVal = userAnswer + target.value;
        target.classList.add('active');
        target.disabled = true;
        
        setUserAnswer(currentVal);
    }, [correctWord, userAnswer]);

    return (
        <Wrap>
            <OutputArea>
                <TimerWrap>
                    <TimerIcon />
                    <TimerInner>
                        <TimerBar 
                            progress={(time / MAX_TIME) * 100}
                        />
                    </TimerInner>
                </TimerWrap>

                <Container>                    
                    {quiz && (
                        <QuizBoard bg={quiz.question}/>
                    )}

                    <Round>Round {round + 1}</Round>

                    <Score>Score {score}</Score>
                </Container>
            </OutputArea>

            <InputArea>
                <InputBox>
                    <input 
                        type="hidden"
                        ref={userAnswerInputRef}  
                        value={userAnswer} 
                        onChange={onChangeUserAnswer}
                    />

                    {correctWord && correctWord.split('').map((v, i) => {
                        return (
                            <span key={`submit_word_${i}`}>
                                {userAnswer.split('')[i]}
                            </span>
                        )
                    })}
                </InputBox>

                <div>
                    <ExampleArea>
                        {example && example.map((v, i) => (
                            <button 
                                key={`example_${v}`}
                                value={v}
                                onClick={onClickExample}
                                ref={examRef[i]}
                                disabled={openedResult}
                            > 
                                {v}
                            </button>
                        ))}
                    </ExampleArea>
                    
                    <RemoveButtons>
                        <button
                            onClick={onClickRemove}
                            disabled={openedResult}
                        >
                            <ArrowLeftOutlined style={{ color: '#666' }} />
                            <span className="hidden">한글자 지우기</span>
                        </button>

                        <button
                            onClick={onClickAllRemove}
                            disabled={openedResult}
                        >
                            <DeleteOutlined style={{ color: '#666' }} />
                            <span className="hidden">전체 지우기</span>
                        </button>
                    </RemoveButtons>
                </div>
            </InputArea>

            {openedResult && (
                <ResultModal>
                    <ResultMessage isCorrect={isCorrect}>
                        {isCorrect ? '정답' : '오답'}
                    </ResultMessage>
                </ResultModal>
            )}
        </Wrap>
    );
};

export default Game;

// TODO: hint 추가 - 원하는 곳의 한글자 보기?