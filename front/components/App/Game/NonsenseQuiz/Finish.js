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

const Finish = ({ 
    score, 
    MAX_ROUND, 
}) => {
    const [resultMessage, setResultMessage] = useState(null);

    useEffect(() => {
        const ratio = (score / MAX_ROUND) * 100;
        let msg = '';

        if (ratio >= 95) { // [D] 오답 1
            msg = '부장님!!!?? ㅎㅎ 앗, 부장님^^~ 여기서 이러시면 안됩니다.';
        
        } else if (ratio >= 75) { // [D] 오답 5
            msg = '썰렁한 개그에 잘 웃고 가끔 치시는편?!! 아니라고요? 눼~눼~ 그렇다고 칩시다!!';
        
        } else if (ratio >= 50) { // [D] 오답 10
            msg = '사회생활력 갑!! 눈치밥 좀 많이 드셨군요?! 가끔 넌센스 넝~담도 하시고?^ㅜ^ 사회생활이란~';

        } else if (ratio >= 25) { // [D] 오답 15
            msg = '그대는 일반인!! 일반인이 분명합니다. 남이 하는 넌센스에 가끔 웃어넘기는 스탈~~';

        } else {
            msg = '지식인이신가요? 고지식인?^^ 나에게 넌센스는 없다.! 마이웨~이';
        }

        setResultMessage(msg);
    }, [score]);

    return (
        <Wrap>
            <Inner>
                <ScoreArea>
                    <Score>{score}개</Score>를 맞춘 당신!!
                </ScoreArea>
                
                <div>
                    {resultMessage}
                </div>
            </Inner>
        </Wrap>
    );
};

export default Finish;      