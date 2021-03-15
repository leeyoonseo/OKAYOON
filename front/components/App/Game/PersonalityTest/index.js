import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { HomeOutlined, LeftOutlined } from '@ant-design/icons';
import { STORE } from '../../../../reducers/game';

import Main from './Main';
import Game from './Game';
import Finish from './Finish';

export const STEP_MAIN = 'main';
export const STEP_GAME = 'game';
export const STEP_FINISH = 'finish';

const iconColor = css`
    color: ${({ theme }) => theme.colors.purple};
    font-size: ${({ theme }) => theme.calcRem(16)};
`;

const TopNav = styled.div`
    position: relative;
    height: ${({ theme }) => theme.calcRem(30)};
`;

const HomeButton = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

const MainButton = styled.button`
    position: absolute;
    top: 0;
    left: ${({ theme }) => theme.calcRem(5)};
    padding: 0;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    transform: translateX(100%);

    &:hover {
        opacity: 0.5;
    }
`;

const HomeIcon = styled(HomeOutlined)`
    ${iconColor}
`;

const MainIcon = styled(LeftOutlined)`
    ${iconColor}
`;

const PersonalityTest = ({ onClickHome }) => {
    const { personalityTest } = useSelector((state) => state.game);
    const [step, setStep] = useState(STEP_MAIN); // [D] default = STEP_MAIN
    const [type, setType] = useState(null);

    const onChangeStep = useCallback((changeStep) => () => setStep(changeStep), []);

    return (
        <>  
            <TopNav>
                <HomeButton onClick={onClickHome(STORE)}>
                    <HomeIcon />
                    <span className="hidden">메뉴 바로가기</span>
                </HomeButton>

                {step !== STEP_MAIN && (
                    <MainButton onClick={onChangeStep(STEP_MAIN)}>
                        <MainIcon />
                        <span className="hidden">이전 상태로 가기</span>
                    </MainButton>
                )}
            </TopNav>

            {(() => {
                if (step === STEP_MAIN) {
                    return (
                        <Main 
                            data={personalityTest}
                            onChangeStep={onChangeStep}
                        />
                    )
                } else if (step === STEP_GAME) {
                    return (
                        <Game 
                            type={type}
                            setType={setType}
                            data={personalityTest}
                            onChangeStep={onChangeStep}
                        />
                    )
                } else if (step === STEP_FINISH) {
                    return (
                        <Finish 
                            type={type}
                            onChangeStep={onChangeStep}
                        />
                    )
                }
            })()}
        </>
    );
};

export default PersonalityTest;

// TODO:
// - https://post.naver.com/viewer/postView.nhn?volumeNo=30753987&memberNo=1192430&vType=VERTICAL