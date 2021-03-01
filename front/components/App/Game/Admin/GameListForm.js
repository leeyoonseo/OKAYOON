import React, { useCallback, useEffect } from 'react';
import useInput from '../../../../hooks/useInput';

import { Form, Item, Input, ButtonArea } from './formStyle';

const GameListForm = ({ formRef, onSubmit }) => {
    const [name, onChangeName, setName] = useInput('');
    const [title, onChangeTitle, setTitle] = useInput('');
    const [imgSrc, onChangeImgSrc, setImgSrc] = useInput('');
    const [desc, onChangeDesc, setDesc] = useInput('');

    const onReset = useCallback((e) => {
        e.preventDefault();
        setName('');
        setTitle('');
        setImgSrc('');
        setDesc('');
    }, []);

    return (
        <Form ref={formRef}>
            <Item>
                <Input 
                    autoFocus
                    placeholder="db 이름" 
                    name="name"
                    maxLength={20}
                    onChange={onChangeName}
                    value={name}
                    autocomplete="off"
                />
            </Item>
            <Item>
                <Input 
                    placeholder="게임 스토어에 등록될 이름" 
                    name="title" 
                    maxLength={20}
                    onChange={onChangeTitle}
                    value={title}
                    autocomplete="off"
                />
            </Item>
            <Item>
                <Input 
                    placeholder="이미지 주소" 
                    name="image" 
                    maxLength={100}
                    onChange={onChangeImgSrc}
                    value={imgSrc}
                    autocomplete="off"
                /> 
            </Item>
            <Item>
                <Input 
                    placeholder="게임 설명" 
                    name="description" 
                    maxLength={200}
                    onChange={onChangeDesc}
                    value={desc}
                    autocomplete="off"
                /> 
            </Item>

            <ButtonArea>
                <button onClick={onReset}>초기화</button>
                <button onClick={onSubmit}>저장</button>
            </ButtonArea>
        </Form>
    );
};

export default GameListForm;