import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STORE, NONSENSE_QUIZ, CATCH_MIND, LOAD_GAMELIST_REQUEST } from '../../../reducers/game';
import styled, { css } from 'styled-components';
import { DownSquareOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';

import Controls from './Controls';
import NonsenseQuiz from './NonsenseQuiz/index';
import CatchMind from './CatchMind';

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

    img {
        margin-bottom: 10px;
        width: 100%;
        height: 120px;
    }
`;

const ItemTitle = styled.span`
    display: block;
    width: 100%;
    height: 1.5em;
    font-weight: 700;
    text-overflow:ellipsis; 
    white-space:nowrap;
    overflow: hidden;
`;

const ItemDesc = styled.span`
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
    const dispatch = useDispatch();
    const { gameList } = useSelector((state) => state.game);
    const { admin } = useSelector((state) => state.user);
    const [component, setComponent] = useState(STORE);
    const [muted, setMuted] = useState(false);
    const [isSetting, setIsSetting] = useState(false);

    useEffect(() => {
        dispatch({ 
            type: LOAD_GAMELIST_REQUEST 
        });
    }, []); 

    const onClickMute = useCallback(() => {
        setMuted(!muted);
    }, [muted]);

    const onClickGame = useCallback((compName) => () => {
        setComponent(compName);
    }, []);

    const onClickSetting = useCallback(() => {
        if (!admin) return;
        setIsSetting(!isSetting);
    }, [isSetting]);
    
    return (
        <Wrap>
            {component !== STORE && (
                <Controls
                    setComponent={setComponent} 
                    muted={muted}
                    onClickMute={onClickMute}
                />
            )}

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
                                            <ItemButton onClick={onClickGame(v.name)}>
                                                <img src={v.image} alt={`게임 ${v.title} 표지`}/>

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
                        return <NonsenseQuiz />;

                    } else if (component === CATCH_MIND) {
                        return <CatchMind />;
                    }
                }
            })()}
        </Wrap>
    );
};

export default Game;