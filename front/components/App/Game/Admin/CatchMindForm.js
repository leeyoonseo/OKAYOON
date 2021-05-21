import React, { useCallback, useEffect, useRef, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import useInput from '../../../../hooks/useInput';
import PropTypes from 'prop-types';
import { ADD_GAME_REQUEST } from '../../../../reducers/game';
import { Form, Item, Input, ButtonArea } from './formStyle';
import styled from 'styled-components';

const IncorrectNum = styled.span`
    margin: 0 auto;
    display: block;
    width: 70%;
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

        Array.from(formRef.current.elements).map(({ 
            nodeName, 
            name, 
            value,
            placeholder, 
        }) => {
            if (nodeName !== 'INPUT') return;
        
            if (!value || !value.trim()) {
                validateNum++;
                return alert(`${placeholder} 비었습니다.`);
            }

            let val = value;

            if (name === 'incorrect') {
                val = val.split(',').filter((o) => o !== '');
                val = JSON.stringify(val);
            }
            
            data[name] = val;
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
                    autoComplete="off"
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
                    autoComplete="off"
                    onChange={onChangeCorrect}
                    onKeyPress={onEnter}
                    value={correct}
                />
            </Item>

            <Item>
                <Input 
                    placeholder="오답 ','로 구분해서 12자이상 입력 (EX:가,나,다,라)"
                    name="incorrect"
                    maxLength={100}
                    autoComplete="off"
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

CatchMindForm.propTypes = {
    gameName: PropTypes.string.isRequired,
};

export default CatchMindForm;