import React, { useCallback, useEffect, useRef, } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import PropTypes from 'prop-types';
import useInput from '../../../../hooks/useInput';
import { ADD_GAME_REQUEST } from '../../../../reducers/game';
import { Form, Item, Input, ButtonArea } from './formStyle';

const NonsenseQuizForm = ({ gameName }) => {
    const dispatch = useDispatch();
    const { addGameDone } = useSelector(state => state.game);
    const formRef = useRef(null);
    const [question, onChangeQuestion, setQuestion] = useInput('');
    const [answer, onChangeAnswer, setAnswer] = useInput('');
    const [wrongAnswer, onChangeWrongAnswer, setWrongAnswer] = useInput('');

    useEffect(() => {
        if (addGameDone) {
            allReset();
        }
    }, [addGameDone]);

    const allReset = useCallback(() => {
        setQuestion('');
        setAnswer('');
        setWrongAnswer('');
    }, []);

    const onReset = useCallback(e => {
        e.preventDefault();
        allReset();
    }, []);

    const onsubmit = useCallback(e => {
        e.preventDefault();
        let data = {};
        let example = [];
        let failCount = 0;

        Array.from(formRef.current.elements).map(({ nodeName, name, value, placeholder }) => {
            if (nodeName !== 'INPUT') return;
        
            if (!value || !value.trim()) {
                failCount++;
                return alert(`${placeholder} 비었습니다.`);
            }

            if (name === 'answer') {
                example.push({
                    isCorrect: true,
                    answer: value
                });
                
            } else if (name === 'wrongAnswer') {
                value.split(',').map((txt) => {
                    example.push({
                        isCorrect: false,
                        answer: txt
                    });
                });

                example = JSON.stringify(example);

            } else {
                data[name] = value;
            }
        });

        if(!failCount) {
            data['gameName'] = gameName;
            data['example'] = example;

            dispatch({
                type: ADD_GAME_REQUEST,
                data
            });
        }
    }, []);

    const onEnter = useCallback(e => {
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
                    onChange={onChangeWrongAnswer}
                    onKeyPress={onEnter}
                    value={wrongAnswer}
                />
            </Item>

            <ButtonArea>
                <button onClick={onReset}>초기화</button>
                <button onClick={onsubmit}>저장</button>
            </ButtonArea>
        </Form>
    );
};

NonsenseQuizForm.propTypes = {
    gameName: PropTypes.string.isRequired,
};

export default NonsenseQuizForm;