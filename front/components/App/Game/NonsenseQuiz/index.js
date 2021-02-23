import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Main from './Main';
import Guide from './Guide';
import Game from './Game';
import Finish from './Finish';

export const GAME_ID = 'game_nonsense';
export const STEP_MAIN = 'main';
export const STEP_GUIDE = 'guide';
export const STEP_GAME = 'game';
export const STEP_FINISH = 'finish';

const NonsenseQuiz = () => {
    const [step, setStep] = useState(STEP_MAIN);

    const onChangeStep = useCallback((changeStep) => () => {
        setStep(changeStep);
    }, []);
    
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
                    onChangeStep={onChangeStep}
                />
            )} 

            {step === STEP_FINISH && (
                <Finish 
                    onChangeStep={onChangeStep}
                />
            )} 
        </>
    );
};

export default NonsenseQuiz;