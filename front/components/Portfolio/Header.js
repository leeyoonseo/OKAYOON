import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.header`
    position: relative;
    padding: ${({ theme }) => theme.calcRem(20)} 2%;
    text-align: right;
    box-sizing: border-box;
`;

const Logo = styled.span`
    position: absolute;
    left: 2%;
    vertical-align: top;
    line-height: 1;
`;

const Inner = styled.span`
    position: relative;
`;

const Icon = styled.span`
    position: absolute;
    display: inline-block;
    width: ${({ theme }) => theme.calcRem(20)};
    height: ${({ theme }) => theme.calcRem(20)};
    background: url(./icon_logo.png)no-repeat;
    background-size: 100% 100%;
`;

const Text = styled.span`
    padding-left: ${({ theme }) => theme.calcRem(22)};
    font-size: ${({ theme }) => theme.calcRem(22)};
    color: ${({ theme }) => theme.colors.black};
    text-shadow: 1px 1px 1px ${({ theme }) => theme.colors.black};
`;

const Nav = styled.div`
    display: inline-block;
    
    button {
        padding: 0;
        font-size: ${({ theme }) => theme.calcRem(17)};
        line-height: 1;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;

        & + button {
            margin-left: ${({ theme }) => theme.calcRem(50)};
        }

        &:hover {
            opacity: 0.5;
        }
    }
`;

const Header = () => {
    const onClickButton = useCallback((e) => {
        const target = document.querySelector(`.${e.target.dataset.name}`);
        window.scrollTo(0, target.offsetTop);
    }, []); 

    return (
        <Wrap>
            <Logo>
                <Inner>
                    <Icon /><Text>kayoon</Text>
                </Inner>
            </Logo>

            <Nav>
                <button 
                    onClick={onClickButton}
                    data-name="home"
                >
                    Home
                </button>
                
                <button
                    onClick={onClickButton}
                    data-name="iam"
                >
                    I am
                </button>
                
                <button
                    onClick={onClickButton}
                    data-name="portfolio"
                >
                    Portfolio
                </button>
                
                <button
                    onClick={onClickButton}
                    data-name="contact"
                >
                    Contact
                </button>
            </Nav>
        </Wrap>
    );
};

export default Header;