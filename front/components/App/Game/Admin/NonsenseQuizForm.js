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

    const onsubmit = useCallback((e) => {
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
                data.example.push({
                    isCorrect: true,
                    answer: v.value
                });
            } else if (v.name === 'wrongAnswer') {
                v.value.split(',').map((txt) => {
                    data.example.push({
                        isCorrect: false,
                        answer: txt
                    });
                });

                data.example = JSON.stringify(data.example);
            } else {
                data[v.name] = v.value;
            }
        });

        if(!validateNum) {
            dispatch({
                type: ADD_GAME_REQUEST,
                data: data
            });
        }
    }, [gameName]);

    const onEnter = useCallback((e) => {
        if (e.code === 'Enter') {
            onsubmit(e);
        }
    }, []);

    return (
        <Form ref={formRef}>
            <Item>
                <Input 
                    autoFocus
                    placeholder="문제"
                    name="question"
                    maxLength={100}
                    autocomplete="off"
                    onChange={onChangeQuestion}
                    onKeyPress={onEnter}
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
                    onKeyPress={onEnter}
                    value={answer}
                />
            </Item>

            <Item>
                <Input 
                    placeholder="오답 ','로 구분해서 총 3개 입력"
                    name="wrongAnswer"
                    maxLength={100}
                    autocomplete="off"
                    onChange={onChangeWrongAnswer}
                    onKeyPress={onEnter}
                    value={wrongAnswer}
                />
            </Item>

            <Item>
                <Input 
                    placeholder="정답 설명"
                    name="description"
                    maxLength={300}
                    autocomplete="off"
                    onChange={onChangeDesc}
                    onKeyPress={onEnter}
                    value={desc}
                />
            </Item>

            <ButtonArea>
                <button onClick={onReset}>초기화</button>
                <button onClick={onsubmit}>저장</button>
            </ButtonArea>
        </Form>
    );
};

export default NonsenseQuizForm;