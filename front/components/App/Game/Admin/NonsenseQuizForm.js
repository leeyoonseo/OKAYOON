import React, { useCallback, useEffect, useRef, } from 'react';
import useInput from '../../../../hooks/useInput';

import { NONSENSE_QUIZ } from '../../../../reducers/game';

import { Form, Item, Input, ButtonArea } from './formStyle';

const NonsenseQuizForm = ({ gameName }) => {
    const formRef = useRef(null);
    const [question, onChangeQuestion, setQuestion] = useInput('');
    const [answer, onChangeAnswer, setAnswer] = useInput('');
    const [wrongAnswer, onChangeWrongAnswer, setWrongAnswer] = useInput('');
    const [desc, onChangeDesc, setDesc] = useInput('');

    const onReset = useCallback((e) => {
        e.preventDefault();
        setQuestion('');
        setAnswer('');
        setWrongAnswer('');
        setDesc('');
    }, []);

    const onClickSubmit = useCallback((e) => {
        e.preventDefault();
        const data = {
            gameName: gameName,
            example: [],
        };

        // question: '타이타닉의 구명 보트에는 몇 명이 탈수 있을까?',
        //     example: [{
        //         isCorrect: true,
        //         answer: '9명',
        //     },{
        //         isCorrect: false,
        //         answer: '6명'
        //     },{
        //         isCorrect: false,
        //         answer: '제로'
        //     },{
        //         isCorrect: false,
        //         answer: '몇'
        //     }],
        //     description: '9명(구명 보트)',

        Array.from(formRef.current.elements).map((v, i) => {
            if (v.nodeName !== 'INPUT') return;
        
            if (!v.value || !v.value.trim()) {
                return alert(`${v.placeholder} 비었습니다.`);
            }

            if (v.name === 'answer') {
                console.log('정답?')
                data.example.push({
                    isCorrect: true,
                    answer: v.value
                });
            } else if (v.name === 'wrongAnswer') {
                console.log('엥?', v)
                v.value.split(',').map((txt) => {
                    data.example.push({
                        isCorrect: false,
                        answer: txt
                    });
                });
            } else {
                data[v.name] = v.value;
            }
        });

        console.log(data);
    }, [gameName]);

    return (
        <Form ref={formRef}>
            <Item>
                <Input 
                    autoFocus
                    placeholder="문제"
                    name="question"
                    maxLength={50}
                    autocomplete="off"
                    onChange={onChangeQuestion}
                    value={question}
                />
            </Item>

            <Item>
                <Input 
                    placeholder="정답"
                    name="answer"
                    maxLength={20}
                    autocomplete="off"
                    onChange={onChangeAnswer}
                    value={answer}
                />
            </Item>

            <Item>
                <Input 
                    placeholder="오답 ','로 구분해서 총 3개 입력"
                    name="wrongAnswer"
                    maxLength={50}
                    autocomplete="off"
                    onChange={onChangeWrongAnswer}
                    value={wrongAnswer}
                />
            </Item>

            <Item>
                <Input 
                    placeholder="정답 설명"
                    name="description"
                    maxLength={20}
                    autocomplete="off"
                    onChange={onChangeDesc}
                    value={desc}
                />
            </Item>

            <ButtonArea>
                <button onClick={onReset}>초기화</button>
                <button onClick={onClickSubmit}>저장</button>
            </ButtonArea>
        </Form>
    );
};

export default NonsenseQuizForm;