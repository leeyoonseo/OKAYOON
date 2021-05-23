import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { HomeOutlined, LeftOutlined } from '@ant-design/icons';
import Main from './Main';
import Game from './Game';
import Finish from './Finish';
import { LOAD_GAME_REQUEST, CATCH_MIND, STORE } from '../../../../../reducers/game';

export const STEP_MAIN = 'main';
export const STEP_GAME = 'game';
export const STEP_FINISH = 'finish';

const iconColor = css`
    font-size: ${({ theme }) => theme.calcRem(16)};
    color: ${({ theme }) => theme.colors.purple};
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

const CatchMindQuiz = ({ onClickHome }) => {
    const dispatch = useDispatch();
    const { catchmindData } = useSelector(state => state.game);
    const [gameData, setGameData] = useState(null);
    const [step, setStep] = useState(STEP_MAIN); // [D] default = STEP_MAIN
    const [score, setScore] = useState(0);
    const MAX_ROUND = 10;
    const MAX_TIME = 1000; // [D] 1000 = 1초

    useEffect(() => {
        if (catchmindData.length >= 1) return;

        dispatch({
            type: LOAD_GAME_REQUEST,
            data: CATCH_MIND
        });
    }, []);

    const onChangeStep = useCallback(step => setStep(step), []);

    return (
        <>
            <TopNav>
                <HomeButton 
                    onClick={(() => onClickHome(STORE))}
                >
                    <HomeIcon />
                    <span className="hidden">메뉴 바로가기</span>
                </HomeButton>

                {step !== STEP_MAIN && (
                    <MainButton onClick={(() => onChangeStep(STEP_MAIN))}>
                        <MainIcon />
                        <span className="hidden">이전 상태로 가기</span>
                    </MainButton>
                )}
            </TopNav>

            {(() => {
                if (step === STEP_MAIN) {
                    return (
                        <Main 
                            data={catchmindData}
                            setGameData={setGameData}
                            onChangeStep={onChangeStep}
                        />
                    )
                } else if (step === STEP_GAME) {
                    if (!gameData) return;

                    return (
                        <Game 
                            MAX_ROUND={MAX_ROUND}
                            MAX_TIME={MAX_TIME}
                            data={gameData}
                            score={score}
                            setScore={setScore}
                            onChangeStep={onChangeStep}
                        />
                    )
                } else if (step === STEP_FINISH) {
                    return (
                        <Finish 
                            score={score}
                            MAX_ROUND={MAX_ROUND}
                        />
                    )
                }
            })()}
        </>
    );
};

CatchMindQuiz.prototype = {
    onClickHome: PropTypes.func.isRequired,
};  

export default CatchMindQuiz;