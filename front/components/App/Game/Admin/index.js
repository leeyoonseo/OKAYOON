import React, { useCallback, useState } from 'react';
import { NONSENSE_QUIZ, CATCH_MIND, PERSONALITY_TEST } from '../../../../reducers/game';
import { LeftOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { Wrap, BackButton, SelectArea, Title, Select, OptionItems, NotifyMessage } from './style';

import NonsenseQuizForm from './NonsenseQuizForm';
import CatchMindForm from './CatchMindForm';

const Admin = ({ list, onClickBack }) => {
    const [dataName, setDataName] = useState(null);
    const onClickOption = useCallback(name => setDataName(name), []);

    return (
        <Wrap>
            <BackButton onClick={onClickBack}>
                <LeftOutlined />
                <span className="hidden">뒤로가기버튼</span>
            </BackButton>

            <SelectArea>
                <Title>데이터 항목 선택</Title>
                
                <Select>
                    {list && list.map(({ name, title }) => {
                        if (name === PERSONALITY_TEST) return;

                        return (
                            <OptionItems key={`admin_${name}`}>                                
                                <input 
                                    type="radio" 
                                    id={name} 
                                    name="add-data" 
                                    value={name} 
                                    onClick={(() => onClickOption(name))} 
                                />
                                <label 
                                    htmlFor={name}
                                >
                                    {title}
                                </label>
                            </OptionItems>
                        )  
                    })}
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
                            항목을 선택하세요.
                        </NotifyMessage>
                    )
                }
            })()}
        </Wrap>
    );
};

Admin.propTypes = {
    list: PropTypes.array.isRequired,
    onClickBack: PropTypes.func.isRequired,
};

export default Admin;