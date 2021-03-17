import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { HomeOutlined, LeftOutlined } from '@ant-design/icons';
import { STORE, LOAD_GAME_REQUEST, NONSENSE_QUIZ } from '../../../../reducers/game';

import Main from './Main';
import Game from './Game';
import Finish from './Finish';

export const STEP_MAIN = 'main';
export const STEP_GAME = 'game';
export const STEP_FINISH = 'finish';

const iconColor = css`
    color: ${({ theme }) => theme.colors.purple};
    font-size: ${({ theme }) => theme.calcRem(16)};
`;

const TopNav = styled.div`
    position: relative;
    height: ${({ theme }) => theme.calcRem(30)};
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
    left: ${({ theme }) => theme.calcRem(5)};
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
    const { nonsenseData } = useSelector((state) => state.game);
    const [gameData, setGameData] = useState(null);
    const [step, setStep] = useState(STEP_MAIN); // [D] default = STEP_MAIN
    const [score, setScore] = useState(0);
    const MAX_ROUND = 10;
    const MAX_TIME = 1000; // [D] 1000 = 1초

    useEffect(() => {
        if (nonsenseData.length >= 1) return;

        dispatch({
            type: LOAD_GAME_REQUEST,
            data: NONSENSE_QUIZ
        });
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
                            data={nonsenseData}
                            setGameData={setGameData}
                            onChangeStep={onChangeStep}
                        />
                    )
                } else if (step === STEP_GAME) {
                    if (!gameData) return;
                    
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