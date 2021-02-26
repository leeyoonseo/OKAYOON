import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../../hooks/useInput';
import { GAME_LIST, NONSENSE_QUIZ, CATCH_MIND, LOAD_GAMELIST_REQUEST } from '../../../../reducers/game';
import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
    background: #333;

    > div + div {
        margin-top: 40px;
    }
`;

const BackButton = styled.button`
    padding: 0;
    line-height: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const SelectArea = styled.div`
    text-align: center;
`;

const Title = styled.div`
    display: inline-block;
    font-size: 20px;
    border-bottom: 1px solid #fff;
`;

const Select = styled.div`
    margin-top: 15px;
`;

const OptionItems = styled.div`
    display: inline-block;
    
    label {
        margin-right: 5px;
        cursor: pointer;
    }

    input[type='radio'],
    input[type='radio']:checked {
        appearance: none;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 100%;
        background: none;
        border: 1px solid #fff;
        outline: none;
        cursor: pointer;
    }

    input[type='radio']:checked {
        background: #fff;
    }

    label[disabled],
    input[disabled] {
        barder: none;
        cursor: default;
    }

    & + div {
        margin-left: 10px;
    }
`;

const Form = styled.form`
    margin-top: 15px;
`;

const NotifyMessage = styled.div`
    text-align: center;
`;

const Admin = ({ list, onClickBack }) => {
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const [dataName, setDataName] = useState(null);

    // D: 공통
    const [desc, onChangeDesc] = useInput('');

    // D: 리스트
    const [name, onChangeName] = useInput('');
    const [title, onChangeTitle] = useInput('');
    const [imgSrc, onChangeImgSrc] = useInput('');

    // D: 넌센스
    const [question, onChangeQuestion] = useInput('');
    const [answer, onChangeAnswer] = useInput('');
    const [wrongAnswer, onChangeWrongAnswer] = useInput('');

    const renderForm = useCallback(() => {
        return (
            <Form ref={formRef}>
                {(() => {
                    if (dataName === GAME_LIST) {
                        return (
                            <>
                                <input 
                                    placeholder="name" 
                                    name="name"
                                    onChange={onChangeName}
                                    value={name}
                                />
                                <input 
                                    placeholder="title" 
                                    name="title" 
                                    onChange={onChangeTitle}
                                    value={title}
                                />
                                <input 
                                    placeholder="image" 
                                    name="image" 
                                    onChange={onChangeImgSrc}
                                    value={imgSrc}
                                /> 
                                <input 
                                    placeholder="description" 
                                    name="description" 
                                    onChange={onChangeDesc}
                                    value={desc}
                                /> 
                            </>
                        )
                    } else if (dataName === NONSENSE_QUIZ) {
                        return (
                            <>
                                <input 
                                    placeholder="문제"
                                    name="question"
                                    onChange={onChangeQuestion}
                                    value={question}
                                />
                                <input 
                                    placeholder="정답"
                                    name="answer"
                                    onChange={onChangeAnswer}
                                    value={answer}
                                />
                                <input 
                                    placeholder="오답 ','를 사용해 연속 입력하세요"
                                    name="wrongAnswer"
                                    onChange={onChangeWrongAnswer}
                                    value={wrongAnswer}
                                />
                                <input 
                                    placeholder="설명"
                                    name="description"
                                    onChange={onChangeDesc}
                                    value={desc}
                                />
                            </>
                        )
                    } else if (dataName === CATCH_MIND) {
                        return (
                            <>
                                캐치마인드
                            </>
                        )
                    } 
                })()}

                <button onClick={onClickReset}>초기화</button>
                <button onClick={onSubmit}>저장</button>
            </Form>
        )
    }, [dataName]);

    const onClickOption = useCallback((name) => () => {
        setDataName(name);
    }, []);

    const onClickReset = useCallback(() => {
        formRef.current.reset();
    }, []);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const data = {};

        console.log('submit', formRef.current.elements);

        for (let i = 0; i < formRef.current.elements.length; i++) {
            if (formRef.current.elements[i].nodeName === 'INPUT') {
                console.log('submit', formRef.current.elements[i]);

                data[formRef.current.elements[i].name] = formRef.current.elements[i].value;
            }
        }

        console.log('data', data);

    }, []);

    return (
        <Wrap>
            <BackButton onClick={onClickBack}>
                <LeftOutlined />
                <span className="hidden">뒤로가기버튼</span>
            </BackButton>

            <SelectArea>
                <Title>데이터 항목 선택</Title>
                
                <Select>
                    <OptionItems key={`admin_add_gamelist`}>
                        <label htmlFor={GAME_LIST}>리스트</label>
                        <input 
                            type="radio" 
                            id={GAME_LIST} 
                            name="add-data" 
                            value={GAME_LIST} 
                            onClick={onClickOption(GAME_LIST)} 
                        />
                    </OptionItems>

                    {list && list.map((v) => {
                        const attDisabled = (v.name === 'catchmind') ? true : false; 

                        return (
                            <OptionItems key={`admin_${v.name}`}>
                                <label 
                                    htmlFor={v.name}
                                    disabled={attDisabled}
                                >
                                    {v.title}
                                </label>
                                <input 
                                    disabled={attDisabled}
                                    type="radio" 
                                    id={v.name} 
                                    name="add-data" 
                                    value={v.name} 
                                    onClick={onClickOption(v.name)} 
                                />
                            </OptionItems>
                        )
                    })}
                </Select>  
            </SelectArea>

            {dataName ? renderForm() : (
                <NotifyMessage>
                    항목을 선택해주세요...
                </NotifyMessage>
            )}
        </Wrap>
    );
};

export default Admin;

// TODO: 컴포넌트가 너무 커지면 분리