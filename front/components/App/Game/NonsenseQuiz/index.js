import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Main from './Main';
import Guide from './Guide';
import Game from './Game';
import Finish from './Finish';
import { LOAD_GAME_REQUEST, NONSENSE_QUIZ } from '../../../../reducers/game';

// export const GAME_ID = 'game_nonsense';
export const STEP_MAIN = 'main';
export const STEP_GUIDE = 'guide';
export const STEP_GAME = 'game';
export const STEP_FINISH = 'finish';

const NonsenseQuiz = () => {
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
            {step === STEP_MAIN && (
                <Main 
                    onChangeStep={onChangeStep}
                />
            )}

            {step === STEP_GUIDE && (
                <Guide 
                    onChangeStep={onChangeStep}
                />
            )} 

            {step === STEP_GAME && (
                <Game 
                    score={score}
                    setScore={setScore}
                    MAX_ROUND={MAX_ROUND}
                    MAX_TIMER={MAX_TIMER}
                    gameData={gameData}
                    onChangeStep={onChangeStep}
                />
            )} 

            {step === STEP_FINISH && (
                <Finish 
                    score={score}
                    MAX_ROUND={MAX_ROUND}
                    onChangeStep={onChangeStep}
                />
            )} 
        </>
    );
};

export default NonsenseQuiz;