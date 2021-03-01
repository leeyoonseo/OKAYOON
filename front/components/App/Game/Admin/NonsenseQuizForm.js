import React, { useCallback, useEffect, useRef, } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import useInput from '../../../../hooks/useInput';
import { ADD_GAME_REQUEST } from '../../../../reducers/game';

import { Form, Item, Input, ButtonArea } from './formStyle';

const NonsenseQuizForm = ({ gameName }) => {
    const dispatch = useDispatch();
    const { addGameDone } = useSelector((state) => state.game);
    const formRef = useRef(null);
    const [question, onChangeQuestion, setQuestion] = useInput('');
    const [answer, onChangeAnswer, setAnswer] = useInput('');
    const [wrongAnswer, onChangeWrongAnswer, setWrongAnswer] = useInput('');
    const [desc, onChangeDesc, setDesc] = useInput('');

    useEffect(() => {
        if (addGameDone) {
            allReset();
        }
    }, [addGameDone]);

    const allReset = useCallback(() => {
        setQuestion('');
        setAnswer('');
        setWrongAnswer('');
        setDesc('');
    }, []);

    const onReset = useCallback((e) => {
        e.preventDefault();
        allReset();
    }, []);

    const onClickSubmit = useCallback((e) => {
        e.preventDefault();
        let validateNum = 0;
        const data = {
            gameName: gameName,
            example: [],
        };

        Array.from(formRef.current.elements).map((v, i) => {
            if (v.nodeName !== 'INPUT') return;
        
            if (!v.value || !v.value.trim()) {
                validateNum++;
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

        if(!validateNum) {
            console.log(data);
    
            dispatch({
                type: ADD_GAME_REQUEST,
                data: data
            });
        }
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