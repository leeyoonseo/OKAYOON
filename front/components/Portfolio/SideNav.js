import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getScrollY } from './Header';

const Wrap = styled.div`
    position: fixed;
    top: 50%;
    right: 2%;
    padding: ${({ theme }) => theme.calcRem(5)};
    line-height: 1;
    background: ${({ theme }) => theme.pfColors.lightYellow};
    border-radius: ${({ theme }) => theme.calcRem(5)};
    transform: translateY(-50%);
    z-index: 100;
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

const SideNav = () => {
    const { navList } = useSelector((state) => state.portfolio);
    const onClickButton = useCallback((e) => {
        const scrollY = getScrollY(e.target.dataset.name);
        window.scrollTo(0, scrollY);
    }, []); 

    return (
        <Wrap>
            {navList.map((v) => {
                const name = v.split(' ').join('').toLowerCase();
                
                return (
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