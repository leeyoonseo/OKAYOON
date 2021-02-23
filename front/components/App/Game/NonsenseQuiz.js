import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';


const NonsenseQuiz = () => {
    const [step, setStep] = useState(STEP_MAIN);
    const STEP_MAIN = 'main';
    const STEP_GUIDE = 'guide';
    const STEP_GAME = 'game';
    const STEP_FINISH = 'finish';
    

    const onClickStart = useCallback(() => {
        setStep(STEP_GAME);
    }, []);

    const onClickGuide = useCallback(() => {
        setStep(STEP_GUIDE);
    }, []);
    
    return (
        <>
            {step === STEP_MAIN && (
                <div>
                    <div>
                        <span>넌센스 퀴즈</span>
                        <span>당신의 센스를 알아보아요.</span>
                    </div>

                    <div>
                        <button onClick={onClickStart}>시작하기</button>
                        <button>게임방법</button>
                    </div>
                </div>
            )}

            {step === STEP_GUIDE && (
                <>
                    가이드
                </>
            )} 

            {step === STEP_GAME && (
                <>
                    게임
                </>
            )} 

            {step === STEP_FINISH && (
                <>
                    당신는 0개 맞추시고 
                    상위 00%입니다.
                </>
            )} 
        </>
    );
};

export default NonsenseQuiz;