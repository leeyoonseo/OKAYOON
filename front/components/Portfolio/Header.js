import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.header`
    position: relative;
    padding: 20px 2%;
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
    width: 20px;
    height: 20px;
    background: url(./icon_logo.png)no-repeat;
    background-size: 100% 100%;
`;

const Text = styled.span`
    padding-left: 22px;
    font-size: 22px;
    color: #ffd54f;
    text-shadow: 1px 1px 1px #666;
`;

const Nav = styled.div`
    display: inline-block;
    
    button {
        padding: 0;
        font-size: 17px;
        line-height: 1;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;

        & + button {
            margin-left: 50px;
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