import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
    position: fixed;
    top: 50%;
    right: 0;
    width: ${({ theme }) => theme.calcRem(50)};
    transform: translateY(-50%);
`;

const Item = styled.div`
    text-align: center;

    & + div {
        margin-top: ${({ theme }) => theme.calcRem(10)};
    }
    
    button {
        padding: 0;
        width: ${({ theme }) => theme.calcRem(20)};
        height: ${({ theme }) => theme.calcRem(20)};
        font-size: ${({ theme }) => theme.calcRem(14)};
        font-weight: 700;
        line-height: 1;
        outline: none;
        border: 2px solid ${({ theme }) => theme.colors.yellow};
        border-radius: 50%;
        background: ${({ theme }) => theme.pfColors.yellow};
        overflow: hidden;
        cursor: pointer;
    }
`;

const nav = ['Home', 'I am', 'Portfolio', 'Contact'];

const SideNav = () => {
    const onClickButton = useCallback((e) => {
        const target = document.querySelector(`.${e.target.dataset.name}`);
        window.scrollTo(0, target.offsetTop);
    }, []); 

    return (
        <Wrap>
            {nav.map((v) => {
                const name = v.split(' ').join('').toLowerCase() 
                
                return(
                    <Item 
                        key={`nav_${name.charAt(0)}`}
                    >
                        <button
                            onClick={onClickButton}
                            data-name={name}
                        >
                            <span className="hidden">
                                {v}
                            </span>
                        </button>
                    </Item>
                )
            })}
        </Wrap>
    );
};

export default SideNav;