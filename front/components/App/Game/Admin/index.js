import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GAME_LIST, NONSENSE_QUIZ, CATCH_MIND, LOAD_GAMELIST_REQUEST, ADD_GAMELIST_REQUEST } from '../../../../reducers/game';
import { LeftOutlined } from '@ant-design/icons';

import { Wrap, BackButton, SelectArea, Title, Select, OptionItems, NotifyMessage } from './style';

import GameListForm from './GameListForm';
import NonsenseQuizForm from './NonsenseQuizForm';

const Admin = ({ list, onClickBack }) => {
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const [dataName, setDataName] = useState(null);

    const onClickOption = useCallback((name) => () => {
        setDataName(name);
    }, []);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const data = {};

        for (let i = 0; i < formRef.current.elements.length; i++) {
            if (formRef.current.elements[i].nodeName === 'INPUT') {
                let item = formRef.current.elements[i];

                if (!item.value || !item.value.trim()) {
                    return alert(`${item.placeholder}가 비었습니다`);
                }

                data[formRef.current.elements[i].name] = formRef.current.elements[i].value;
            }
        }

        dispatch({
            type: ADD_GAMELIST_REQUEST,
            data: data,
        });

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
                        <input 
                            type="radio" 
                            id={GAME_LIST} 
                            name="add-data" 
                            value={GAME_LIST} 
                            onClick={onClickOption(GAME_LIST)} 
                        />
                        <label htmlFor={GAME_LIST}>게임 리스트</label>
                    </OptionItems>

                    {list && list.map((v) => {
                        const attDisabled = (v.name === 'catchmind') ? true : false; 

                        return (
                            <OptionItems key={`admin_${v.name}`}>                                
                                <input 
                                    disabled={attDisabled}
                                    type="radio" 
                                    id={v.name} 
                                    name="add-data" 
                                    value={v.name} 
                                    onClick={onClickOption(v.name)} 
                                />
                                <label 
                                    htmlFor={v.name}
                                    disabled={attDisabled}
                                >
                                    {v.title}
                                </label>
                            </OptionItems>
                        )
                    })}
                </Select>  
            </SelectArea>

            {(() => {
                if (dataName === GAME_LIST) {
                    return (
                        <GameListForm
                            formRef={formRef}
                            onSubmit={onSubmit}
                        />
                    )
                }else if (dataName === NONSENSE_QUIZ) {
                    return (
                        <NonsenseQuizForm 
                            formRef={formRef}
                            onSubmit={onSubmit}
                        />
                    )
                }else {
                    return (
                        <NotifyMessage>
                            항목을 선택해주세요...
                        </NotifyMessage>
                    )
                }
            })()}
        </Wrap>
    );
};

export default Admin;