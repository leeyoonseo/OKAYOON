import React, { useCallback, useEffect, useRef, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import useInput from '../../../../hooks/useInput';
import { ADD_GAME_REQUEST } from '../../../../reducers/game';

import { Form, Item, Input, ButtonArea } from './formStyle';
import styled from 'styled-components';

const IncorrectNum = styled.span`
    margin: 0 auto;
    display: block;
    width: 50%;
    font-size: ${({ theme }) => theme.calcRem(12)}; 
    text-align: right;
`;

const CatchMindForm = ({ gameName }) => {
    const dispatch = useDispatch();
    const { addGameDone } = useSelector((state) => state.game);
    const [question, onChangeQuestion, setQuestion] = useInput('');
    const [correct, onChangeCorrect, setCorrect] = useInput('');
    const [incorrect, onChangeIncorrect, setIncorrect] = useInput('');
    const formRef = useRef(null);
    const [incorrectNum, setIncorrectNum] = useState(0);

    useEffect(() => {
        if (addGameDone) {
            allReset();
        }
    }, [addGameDone]);

    useEffect(() => {
        let arr = incorrect.split(',');
        arr = arr.filter((v) => v !== '');

        setIncorrectNum(arr.length);
    }, [incorrect]);

    const allReset = useCallback(() => {
        setQuestion('');
        setCorrect('');
        setIncorrect('');
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
        };

        Array.from(formRef.current.elements).map((v, i) => {
            if (v.nodeName !== 'INPUT') return;
        
            if (!v.value || !v.value.trim()) {
                validateNum++;
                return alert(`${v.placeholder} 비었습니다.`);
            }

            let val = v.value;

            if (v.name === 'incorrect') {
                val = val.split(',').filter((v) => v !== '');
                val = JSON.stringify(val);
            }
            
            data[v.name] = val;
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
                    placeholder="문제 이미지 주소"
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
                    name="correct"
                    maxLength={20}
                    autocomplete="off"
                    onChange={onChangeCorrect}
                    onKeyPress={onEnter}
                    value={correct}
                />
            </Item>

            <Item>
                <Input 
                    placeholder="오답 ','로 구분해서 최소 12글자 입력"
                    name="incorrect"
                    maxLength={100}
                    autocomplete="off"
                    onChange={onChangeIncorrect}
                    onKeyPress={onEnter}
                    value={incorrect}
                />
                <IncorrectNum>{incorrectNum}</IncorrectNum>
            </Item>

            
            <ButtonArea>
                <button onClick={onReset}>초기화</button>
                <button onClick={onsubmit}>저장</button>
            </ButtonArea>
        </Form>
    );
};

export default CatchMindForm;