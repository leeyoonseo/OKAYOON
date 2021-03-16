import React, { useEffect, useState, useCallback, createRef, useRef } from 'react';
import { useSelector } from 'react-redux';
import { shuffleArray, cloneObject } from '../index';

import styled, { css, keyframes } from 'styled-components';
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import useInput from '../../../../hooks/useInput';

import { STEP_FINISH } from './index';
import Layout from './Layout';

const resultFadeIn = keyframes`
    0% {
        font-size: ${({ theme }) => theme.calcRem(10)};
    }
    100% {
        font-size: ${({ theme }) => theme.calcRem(60)};
    }
`;

const Inner = styled.div`
    width: 100%;
    height: 100%:
`;

const OutputArea = styled.div`
    position: relative;

    & > div + div {
        margin-top: ${({ theme }) => theme.calcRem(15)};
    }

    &:after {
        display: block;
        content: '';
        clear: both;
    }
`;

const Round = styled.div`
    position: relative;
    display: block;
    font-size: ${({ theme }) => theme.calcRem(25)};
    line-height: 1;
    text-shadow: ${({ theme }) => theme.calcRem(2)} ${({ theme }) => theme.calcRem(2)} ${({ theme }) => theme.calcRem(2)} white;
    color: ${({ theme }) => theme.cColors.red};
`;

const TimerWrap = styled.div`
    text-align: center;
    line-height: 1;
`;

const TimerInner = styled.div`
    display: inline-block;
    width: ${({ theme }) => theme.calcRem(400)};
`;

const TimerBar = styled.div`
    display: inline-block;
    width: 100%;
    height: ${({ theme }) => theme.calcRem(10)};
    text-align: center;
    border-radius: ${({ theme }) => theme.calcRem(3)};
    background: none;
    overflow: hidden;

    &:after {
        display: block;
        content: '';
        width: ${({ progress }) => progress}%;
        height: 100%;
        border-radius: ${({ theme }) => theme.calcRem(3)};
        background: ${({ progress }) => progress <= 30 ? '#eb6b66' : '#f5b36e'};
    }
`;

const Container = styled.div`
    position: relative;
    float: left;
    width: 100%;
    height: ${({ theme }) => theme.calcRem(300)};
    border-radius: ${({ theme }) => theme.calcRem(10)};
`;  

const InputBox = styled.div`
    font-size: ${({ theme }) => theme.calcRem(30)};
    text-align: center;
    color: ${({ theme }) => theme.cColors.black};

    span {
        display: inline-block;
        width: ${({ theme }) => theme.calcRem(50)};
        height: ${({ theme }) => theme.calcRem(50)};
        vertical-align: top;
        border-radius: ${({ theme }) => theme.calcRem(5)};
        background: ${({ theme }) => theme.cColors.ivory};
        border: ${({ theme }) => theme.calcRem(2)} solid ${({ theme }) => theme.cColors.black};
        box-shadow: inset 1px 1px ${({ theme }) => theme.calcRem(3)} ${({ theme }) => theme.colors.rgbaBlack}
        cursor: default;

        & + span {
            margin-left: ${({ theme }) => theme.calcRem(5)};
        }

        &.active {
            box-shadow: none;
        }
    }
`;

const QuizBoard = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
        max-height: 100%;
    }
`;

const Score = styled.span`
    position: absolute;
    right: 0;
    bottom: -${({ theme }) => theme.calcRem(20)};
    display: inline-block;
    font-size: ${({ theme }) => theme.calcRem(18)};
    line-height: 1;
    color: ${({ theme }) => theme.cColors.black};
`;

const InputArea = styled.div`
    & > div {
        margin-top: ${({ theme }) => theme.calcRem(15)};
    }
`;

const initialLetterStyle = css`
    padding: 0;
    display: inline-block;
    font-size: ${({ theme }) => theme.calcRem(20)};
    color: ${({ theme }) => theme.cColors.black};
    background: white;
    border: none;
    border-radius: ${({ theme }) => theme.calcRem(3)};;
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
        border: ${({ theme }) => theme.calcRem(2)} solid ${({ theme }) => theme.cColors.black};

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
            background: ${({ theme }) => theme.cColors.orange};
            color: ${({ theme }) => theme.cColors.orange};
            box-shadow: inset ${({ theme }) => theme.calcRem(2)} ${({ theme }) => theme.calcRem(3)} ${({ theme }) => theme.calcRem(5)} ${({ theme }) => theme.colors.rgbaBlack};
        }
    }
`;

const RemoveButtons = styled.div`
    display: inline-block;
    width: 14%;

    button {
        ${initialLetterStyle}
        width: 100%;
        background: ${({ theme }) => theme.cColors.orange};
        border: ${({ theme }) => theme.calcRem(2)} solid ${({ theme }) => theme.cColors.black};

        & + button {
            margin-top: 3%;
        }
    }
`;

const ResultModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${({ theme }) => theme.calcRem(200)};
    height: ${({ theme }) => theme.calcRem(200)};
    line-height: 1;
    transform: translate(-50%, -50%);
    animation: ${resultFadeIn} 0.1s linear ;
`;

const Result = styled.div`
    width: 100%;
    height: 100%;
    font-size: ${({ theme }) => theme.calcRem(200)};   
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
        // if (time === null) return;

        // if (openedResult) {
        //     return clearInterval(timer);
        // }

        // // [D] 시간제한 실패
        // if (time === 0) {
        //     clearInterval(timer);
        //     moveNextRound({ scoreUp: false });  
        //     return;
        // };

        // const timer = setInterval(() => {
        //     setTime(time - 10);
        // }, 100);

        // return () => {
        //     clearInterval(timer);
        // }
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
            setRound(round + 1);

            console.log('round', round);
            console.log('MAX_ROUND', MAX_ROUND);
            
            if (round >= MAX_ROUND || round >= (data.length - 1)) {
                setRound(null);
                onChangeStep(STEP_FINISH)();
                return;
            }

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
        <Layout>
            <Inner>
                <OutputArea>
                    <Round>Round {round + 1}</Round>

                    <TimerWrap>
                        <TimerInner>
                            <TimerBar 
                                progress={(time / MAX_TIME) * 100}
                            />
                        </TimerInner>
                    </TimerWrap>

                    <Container>                    
                        {quiz && (
                            <QuizBoard>
                                <img src={quiz.question} />
                            </QuizBoard>
                        )}
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

                        {correctWord && Array(correctWord.length).fill().map((_, i) => {
                            return (
                                <span 
                                    key={`${correctWord}_word_${i}`}
                                    className={userAnswer.split('')[i] ? 'active' : ''}
                                >
                                    {userAnswer.split('')[i]}
                                </span>
                            )
                        })}
                    </InputBox>

                    <div>
                        <ExampleArea>
                            {example && example.map((v, i) => (
                                <button 
                                    key={`example_${v}_${i}`}
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
                        <Result isCorrect={isCorrect}>
                            {isCorrect ? <CheckOutlined /> : <CloseOutlined />}
                        </Result>
                    </ResultModal>
                )}
            </Inner>
        </Layout>
    );
};

export default Game;

// TODO: hint 추가 - 원하는 곳의 한글자 보기?