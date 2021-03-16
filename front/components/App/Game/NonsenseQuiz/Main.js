import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { STEP_GAME } from './index';
import Layout from './Layout';

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
    color: ${({ theme }) => theme.nColors.darkYellow};
    text-shadow: -${({ theme }) => theme.calcRem(3)} 0  ${({ theme }) => theme.nColors.black}, 
                0 ${({ theme }) => theme.calcRem(3)}  ${({ theme }) => theme.nColors.black}, 
                ${({ theme }) => theme.calcRem(3)} 0  ${({ theme }) => theme.nColors.black}, 
                0 -${({ theme }) => theme.calcRem(3)}  ${({ theme }) => theme.nColors.black};
`;

const Highlight = styled.span`
    color: ${({ theme }) => theme.nColors.skyBlue};
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
    border: ${({ theme }) => theme.calcRem(4)} solid ${({ theme }) => theme.nColors.black};
    background: ${({ theme }) => theme.nColors.darkYellow};
    font-weight: 700;
    color: ${({ theme }) => theme.nColors.black};
`;

const Bottom = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
`;

const BottomInner = styled.div`
    margin: 0 auto;
    max-width: ${({ theme }) => theme.calcRem(900)};

    img {
        max-width: 100%;
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
        <Layout>
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
                    <img src="../../game/nonsense/icon_children.png" alt="아이들 이미지" />
                </BottomInner>
            </Bottom>
        </Layout>
    );
};



export default Main;