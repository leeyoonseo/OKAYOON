import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../../../hooks/useInput';
import { ADD_GAMELIST_REQUEST } from '../../../../reducers/game';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Item, Input, ButtonArea } from './formStyle';

const NotifyMessage = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    width: 100%;
    font-size: ${({ theme }) => theme.calcRem(13)};
    text-align: center;
    line-height: 1.5;
    color: red;
`;

const GameListForm = ({ gameName }) => {
    const dispatch = useDispatch();
    const { addGameListDone } = useSelector((state) => state.game);
    const formRef = useRef(null);
    const [name, onChangeName, setName] = useInput('');
    const [title, onChangeTitle, setTitle] = useInput('');
    const [imgSrc, onChangeImgSrc, setImgSrc] = useInput('');
    const [desc, onChangeDesc, setDesc] = useInput('');

    useEffect(() => {
        if (addGameListDone) {
            allReset();
        }
    }, [addGameListDone]);

    const allReset = useCallback(() => {
        setName('');
        setTitle('');
        setImgSrc('');
        setDesc('');
    }, []);

    const onReset = useCallback(e => {
        e.preventDefault();
        allReset();
    }, []);

    const onSubmit = useCallback(e => {
        e.preventDefault();
        let data = {};
        let failCount = 0;

        Array.from(formRef.current.elements).map(({ 
            nodeName, 
            name, 
            value, 
            placeholder 
        }) => {
            if (nodeName !== 'INPUT') return;

            if (!value || !value.trim()) {
                failCount++;
                return alert(`${placeholder} 비었습니다.`);
            }

            data[name] = value;
        }); 

        if(!failCount) {
            data['gameName'] = gameName;
        
            dispatch({
                type: ADD_GAMELIST_REQUEST,
                data
            });
        }
    }, []);

    return (
        <Form ref={formRef}>
            <NotifyMessage>
                * 게임 리스트 저장 시, 추가 작업 필수로 함부로 추가하지말것.<br/>
                1&#41; 데이터 db 폼 생성<br/>
                2&#41; 백엔드 db 작업
            </NotifyMessage>
            <Item>
                <Input 
                    autoFocus
                    placeholder="db 이름" 
                    name="name"
                    maxLength={20}
                    onChange={onChangeName}
                    value={name}
                    autoComplete="off"
                />
            </Item>
            <Item>
                <Input 
                    placeholder="게임 스토어에 등록될 이름" 
                    name="title" 
                    maxLength={20}
                    onChange={onChangeTitle}
                    value={title}
                    autoComplete="off"
                />
            </Item>
            <Item>
                <Input 
                    placeholder="이미지 주소" 
                    name="image" 
                    maxLength={100}
                    onChange={onChangeImgSrc}
                    value={imgSrc}
                    autoComplete="off"
                /> 
            </Item>
            <Item>
                <Input 
                    placeholder="게임 설명" 
                    name="description" 
                    maxLength={200}
                    onChange={onChangeDesc}
                    value={desc}
                    autoComplete="off"
                /> 
            </Item>

            <ButtonArea>
                <button onClick={onReset}>초기화</button>
                <button onClick={onSubmit}>저장</button>
            </ButtonArea>
        </Form>
    );
};

GameListForm.propTypes = {
    gameName: PropTypes.string.isRequired,
};

export default GameListForm;