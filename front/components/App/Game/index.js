import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { STORE, NONSENSE_QUIZ, CATCH_MIND } from '../../../reducers/game';
import styled, { css } from 'styled-components';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';

import Admin from './Admin/index';
import NonsenseQuiz from './NonsenseQuiz/index';
import CatchMindQuiz from './CatchMindQuiz/index';

const initButtonStyled = css`
    padding: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

const Wrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const HomeButton = styled.button`
    ${initButtonStyled}
`;

const List= styled.div`
    padding: 20px 0;
    height: calc(100% - 40px);
    box-sizing: border-box;
    overflow-y: auto;

    div + div:not(:nth-child(3n+1)) {
        margin-left: 5%;
    }
`;

const Item = styled.div`
    display: inline-block;
    width: 30%;
    min-width: 120px;
    overflow: hidden;
`;

const ItemButton = styled.button`
    ${initButtonStyled}
    width: 100%;
    height: 200px;
    text-align: left;

    &:hover {
        opacity: 1;
    }
`;

const ItemCover = styled.span`
    display: block;
    width: 100%;
    height: 120px;
    background: url(${props => props.bg})no-repeat;
    background-size: cover;
`;

const ItemTitle = styled.span`
    margin-top: 10px;
    display: block;
    width: 100%;
    height: 1.5em;
    font-weight: 700;
    text-overflow:ellipsis; 
    white-space:nowrap;
    overflow: hidden;
`;

const ItemDesc = styled.span`
    margin-top: 5px;
    display: -webkit-box;
    width: 100%;
    height: 3em;
    font-size: 12px;
    line-height: 1.6;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    opacity: 0.7;
`;

const SetButton = styled.button`
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 0;
    line-height: 1;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const Game = () => {
    const { gameList } = useSelector((state) => state.game);
    const { admin } = useSelector((state) => state.user);
    const [component, setComponent] = useState(STORE);
    const [isSetting, setIsSetting] = useState(false);

    const onChangeCategory = useCallback((compName) => () => {
        setComponent(compName);
    }, []);

    const onClickSetting = useCallback(() => {
        if (!admin) return;

        setIsSetting(!isSetting);
    }, [isSetting]);
    
    return (
        <Wrap>
            {(() => {
                if (component === STORE) {
                    return (
                        <>
                            <List>
                                {gameList && gameList.map((v) => {
                                    return (
                                        <Item 
                                            key={`game_${v.name}`}
                                            id={v.gameId}
                                        >
                                            <ItemButton onClick={onChangeCategory(v.name)}>
                                                <ItemCover bg={v.image}>
                                                    <span className="hidden">{v.title} 표지</span>
                                                </ItemCover>
                                                {/* <img src={v.image} alt={`게임 ${v.title} 표지`}/> */}

                                                <ItemTitle>{v.title}</ItemTitle>
                                                <ItemDesc>{v.description}</ItemDesc>
                                            </ItemButton>
                                        </Item>
                                    )   
                                })}
                            </List>

                            {admin && (
                                <SetButton onClick={onClickSetting}>
                                    <SettingOutlined />
                                </SetButton>
                            )}

                            {admin && isSetting && (
                                <Admin 
                                    list={gameList}
                                    onClickBack={onClickSetting} 
                                />
                            )}
                        </>
                    )
                } else {
                    if (component === NONSENSE_QUIZ) {
                        return (
                            <NonsenseQuiz 
                                onClickHome={onChangeCategory}
                            />
                        ) 
                    } else if (component === CATCH_MIND) {
                        return (
                            <CatchMindQuiz
                                onClickHome={onChangeCategory}
                            />
                        ) 
                    }
                }
            })()}
        </Wrap>
    );
};

export function shuffleArray (arr){
    let temp = arr.map((v) => {
        return cloneObject(v);
    });

    for(let i = temp.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }

    return temp;
};

export function cloneObject(obj) {
    let clone = {};

    for (var key in obj) {
        if (typeof obj[key] == 'object' && obj[key] != null) {
            clone[key] = cloneObject(obj[key]);
        } else {
            clone[key] = obj[key];
        }
    }

    return clone;
}

export default Game;