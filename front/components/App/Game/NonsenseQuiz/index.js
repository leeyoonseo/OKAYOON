import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { HomeOutlined, LeftOutlined } from '@ant-design/icons';
import { STORE, LOAD_GAME_REQUEST, NONSENSE_QUIZ } from '../../../../reducers/game';

import Main from './Main';
import Guide from './Guide';
import Game from './Game';
import Finish from './Finish';

// export const GAME_ID = 'game_nonsense';
export const STEP_MAIN = 'main';
export const STEP_GUIDE = 'guide';
export const STEP_GAME = 'game';
export const STEP_FINISH = 'finish';

const initButtonStyled = css`
    padding: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

const HomeButton = styled.button`
    ${initButtonStyled}
`;

const MainButton = styled.button`
    position: absolute;
    left: 20px;
    top: 3px;
    padding: 0;
    line-height: 1;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

const NonsenseQuiz = ({ onClickHome }) => {
    const dispatch = useDispatch();
    const { gameData } = useSelector((state) => state.game);
    const [step, setStep] = useState(STEP_MAIN);
    const [score, setScore] = useState(0);
    const MAX_ROUND = 20;
    const MAX_TIMER = 500; // [D] 1000 = 1초

    useEffect(() => {
        dispatch({
            type: LOAD_GAME_REQUEST,
            data: NONSENSE_QUIZ
        });
    }, []);

    const onChangeStep = useCallback((changeStep) => () => setStep(changeStep), []);
    
    return (
        <>
            <HomeButton onClick={onClickHome(STORE)}>
                <HomeOutlined />
                <span className="hidden">메뉴 바로가기</span>
            </HomeButton>

            {step !== STEP_MAIN && (
                <MainButton onClick={onChangeStep(STEP_MAIN)}>
                    <LeftOutlined />
                    <span className="hidden">이전 상태로 가기</span>
                </MainButton>
            )}

            {(() => {
                if (step === STEP_MAIN) {
                    return (
                        <Main 
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
                            MAX_TIMER={MAX_TIMER}
                            gameData={gameData}
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