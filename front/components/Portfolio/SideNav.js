import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
    position: fixed;
    top: 50%;
    right: 0;
    width: 50px;
    transform: translateY(-50%);
`;

const Item = styled.div`
    text-align: center;

    & + div {
        margin-top: 10px;   
    }
    
    button {
        padding: 0;
        width: 20px;
        height: 20px;
        font-size: 14px;
        font-weight: 700;
        line-height: 1;
        outline: none;
        border: 2px solid #ffbf2e;
        border-radius: 50%;
        background: #fff4ce;
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
                    <Item>
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