import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { STORE, NONSENSE_QUIZ, CATCH_MIND, PERSONALITY_TEST } from '../../../reducers/game';
import styled, { css } from 'styled-components';
import { SettingOutlined } from '@ant-design/icons';

import Admin from './Admin/index';
import NonsenseQuiz from './NonsenseQuiz/Layout/index';
import CatchMindQuiz from './CatchMindQuiz/Layout/index';
import PersonalityTest from './PersonalityTest/Layout/index';

const Wrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const Inner = styled.div`
    display: inline-block;
`;

const List= styled.div`
    box-sizing: border-box;
    overflow-y: auto;

    & > div + div:not(:nth-child(3n+1)) {
        margin-left: 5%;
    }

    & > div + div:nth-child(n+4) {
        margin-top: ${({ theme }) => theme.calcRem(20)};
    }

    @media only screen and ${({ theme }) => theme.device.mobileS} {
        & > div + div:nth-child(n+4) {
            margin-top: 0;
        }

        & > div + div:nth-child(even) {
            margin-left: 5%;
        }

        & > div + div:nth-child(odd) {
            margin-left: 0;
        }

        & > div + div:nth-child(n+3) {
            margin-top: ${({ theme }) => theme.calcRem(15)};
        }
    }
`;

const Item = styled.div`
    display: inline-block;
    width: 30%;
    min-width: ${({ theme }) => theme.calcRem(120)};
    border: ${({ theme }) => theme.calcRem(2)} solid ${({ theme }) => theme.colors.black};
    border-radius: ${({ theme }) => theme.calcRem(10)};
    box-sizing: border-box;
    overflow: hidden;

    &:hover {
        box-shadow: 1px 1px ${({ theme }) => theme.calcRem(5)} ${({ theme }) => theme.colors.rgbaBlack};
    }

    @media only screen and ${({ theme }) => theme.device.mobileS} {
        width: 45%;
    }
`;

const ItemButton = styled.button`
    padding: 0;
    width: 100%;
    font-size: ${({theme}) => theme.calcRem(16)};
    text-align: left;
    border: none;
    background: none;
    color: ${({theme}) => theme.colors.black};
    outline: none;
    cursor: pointer;

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
    text-align: center;
    line-height: 1;
    text-overflow:ellipsis; 
    white-space:nowrap;
    overflow: hidden;
`;

const SetButton = styled.button`
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0;
    line-height: 1;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const SetIcon = styled(SettingOutlined)`
    color: ${({ theme }) => theme.colors.black};
`;

const Game = () => {
    const { gameList } = useSelector(state => state.game);
    const { admin } = useSelector(state => state.user);
    const [component, setComponent] = useState(STORE);
    const [openedSetting, setOpenedSetting] = useState(false);

    const onChangeCategory = useCallback(compName => setComponent(compName), []);
    const onClickSetting = useCallback(() => setOpenedSetting(!openedSetting), [openedSetting]);
    
    return (
        <Wrap>
            {(() => {
                if (component === STORE) {
                    
                    if (admin.userId && openedSetting) {
                        return (
                            <Admin 
                                list={gameList}
                                onClickBack={onClickSetting} 
                            />
                        )
                    }

                    return (
                        <>
                            <List>
                                {gameList && gameList.map(({ name, gameId, image, title }) => (
                                    <Item 
                                        key={`game_${name}`}
                                        id={gameId}
                                    >
                                        <ItemButton 
                                            onClick={(() => onChangeCategory(name))}
                                        >
                                            <Image bg={image}>
                                                <span className="hidden">
                                                    {title} 표지
                                                </span>
                                            </Image>

                                            <Description>
                                                <Title>{title}</Title>
                                            </Description>
                                        </ItemButton>
                                    </Item>
                                ))}

                                {admin.userId && (
                                    <SetButton onClick={onClickSetting}>
                                        <SetIcon />
                                    </SetButton>
                                )}
                            </List>
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
                    } else if (component === PERSONALITY_TEST) {
                        return (
                            <PersonalityTest
                                onClickHome={onChangeCategory}
                            />
                        ) 
                    }
                }
            })()}
        </Wrap>
    );
};

export default Game;