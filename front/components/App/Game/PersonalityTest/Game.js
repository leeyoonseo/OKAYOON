import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { STEP_FINISH } from './index';
import Layout from './Layout';

const Step = styled.div`
    max-width: 620px;

    & > div + div {
        margin-top: 20px;
    }
`;

const Round = styled.div`
    font-size: 20px;
    background: #000;
    display: inline-block;
    padding: 5px 15px;
    border-radius: 30px;
`;

const Question = styled.div`
    word-break: keep-all;
    font-size: 26px;
    line-height: 1.25;
    color: #000;
`;

const Example = styled.div`
    color: #000;
    background: #fff;
    width: 100%;
    display: inline-block;
    padding: 50px 20px;
    border: 1px solid #000;
`;

const Items = styled.div`
    button {
        padding: 0;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
        line-height: 1;
        font-size: 22px;

        &:hover {
            opacity: 0.5;
        }
    }

    & + div {
        margin-top: 20px;
    }
`;

const Game = ({
    data, 
    type,
    setType,
    onChangeStep, 
}) => {
    const [round, setRound] = useState(1);

    useEffect(() => {
        setType(null);
    }, []);

    const onClickExam = useCallback((e) => {
        const i = e.target.dataset.index;

        setType(type ? type + i : i);

        if (!type) {
            setRound(round + 1);

        } else {
            onChangeStep(STEP_FINISH)();
        }
    }, [type, round]);

    return (
        <Layout>
            {data && data.map((v) => {
                if (v.round !== round) return;

                return (
                    <Step key={`${v.round}_${v.question.charAt(0)}`}>
                        <Round>
                            {v.round}번 질문
                        </Round>

                        <Question dangerouslySetInnerHTML={{ __html: v.question }}/>

                        <Example>
                            {v.example.map((o) => {
                                return (
                                    <Items key={`answer_${o.type}`}>
                                        <button 
                                            onClick={onClickExam}
                                            data-index={o.type}
                                        >
                                            {o.answer}
                                        </button>
                                    </Items>
                                )
                            })}
                        </Example>
                    </Step>
                )   
            })}
        </Layout>
    );
};

export default Game;

// (1) 질문: 마카롱 세트르 선물 받아서 가족과 함께 먹으려고한다.
// 다 같이 모여서 마카롱 포장을 뜯었는데, 
// 내가 좋아하는 맛의 마카롱이 하나 있었다.
// 이때 첫번째로 드는 생각이나 말은 무엇인가?

// 1. '이거 내가 좋아하는 맛인데!, 아싸!'
// 2. "다들 뭐 먹을 거야? 내가 이거 먹어도 돼?"
// 3. '아무거나 먹지 뭐'



// (2) 큰 실수를 저질렀는데, 이때 드는 심정은?

// 1. 다음에는 그런 일이 생기지 않도록 상황을 정리한다.
// 2. 휴 생각은 나지만 별수 없다. 괜찮겠지..
// 3. 자꾸만 그 일이 생각나서 괴롭다.