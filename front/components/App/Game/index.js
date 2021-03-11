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
    color: ${({theme}) => theme.colors.black};
    font-size: ${({theme}) => theme.calcRem(16)};
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
    box-sizing: border-box;
    overflow-y: auto;

    & > div + div:not(:nth-child(3n+1)) {
        margin-left: 5%;
    }
`;

const Item = styled.div`
    display: inline-block;
    width: 30%;
    min-width: ${({ theme }) => theme.calcRem(120)};
    border: 1px solid ${({ theme }) => theme.colors.black};
    box-sizing: border-box;
    overflow: hidden;

    &:hover {
        box-shadow: 1px 1px 5px ${({ theme }) => theme.colors.rgbaBlack};
    }
`;

const ItemButton = styled.button`
    ${initButtonStyled}
    width: 100%;
    text-align: left;

    &:hover {
        opacity: 1;
    }
`;

const Image = styled.div`
    width: 100%;
    height: ${({ theme }) => theme.calcRem(120)};
    border-bottom: 1px solid ${({ theme }) => theme.colors.black};
    background: url(${props => props.bg})no-repeat center;
    background-size: cover;
    box-sizing: border-box;
`;

const Description = styled.div`
    padding: ${({ theme }) => theme.calcRem(15)};
`;

const Title = styled.span`
    display: block;
    width: 100%;
    height: ${({ theme }) => theme.calcRem(16)};
    font-weight: 700;
    line-height: 1;
    text-overflow:ellipsis; 
    white-space:nowrap;
    overflow: hidden;
`;

const Text = styled.span`
    margin-top: ${({ theme }) => theme.calcRem(5)};
    display: -webkit-box;
    width: 100%;
    height: ${({ theme }) => theme.calcRem(48)};
    font-size: ${({ theme }) => theme.calcRem(14)};
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
                                                <Image bg={v.image}>
                                                    <span className="hidden">{v.title} 표지</span>
                                                </Image>

                                                <Description>
                                                    <Title>{v.title}</Title>
                                                    <Text>{v.description}</Text>
                                                </Description>
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