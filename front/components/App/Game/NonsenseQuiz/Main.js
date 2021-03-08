import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';

import { STEP_GAME, STEP_GUIDE } from './index';

const Wrap = styled.div`
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
    text-align: center;
`;

const Title = styled.span`
    display: block;
    font-size: 68px;
`;

const SubTitle = styled.span`
    display: block;
    font-size: 24px;
`;

const ButtonArea = styled.div`
    button {
        padding: 10px 0;
        width: 100%;
        font-size: 20px;
        line-height: 1;
        border: 1px solid #fff;
        outline: none;
        background: none;
        cursor: pointer;
    
        &not([disabled]):hover {
            opacity: 0.5;
        }

        &[disabled] {
            border: none;
            opacity: 0.5;
            cursor: default;    
        }
    }

    button + button {
        margin-top: 10px;
    }
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
            <Inner>
                <TitleArea>
                    <Title>넌센스 퀴즈</Title>
                    <SubTitle>당신의 센스를 알아보아요</SubTitle>
                </TitleArea>

                <ButtonArea>
                    <button 
                        onClick={onChangeStep(STEP_GAME)}
                        disabled={!ready}
                    >
                        {ready ? '시작하기' : '데이터가 없습니다'}
                    </button>
                    <button onClick={onChangeStep(STEP_GUIDE)}>게임방법</button>
                </ButtonArea>
            </Inner>
        </Wrap>
    );
};



export default Main;