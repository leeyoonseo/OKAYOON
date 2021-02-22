import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

import { STORE, NONSENSE_QUIZ, CATCH_MIND } from '../../../reducers/site';

import { DownSquareOutlined, SearchOutlined } from '@ant-design/icons';

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
`;

const Item = styled.div`
    display: inline-block;
    width: 120px;
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
    font-weight: 700;
`;

const ItemDesc = styled.span`
    display: -webkit-box;
    width: 100%;
    max-height: 3em;
    font-size: 12px;
    line-height: 1.6;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    opacity: 0.7;
`;

const Store = ({
    setComponent,
}) => {
    
    const onClick = useCallback((compName) => () => {
        setComponent(compName);
    }, []);

    return (
        <Wrap>
            <SideNav>
                <NavItem>
                    <button onClick={onClick(STORE)}>홈</button>
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
                    <Item>
                        <ItemButton onClick={onClick(NONSENSE_QUIZ)}>
                            <img src="https://t1.daumcdn.net/cfile/tistory/992576355E29A72519" />

                            <ItemTitle>넌센스퀴즈</ItemTitle>
                            <ItemDesc>당신의 센스를 알아봐요!</ItemDesc>
                        </ItemButton>
                    </Item>
                    
                </List>
            </Container>
        </Wrap>
    );
};

export default Store;