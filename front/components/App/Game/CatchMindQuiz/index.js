import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { HomeOutlined, LeftOutlined } from '@ant-design/icons';

import Main from './Main';
import Guide from './Guide';
import Game from './Game';
import Finish from './Finish';
import { LOAD_GAME_REQUEST, CATCH_MIND, STORE } from '../../../../reducers/game';

export const STEP_MAIN = 'main';
export const STEP_GUIDE = 'guide';
export const STEP_GAME = 'game';
export const STEP_FINISH = 'finish';

const HomeButton = styled.button`
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

const CatchMindQuiz = ({ onClickHome }) => {
    const dispatch = useDispatch();
    const { gameData } = useSelector((state) => state.game);
    const [step, setStep] = useState(STEP_MAIN);
    const [score, setScore] = useState(0);
    const MAX_ROUND = 10;
    const MAX_TIME = 10000; // [D] 1000 = 1초

    useEffect(() => {
        dispatch({
            type: LOAD_GAME_REQUEST,
            data: CATCH_MIND
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
                            MAX_TIME={MAX_TIME}
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

export default CatchMindQuiz;

// TODO: 전체 디자인 다시 잡기..ㅋ...
// TODO: 디자인/아이디어 -> 쿵야 캐치마인드 클론 코딩 표시