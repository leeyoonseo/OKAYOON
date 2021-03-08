import React, { useEffect, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';

import { STEP_GAME, STEP_GUIDE } from './index';


const initialButton = css`
    padding: 0;
    line-height: 1;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const Wrap = styled.div`
    position: relative;
    display: flex;
    height: calc(100% - 31px);
    align-items: center;
    justify-content: center;
`;

const Inner = styled.div`
    display: inline-block;
    text-align: center;

    > div + div {
        margin-top: 40px;
    }
`;

// const Title = styled.span`
//     display: block;
//     font-size: 68px;
//     line-height: 1.2;
// `;

// const SubTitle = styled.span`
//     display: block;
//     font-size: 24px;
// `;

const StartButton = styled.button`
    ${initialButton}
    text-shadow: 1px 1px 1px rgba(255,255,255,0.5);
    font-size: 85px;

    &[disabled] {
        cursor: default;
    }
`;

const GuideButton = styled.button`
    ${initialButton}
    display: block;
    margin: 20px auto 0;
    text-shadow: 1px 1px 1px rgba(255,255,255,0.5);

    &:after{
        content: '';
        display: block;
        width: 40px;
        height: 40px;
        background: url('https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/icon_question_bulb.png')no-repeat;
        background-size: 100% 100%;
    }
`;

const Main = ({ 
    data,
    onChangeStep,
}) => {
    const [ready, setReady] = useState(false);
    const [startButtonVal, setStartButtonVal] = useState(null);

    useEffect(() => {
        if (data.length < 1) {
            setStartButtonVal("Can't get data");
            return;   
        };

        setReady(true);
        setStartButtonVal('START');
    }, [data]);

    const setRandomColor = useCallback(() => {
        return `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
    }, []);

    return (
        <Wrap>
            <Inner>
        
                {/* <div>
                    <Title>그림 퀴즈</Title>
                    <SubTitle>눈치 코치! 그림을 보고 퀴즈를 맞추어보세요</SubTitle>
                </div> */}

                <StartButton 
                    onClick={onChangeStep(STEP_GAME)}
                    disabled={!ready}
                >
                    {startButtonVal && startButtonVal.split('').map((v, i) => {
                        return (
                            <span
                                key={`word_${i}_${v}`}
                                style={{ color: setRandomColor() }}
                            >
                                {v}
                            </span>
                        )
                    })}
                </StartButton>
                <GuideButton onClick={onChangeStep(STEP_GUIDE)}>
                    <span className="hidden">게임방법</span>
                </GuideButton>
            </Inner>
        </Wrap>
    );
};



export default Main;