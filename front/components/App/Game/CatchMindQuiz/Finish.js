import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { STEP_MAIN } from './index';

const Wrap = styled.div`
    display: flex;
    width: 100%;
    height: calc(100% - 31px);
    font-size: 28px;
    text-align: center;
    justify-content: center;
    align-items: center;
`;

const Inner = styled.div`
    padding: 0 5%;
    display: inline-block;
`;

const ScoreArea = styled.div`
    font-size: 60px;
`;

const Score = styled.span`
    color: #26ca3f;
`;

const Finish = ({ score }) => {
    // TODO: 기존에 푼 문제 작게 이미지, 정답 알려주기
    return (
        <Wrap>
            <Inner>
                <ScoreArea>
                    <Score>{score}개</Score> 정답
                </ScoreArea>
            </Inner>
        </Wrap>
    );
};

export default Finish;      