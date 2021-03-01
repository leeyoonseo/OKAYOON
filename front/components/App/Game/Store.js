import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { STORE, NONSENSE_QUIZ, CATCH_MIND, LOAD_GAMELIST_REQUEST } from '../../../reducers/game';
import { DownSquareOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';

import Admin from './Admin/index';

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
    padding: 3% 0;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;

    &:after {
        content: '';
        display: block;
        clear: both;
}
`;

const SideNav = styled.ul`
    float: left;
    padding: 0;
    width: 100px;
    height: 100%;
    list-style: none;
`;

const NavItem = styled.li`
    text-align: center;

    & + li {
        margin-top: 20px;
    }
    
    button {
        ${initButtonStyled}
    }
`;

const Container = styled.div`
    float: left;
    padding: 0 3%;
    width: calc(100% - 100px);
    height: 100%;
`;

const ToolBox = styled.div`
    height: 30px;

    &:after {
        display: block;
        content: '';
        clear: both;
    }
`;

const OrderWrap = styled.div`
    position: relative;
    float:left;
    width: 100px;
`;

const OrderButton = styled.button`
    ${initButtonStyled}
`;

const OrderIcon = styled(DownSquareOutlined)`
    font-size: 16px;
`;

// TODO: 정렬
const OrderMenu = styled.div`
    display: none;
    position: absolute;
    top: 0;
    left: 0;
`;

const SearchWrap = styled.div`
    float: left;
    position: relative;
    width: calc(100% - 100px);
    text-align: right;
`;
const SearchInput = styled.input`
    padding: 0 20px 0 5px;
    width: 120px;
    height: 25px;
    color: #666;
    border: none;
    outline: none;
    background: #eee;
    box-sizing: border-box;
`;

const SearchButton = styled.button`
    ${initButtonStyled}
    position: absolute;
    right: 0;
    padding: 0 2px;
    height: 100%;
    line-height: 1;    
`;

const SearchIcon = styled(SearchOutlined)`
    color: #666;
    font-size: 15px;
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

const Store = ({ setComponent }) => {
    const dispatch = useDispatch();
    const { gameList } = useSelector((state) => state.game);
    const { admin } = useSelector((state) => state.user);
    const [isSetting, setIsSetting] = useState(false);

    useEffect(() => {
        dispatch({ 
            type: LOAD_GAMELIST_REQUEST 
        });
    }, []); 

    const onMoveStep = useCallback((compName) => () => {
        setComponent(compName);
    }, []);

    const onClickSetting = useCallback(() => {
        if (!admin) return;
        setIsSetting(!isSetting);
    }, [isSetting]);

    return (
        <>
            <Wrap>
                <SideNav>
                    <NavItem>
                        <button onClick={onMoveStep(STORE)}>홈</button>
                    </NavItem>
                    <NavItem>
                        <button>랭킹</button>
                    </NavItem>
                </SideNav>

                <Container>
                    <ToolBox>
                        <OrderWrap>
                            <OrderButton>
                                <OrderIcon />
                            </OrderButton>

                            <OrderMenu>
                                <button>ㄱㄴㄷ</button>
                                <button>ㅎㅍㅌ</button>
                            </OrderMenu>
                        </OrderWrap>

                        {/* TODO: 삭제할까? */}
                        <SearchWrap>
                            <SearchInput 
                                placeholder="검색"
                                maxLength={20}
                            />
                            <SearchButton>
                                <SearchIcon />
                                <span className="hidden">검색</span>
                            </SearchButton>
                        </SearchWrap>
                    </ToolBox>

                    <List>
                        {gameList && gameList.map((v) => {
                            return (
                                <Item 
                                    key={`game_${v.name}`}
                                    id={v.gameId}
                                >
                                    <ItemButton onClick={onMoveStep(v.name)}>
                                        <img src={v.image} alt={`게임 ${v.title} 표지`}/>

                                        <ItemTitle>{v.title}</ItemTitle>
                                        <ItemDesc>{v.description}</ItemDesc>
                                    </ItemButton>
                                </Item>
                            )   
                        })}
                        
                    </List>
                </Container>
            </Wrap>

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
    );
};

export default Store;