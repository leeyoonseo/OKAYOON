import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { bucketUrl } from '../../config/config';

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
    background: url(${bucketUrl}/icon_logo.png)no-repeat;
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
    
    a {
        padding: 0;
        font-size: ${({ theme }) => theme.calcRem(17)};
        line-height: 1;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;

        & + a {
            margin-left: ${({ theme }) => theme.calcRem(50)};
        }

        &:hover {
            opacity: 0.5;
        }
    }
`;

const Header = () => {
    const { navList } = useSelector(state => state.portfolio);

    return (
        <Wrap>
            <Logo>
                <Inner>
                    <Icon /><Text>kayoon</Text>
                </Inner>
            </Logo>

            <Nav>
                {navList.map(v => {
                    const name = v.toLowerCase();

                    return (
                        <a 
                            key={`header_${name.charAt(0)}`}
                            href={`#${name}`}
                        >
                            {v}
                        </a>
                    )
                })}
            </Nav>
        </Wrap>
    );
};

export default Header;