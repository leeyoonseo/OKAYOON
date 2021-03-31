import React, { useEffect, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { bucketUrl } from '../../../../config/config';

import { shuffleArray, cloneObject } from '../index';

import { STEP_GAME } from './index';
import Layout from './Layout';

const initialButton = css`
    padding: 0;
    line-height: 1;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const Inner = styled.div`
    display: inline-block;
`;

const MainImageArea = styled.div`
    display: inline-block;
    width: ${({ theme }) => theme.calcRem(200)};
    box-sizing: border-box;

    img {
        max-width: 100%;
    }

`;

const TitleArea = styled.div`
    position: relative;
    padding: ${({ theme }) => theme.calcRem(10)} 0;
    margin: ${({ theme }) => theme.calcRem(30)} 0;
`;

const Highlighter = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(245, 179, 110, 0.5);
`;

const StartButton = styled.button`
    ${initialButton}
    position: relative;
    font-size: ${({ theme }) => theme.calcRem(40)};
    color: ${({ theme }) => theme.cColors.red};
    text-shadow: ${({ theme }) => theme.calcRem(2)} ${({ theme }) => theme.calcRem(2)} ${({ theme }) => theme.calcRem(2)} white;

    &[disabled] {
        cursor: default;
    }
`;

const Copyright = styled.span`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    font-size: ${({ theme }) => theme.calcRem(12)}; 
    text-align: center;
    color: ${({ theme }) => theme.cColors.black};
`;

const Main = ({ 
    data,
    setGameData,
    onChangeStep,
}) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (data.length < 1) return;

        let gameData = cloneObject(data);
        gameData = shuffleArray(data);

        setGameData(gameData.slice(0, 10));
        setReady(true);
    }, [data]);

    return (
        <Layout>
            <Inner>
                <MainImageArea>
                    <img src={`${bucketUrl}/game/catchmind/icon_drawing.png`} title="크레용 이미지" />
                </MainImageArea>

                <TitleArea>
                    <Highlighter />
                    <StartButton 
                        onClick={onChangeStep(STEP_GAME)}
                        disabled={!ready}
                    >
                        {ready ? '시작하기' : 'No Data'}
                    </StartButton>
                </TitleArea>
            </Inner>
            <Copyright>디자인 참고: 캐치마인드</Copyright>
        </Layout>
    );
};



export default Main;