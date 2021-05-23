import React, { useEffect, useState, useCallback, createRef, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { shuffleArray } from '../../../../../util/common';
import styled, { keyframes } from 'styled-components';
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import useInput from '../../../../../hooks/useInput';
import { STEP_FINISH } from './index';
import Frame from '../Module/Frame';
import Timer from '../Module/Timer';
import AnswerBox from '../Module/AnswerBox';
import ExampleBox from '../Module/ExampleBox';

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

const TimerArea = styled.div`
    text-align: center;
    line-height: 1;
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

const InputArea = styled.div`
    & > div {
        margin-top: ${({ theme }) => theme.calcRem(15)};
    }
`;

const ExampleArea = styled.div` 
    display: inline-block;
    width: 85%;
`;

const RemoveButtons = styled.div`
    display: inline-block;
    width: 14%;

    button {
        padding: 0;
        display: inline-block;
        width: 100%;
        font-size: ${({ theme }) => theme.calcRem(20)};
        color: ${({ theme }) => theme.cColors.black};
        background: ${({ theme }) => theme.cColors.orange};
        border: ${({ theme }) => theme.calcRem(2)} solid ${({ theme }) => theme.cColors.black};
        border-radius: ${({ theme }) => theme.calcRem(3)};;
        outline: none;
        cursor: pointer;
    
        &[disabled] {
            cursor: default;
        }

        & + button {
            margin-top: 3%;
        }

        span {
            color: ${({ theme }) => theme.cColors.black};
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
    color: ${({ isCorrect }) => isCorrect ? '#26ca3f' : '#ff6059'};
`;

const Game = ({ data, score, setScore, MAX_ROUND, MAX_TIME, onChangeStep }) => {
    const [userAnswer, onChangeUserAnswer, setUserAnswer] = useInput('');
    const [isRunning, setIsRunning] = useState(false); // [D] 게임 진행 여부

    const [openedResult, setOpenedResult] = useState(false); // [D] 결과창
    const [isCorrect, setIsCorrect] = useState(null); // [D] 정답여부
    const [correctWord, setCorrectWord] = useState(''); // [D] 정답단어

    const [quizList, setQuizList] = useState(null); // [D] 퀴즈배열 
    const [quiz, setQuiz] = useState(null); // [D] 현재퀴즈
    const [example, setExample] = useState(null); // [D] 보기
    const [round, setRound] = useState(null);

    const [examRef, setExamRef] = useState([]);
    const userAnswerInputRef = useRef(null);

    useEffect(() => {
        if (data.length < 1) return;
        init();
    }, []);

    useEffect(() => {
        if (round === null) return;
        setGameQuest();
    }, [quizList, round]);

    useEffect(() => {
        if(!example) return;
        setGameExample();
        setIsRunning(true);
    }, [example]);

    useEffect(() => {
        if (correctWord === '') return;
        if (correctWord.length !== userAnswer.length) return;
        
        setNextRound(
            (correctWord === userAnswer) ? true : false
        );   
    }, [correctWord, userAnswer]);

    const init = useCallback(() => {
        setQuizList(data);
        setRound(0);
    }, []);

    const setGameQuest = useCallback(() => {
        const currentQuiz = quizList[round];
        let { correct, incorrect } = currentQuiz;
        
        incorrect = (typeof incorrect === 'string') ? JSON.parse(incorrect) : incorrect;

        const example = correct.split('').concat(incorrect).slice(0, 12);
        const shuffleExample = shuffleArray(example).map(v => v[0]);

        setQuiz(currentQuiz);
        setCorrectWord(correct);
        setExample(shuffleExample);
    }, [quizList, round]);

    const setGameExample = useCallback(() => {
        setExamRef(examRef => (
            Array(example.length).fill().map((_, i) => examRef[i] || createRef())
        ));
    }, [example]);
    
    const resetExample = useCallback(() => {
        examRef.forEach(({ current }) => {
            if (current.classList.contains('active')) {
                current.classList.remove('active');
                current.disabled = false;
            }
        });

        setUserAnswer('');
    }, [examRef]);

    const onClickAllRemove = useCallback(() => {
        resetExample();
    }, [examRef, userAnswer]);

    const onClickRemove = useCallback(() => {
        if (userAnswer.trim() === '') return;

        const length = userAnswer.length - 1;
        const lastVal = userAnswer.charAt(length);
        
        examRef.forEach(({ current }) => {
            if (current.classList.contains('active') && current.value === lastVal) {
                current.classList.remove('active');
                current.disabled = false;
            }
        });

        setUserAnswer(userAnswer.substr(0, length));
    }, [userAnswer, examRef]);

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
            resetExample();
        }, 1000);
    }, [round, score, examRef]);

    const onClickExample = useCallback(({ target }) => {
        const currentVal = userAnswer + target.value;

        target.classList.add('active');
        target.disabled = true;
        
        setUserAnswer(currentVal);
    }, [correctWord, userAnswer]);

    return (
        <Frame>
            <Inner>
                <OutputArea>
                    <Round>Round {round + 1}</Round>
                    <TimerArea>
                        <Timer 
                            MAX_TIME={MAX_TIME}
                            isRunning={isRunning}
                            openedResult={openedResult}
                            setNext={setNextRound}
                        />
                    </TimerArea>

                    <Container>                    
                        {quiz && (
                            <QuizBoard>
                                <img src={quiz.question} />
                            </QuizBoard>
                        )}
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
                        <AnswerBox 
                            correctWord={correctWord}
                            userAnswer={userAnswer}
                        />
                    </InputBox>

                    <div>
                        <ExampleArea>
                            {example && (
                                <ExampleBox 
                                    example={example}
                                    examRef={examRef}
                                    openedResult={openedResult}
                                    onClickExample={onClickExample}
                                />
                            )}
                        </ExampleArea>
                        
                        <RemoveButtons>
                            <button
                                onClick={onClickRemove}
                                disabled={openedResult}
                            >
                                <ArrowLeftOutlined />
                                <span className="hidden">한글자 지우기</span>
                            </button>

                            <button
                                onClick={onClickAllRemove}
                                disabled={openedResult}
                            >
                                <DeleteOutlined />
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