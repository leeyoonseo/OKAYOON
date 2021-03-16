import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Inner = styled.div`
    display: inline-block;
    text-align: center;
    background: white;

    > div {
        padding: ${({ theme }) => theme.calcRem(10)};
    }

    span {
        display: block;
    
        &:nth-child(1) {
            margin-bottom: ${({ theme }) => theme.calcRem(10)};
            background: ${({ theme }) => theme.colors.yellow};
        }

        &:nth-child(2) {
            line-height: 1.25;
        }
    }
`;

const MenuInfo = () => {
    return (
        <Wrap>
            <Inner>
                <div>
                    <span>작업 기간</span>
                    <span>
                        2021.01 ~ 2021.03
                    </span> 
                </div>

                <div>
                    <span>사용</span>
                    <span>
                        React, redux-saga, reducer, next, antd, styled-components, eslint, dayjs, axios, immer
                        github, sequelize, mySQL, slick
                    </span>
                </div>

                <div>
                    <span>아이콘 출처</span>
                    <span>
                        Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from 
                        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                    </span>
                </div>
            </Inner>
        </Wrap>
    );
};

export default MenuInfo;

