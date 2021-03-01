import React, { useCallback } from 'react';
import useInput from '../../../../hooks/useInput';

import { Form, Item, Input, ButtonArea } from './formStyle';

const NonsenseQuizForm = ({ formRef, onSubmit }) => {
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
                    placeholder="오답 ','를 사용해 연속 입력"
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
                <button onClick={onSubmit}>저장</button>
            </ButtonArea>
        </Form>
    );
};

export default NonsenseQuizForm;