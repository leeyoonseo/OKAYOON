import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { HomeOutlined, LeftOutlined } from '@ant-design/icons';
import { STORE, LOAD_GAME_REQUEST, NONSENSE_QUIZ } from '../../../../reducers/game';

import Main from './Main';
import Guide from './Guide';
import Game from './Game';
import Finish from './Finish';

export const STEP_MAIN = 'main';
export const STEP_GUIDE = 'guide';
export const STEP_GAME = 'game';
export const STEP_FINISH = 'finish';

// [D] dev
const devData = [
    {
        question: '타이타닉의 구명 보트에는 몇 명이 탈수 있을까?',
        example: [{
            isCorrect: true,
            answer: '9명',
        },{
            isCorrect: false,
            answer: '6명'
        },{
            isCorrect: false,
            answer: '제로'
        },{
            isCorrect: false,
            answer: '몇'
        }],
        description: '9명(구명 보트)',
    },
    {
        question: '고기 먹을 때마다 따라오는 개는?',
        example: [{
            isCorrect: true,
            answer: '이쑤시개',
        },{
            isCorrect: false,
            answer: '고개'
        },{
            isCorrect: false,
            answer: '배고픈 개'
        },{
            isCorrect: false,
            answer: '나의사랑스러운 뽀미'
        }],
        description: '항상 카운터에서 기다리고 있죠^^',
    },
    {
        question: '진짜 새의 이름은 무엇일까요?',
        example: [{
            isCorrect: true,
            answer: '참새',
        },{
            isCorrect: false,
            answer: 'bird'
        },{
            isCorrect: false,
            answer: '진짜 새나이'
        },{
            isCorrect: false,
            answer: '무명'
        }],
        description: '참: 사실이나 이치에 조금도 어긋남이 없는 것.',
    },
    {
        question: '젖소와 강아지가 싸우면 누가 이기는가?',
        example: [{
            isCorrect: true,
            answer: '강아지',
        },{
            isCorrect: false,
            answer: '젖소'
        },{
            isCorrect: false,
            answer: '비긴다'
        },{
            isCorrect: false,
            answer: '안싸운다'
        }],
        description: '강아지(젖소曰: "내가 졌소", 강아지曰: "나 강하지")',
    },
    {
        question: '눈치코치란?',
        example: [{
            isCorrect: true,
            answer: '눈 때리고 코 때리고',
        },{
            isCorrect: false,
            answer: '눈치를 강조하여 속되게 이르는 말'
        },{
            isCorrect: false,
            answer: '겨울에 눈이 오면 추워서 코 나옴'
        },{
            isCorrect: false,
            answer: '눈치를 알려주는 코치님'
        }],
        description: '눈(치고=때리고)코(치고=때리고)',
    },
    {
        question: '세상에서 제일 더러운 집은?',
        example: [{
            isCorrect: true,
            answer: '똥집',
        },{
            isCorrect: false,
            answer: '누나 집'
        },{
            isCorrect: false,
            answer: '청소어벤져스에 나오는 쓰레기 집'
        },{
            isCorrect: false,
            answer: '고집'
        }],
        description: '다른 집들이 똥집보다 더 더러울수도~~',
    },
];

const iconColor = css`
    color: ${({ theme }) => theme.colors.purple};
    font-size: ${({ theme }) => theme.calcRem(16)};
`;

const TopNav = styled.div`
    position: relative;
    height: 30px;
`;

const HomeButton = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

const MainButton = styled.button`
    position: absolute;
    top: 0;
    left: 5px;
    padding: 0;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    transform: translateX(100%);

    &:hover {
        opacity: 0.5;
    }
`;

const HomeIcon = styled(HomeOutlined)`
    ${iconColor}
`;

const MainIcon = styled(LeftOutlined)`
    ${iconColor}
`;

const NonsenseQuiz = ({ onClickHome }) => {
    const dispatch = useDispatch();
    // const { gameData } = useSelector((state) => state.game);
    const gameData = devData;
    const [step, setStep] = useState(STEP_FINISH); // [D] STEP_MAIN이 default임
    const [score, setScore] = useState(0);
    const MAX_ROUND = 20;
    const MAX_TIME = 500; // [D] 1000 = 1초

    useEffect(() => {
        // dispatch({
        //     type: LOAD_GAME_REQUEST,
        //     data: NONSENSE_QUIZ
        // });
    }, []);

    const onChangeStep = useCallback((changeStep) => () => setStep(changeStep), []);
    
    return (
        <>  
            <TopNav>
                <HomeButton onClick={onClickHome(STORE)}>
                    <HomeIcon />
                    <span className="hidden">메뉴 바로가기</span>
                </HomeButton>

                {step !== STEP_MAIN && (
                    <MainButton onClick={onChangeStep(STEP_MAIN)}>
                        <MainIcon />
                        <span className="hidden">이전 상태로 가기</span>
                    </MainButton>
                )}
            </TopNav>

            {(() => {
                if (step === STEP_MAIN) {
                    return (
                        <Main 
                            data={gameData}
                            onChangeStep={onChangeStep}
                        />
                    )
                } else if (step === STEP_GUIDE) {
                    return (
                        <Guide  
                            onChangeStep={onChangeStep}
                        />
                    )
                } else if (step === STEP_GAME) {
                    return (
                        <Game 
                            score={score}
                            setScore={setScore}
                            MAX_ROUND={MAX_ROUND}
                            MAX_TIME={MAX_TIME}
                            data={gameData}
                            onChangeStep={onChangeStep}
                        />
                    )
                } else if (step === STEP_FINISH) {
                    return (
                        <Finish 
                            score={score}
                            MAX_ROUND={MAX_ROUND}
                            onChangeStep={onChangeStep}
                        />
                    )
                }
            })()}
        </>
    );
};

export default NonsenseQuiz;