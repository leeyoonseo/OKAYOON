import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const LOGO_URL = './icon_logo.png';

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
    background: url(${LOGO_URL})no-repeat;
    background-size: 100% 100%;
`;

const Text = styled.span`
    padding-left: ${({ theme }) => theme.calcRem(22)};
    font-size: ${({ theme }) => theme.calcRem(22)};
    color: ${({ theme }) => theme.pfColors.yellow};
    text-shadow: 1px 1px 1px ${({ theme }) => theme.colors.black};
`;

const Nav = styled.div`
    display: inline-block;

    @media only screen and ${({ theme }) => theme.device.mobileS} {
        display: none;
    }
    
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
export const getScrollY = (name) => {
    return (name === 'home') 
        ? 0 
        : document.querySelector(`.${name}`).offsetTop;
};

const Header = () => {
    const { navList } = useSelector((state) => state.portfolio);
    const onClickButton = useCallback((e) => {
        const scrollY = getScrollY(e.target.dataset.name);
        window.scrollTo(0, scrollY);
    }, []); 

    return (
        <Wrap>
            <Logo>
                <Inner>
                    <Icon /><Text>kayoon</Text>
                </Inner>
            </Logo>

            <Nav>
                {navList.map((v) => {
                    const name = v.split(' ').join('').toLowerCase();

                    return (
                        <button 
                            key={`header_${name.charAt(0)}`}
                            onClick={onClickButton}
                            data-name={name}
                        >
                            {v}
                        </button>
                    )
                })}
            </Nav>
        </Wrap>
    );
};

export default Header;