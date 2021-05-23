import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { bucketUrl } from '../../../../../config/config';
import { STEP_GAME } from './index';
import Frame from '../Module/Frame';

const SubTitle = styled.div`
    font-size: ${({ theme }) => theme.calcRem(45)};
    line-height: 1;
    color: black;
`;

const Title = styled.div`
    padding: ${({ theme }) => theme.calcRem(10)} ${({ theme }) => theme.calcRem(10)} 0 ${({ theme }) => theme.calcRem(10)};
    margin-top: ${({ theme }) => theme.calcRem(5)};
    font-size: ${({ theme }) => theme.calcRem(80)};
    line-height: 1;
    background: black;
`;

const MainIcon = styled.div`
    display: inline-block;
    margin-top: ${({ theme }) => theme.calcRem(20)};
    width: ${({ theme }) => theme.calcRem(150)};
    height: ${({ theme }) => theme.calcRem(150)};
    background: url(${bucketUrl}/game/personality/icon_person_question.png)no-repeat;
    background-size: cover;
`;

const StartButton = styled.button`
    padding: 0;
    margin-top: ${({ theme }) => theme.calcRem(20)};
    font-size: ${({ theme }) => theme.calcRem(30)};
    line-height: 1;
    color: black;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const Copyright = styled.span`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;

    a {
        color: white;
        font-size: ${({ theme }) => theme.calcRem(12)}; 
        
        &:hover,
        &:focus {
            color: white;
        }
    }
`;

const Main = ({ onChangeStep }) => {
    return (
        <Frame>
            <SubTitle>두개의 퀴즈로 알아보는</SubTitle>
                <Title>내 성격 유형</Title>
                <div>
                    <StartButton
                        onClick={(() => onChangeStep(STEP_GAME))}
                    >
                        시작하기
                    </StartButton>
                </div>

                <MainIcon />

                <Copyright>
                    <a 
                        href="https://post.naver.com/viewer/postView.nhn?volumeNo=30753987&memberNo=1192430&vType=VERTICAL" 
                        title="쌤앤파커스"
                        target="_blank"
                    >
                        원본 바로가기 (쌤앤파커스)
                    </a>
                </Copyright>
        </Frame>
    );
};

export default Main;