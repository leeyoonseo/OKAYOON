import React from 'react';
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
    return (
        <Wrap>
            <Logo>
                <Inner>
                    <Icon /><Text>kayoon</Text>
                </Inner>
            </Logo>

            <Nav>
                <button>Home</button>
                <button>I am</button>
                <button>Portfolio</button>
                <button>Contact</button>
            </Nav>
        </Wrap>
    );
};

export default Header;