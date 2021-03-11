import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { STEP_GAME, STEP_GUIDE } from './index';

const Wrap = styled.div`
    position: relative;
    padding: 5%;
    height: calc(100% - ${({ theme }) => theme.calcRem(30)});
    text-align: center;
    background: ${({ theme }) => theme.nonsenseColors.lightPink};
    border-radius: 0 0 ${({ theme }) => theme.calcRem(20)} ${({ theme }) => theme.calcRem(20)};
`;

const Content = styled.div`
    display: inline-block;
`;

const AskIcon = styled.img`
    width: ${({ theme }) => theme.calcRem(100)};
`;

const Title = styled.span`
    display: block;
    font-size: ${({ theme }) => theme.calcRem(100)};
    line-height: 1;
    color: ${({ theme }) => theme.nonsenseColors.darkYellow};
    text-shadow: -${({ theme }) => theme.calcRem(3)} 0  ${({ theme }) => theme.nonsenseColors.black}, 
                0 ${({ theme }) => theme.calcRem(3)}  ${({ theme }) => theme.nonsenseColors.black}, 
                ${({ theme }) => theme.calcRem(3)} 0  ${({ theme }) => theme.nonsenseColors.black}, 
                0 -${({ theme }) => theme.calcRem(3)}  ${({ theme }) => theme.nonsenseColors.black};
`;

const Highlight = styled.span`
    color: ${({ theme }) => theme.nonsenseColors.skyBlue};
`;

const initialButtonStyle = css`
    padding: 0;
    line-height: 1;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    &[disabled] {
        cursor: default;
    }
`;

const StartButton = styled.button`
    ${initialButtonStyle}
    margin-top: ${({ theme }) => theme.calcRem(30)};
    padding: ${({ theme }) => theme.calcRem(10)} ${({ theme }) => theme.calcRem(30)};
    font-size: ${({ theme }) => theme.calcRem(40)};
    border-radius: ${({ theme }) => theme.calcRem(10)};
    border: ${({ theme }) => theme.calcRem(4)} solid ${({ theme }) => theme.nonsenseColors.black};
    background: ${({ theme }) => theme.nonsenseColors.darkYellow};
    font-weight: 700;
    color: ${({ theme }) => theme.nonsenseColors.black};
`;

const GuideIcon = styled.img`
    width: ${({ theme }) => theme.calcRem(60)};
`;

const Bottom = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
`;

const BottomInner = styled.div`
    position: relative;
    max-width: ${({ theme }) => theme.calcRem(900)};

    img {
        max-width: 100%;
    }
`;

const GuideButton = styled.button`
    ${initialButtonStyle}
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(-50%);
`;

const Main = ({ 
    data,
    onChangeStep,
}) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (data.length < 1) return;

        setReady(true);
    }, [data]);

    return (
        <Wrap>
            <Content>
                <AskIcon src="../../game/nonsense/icon_ask.png" alt="QnA 아이콘" />
                
                <Title>넌, <Highlight>센스</Highlight>퀴즈</Title>

                <StartButton
                    onClick={onChangeStep(STEP_GAME)}
                    disabled={!ready}
                >
                    {ready ? 'START' : 'No Data'}
                </StartButton>
            </Content>

            <Bottom>
                <BottomInner>
                    <GuideButton
                        onClick={onChangeStep(STEP_GUIDE)}
                    >
                        <GuideIcon src="../../game/nonsense/icon_question_mark.png" alt="물음표 아이콘" />
                        <span className="hidden">게임방법</span>
                    </GuideButton>
                    <img src="../../game/nonsense/icon_children.png" alt="아이들 이미지" />
                </BottomInner>
            </Bottom>
        </Wrap>
    );
};



export default Main;