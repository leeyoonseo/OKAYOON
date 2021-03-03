import React, { useCallback, useRef, useState } from 'react';
import { GAME_LIST, NONSENSE_QUIZ, CATCH_MIND } from '../../../../reducers/game';
import { LeftOutlined } from '@ant-design/icons';

import { Wrap, BackButton, SelectArea, Title, Select, OptionItems, NotifyMessage } from './style';

// import GameListForm from './GameListForm';
import NonsenseQuizForm from './NonsenseQuizForm';

const Admin = ({ list, onClickBack }) => {
    const [dataName, setDataName] = useState(null);

    const onClickOption = useCallback((name) => () => {
        setDataName(name);
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
{/* 
                    <OptionItems key={`admin_add_gamelist`}>
                        <input 
                            type="radio" 
                            id={GAME_LIST} 
                            name="add-data" 
                            value={GAME_LIST} 
                            onClick={onClickOption(GAME_LIST)} 
                        />
                        <label htmlFor={GAME_LIST}>게임 리스트</label>
                    </OptionItems> */}
                </Select>  
            </SelectArea>

            {(() => {
                // if (dataName === GAME_LIST) {
                //     return (
                //         <GameListForm
                //             gameName={dataName}
                //         />
                //     )
                // }else 
                
                if (dataName === NONSENSE_QUIZ) {
                    return (
                        <NonsenseQuizForm 
                            gameName={dataName}
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