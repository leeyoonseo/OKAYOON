import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { STEP_GAME } from './index';
import Layout from './Layout';

const SubTitle = styled.div`
    font-size: 45px;
    line-height: 1;
    color: black;
`;

const Title = styled.div`
    margin-top: 5px;
    font-size: 80px;
    line-height: 1;
    padding: 10px 10px 0 10px;
    background: #000;
`;

const MainIcon = styled.div`
    margin-top: 20px;
    display: inline-block;
    width: 150px;
    height: 150px;
    background: url(../../../game/personality/icon_person_question.png)no-repeat;
    background-size: cover;
`;

const StartButton = styled.button`
    padding: 0;
    font-size: 30px;
    margin-top: 20px;
    line-height: 1;
    color: black;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
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
        <Layout>
            <SubTitle>두개의 퀴즈로 알아보는</SubTitle>
                <Title>내 성격 유형</Title>

                <div>
                    <StartButton
                        onClick={onChangeStep(STEP_GAME)}
                    >
                        시작하기
                    </StartButton>
                </div>

                <MainIcon />
        </Layout>
    );
};

export default Main;

// TODO:
// 출처 언급 : https://post.naver.com/viewer/postView.nhn?volumeNo=30753987&memberNo=1192430&vType=VERTICAL