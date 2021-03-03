import React, { useEffect, useCallback } from 'react';
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

    > div + div {
        margin-top: 40px;
    }
`;

const TitleArea = styled.div`
`;

const Title = styled.span`
`;

const SubTitle = styled.span`
`;

const ButtonArea = styled.div`
`;

const StartButton = styled.button`
    ${initialButton}
`;

const GuideButton = styled.button`
    ${initialButton}
    position: absolute;
    bottom: 0;
    right: 0;

    &:after{
        content: '';
        display: block;
        width: 40px;
        height: 40px;
        background: url('https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/icon_question_bulb.png')no-repeat;
        background-size: 100% 100%;
    }

`;

const Main = ({ onChangeStep }) => {
    const START = 'START';

    const getRandomColor = useCallback(() => {
        return `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
    }, []);

    return (
        <Wrap>
            <Inner>
                <TitleArea>
                    <Title>캐치마인드</Title>
                    <SubTitle>그림퀴즈어쩌고저쩌고</SubTitle>
                </TitleArea>

                {/* <ButtonArea> */}
                    <StartButton onClick={onChangeStep(STEP_GAME)}>
                        {START.split('').map((v, i) => {
                            return (
                                <span
                                    key={`word_${i}_${v}`}
                                    style={{ color: getRandomColor() }}
                                >
                                    {v}
                                </span>
                            )
                        })}
                    </StartButton>
                    <GuideButton onClick={onChangeStep(STEP_GUIDE)}>
                        <span className="hidden">게임방법</span>
                    </GuideButton>
                {/* </ButtonArea> */}
            </Inner>
        </Wrap>
    );
};



export default Main;