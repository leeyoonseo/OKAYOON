import React, { useCallback, useRef, useState } from 'react';
import { NONSENSE_QUIZ, CATCH_MIND } from '../../../../reducers/game';
import { LeftOutlined } from '@ant-design/icons';

import { Wrap, BackButton, SelectArea, Title, Select, OptionItems, NotifyMessage } from './style';

import NonsenseQuizForm from './NonsenseQuizForm';
import CatchMindForm from './CatchMindForm';

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
                    {list && list.map((v) => (
                            <OptionItems key={`admin_${v.name}`}>                                
                                <input 
                                    type="radio" 
                                    id={v.name} 
                                    name="add-data" 
                                    value={v.name} 
                                    onClick={onClickOption(v.name)} 
                                />
                                <label 
                                    htmlFor={v.name}
                                >
                                    {v.title}
                                </label>
                            </OptionItems>
                        )
                    )}
                </Select>  
            </SelectArea>

            {(() => {
                if (dataName === NONSENSE_QUIZ) {
                    return (
                        <NonsenseQuizForm 
                            gameName={dataName}
                        />
                    )
                } else if (dataName === CATCH_MIND) {
                    return (
                        <CatchMindForm 
                            gameName={dataName}
                        />
                    )
                } else {
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