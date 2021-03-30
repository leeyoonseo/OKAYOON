import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrap = styled.div`
    margin: 0 auto;
    max-width: ${({ theme }) => theme.calcRem(700)};
`;

const Items = styled.div`
    display: inline-block;
    width: 19%;
    height: ${({ theme }) => theme.calcRem(100)};

    &:nth-child(n+6) {
        margin-top: ${({ theme }) => theme.calcRem(10)};
    }

    & + div {
        margin-left: 1%;
    }    

    span {
        display: inline-block;
        padding:${({ theme }) => theme.calcRem(5)};

        img {
            width: 100%;
        }
    }

    &.jquery {
        span {
            background: #0769ad;
        }
    }

    &.styled_components {
        span {
            background: #3e3e3e;
        }
    }
`;

const Skils = () => {
    const { skilsData } = useSelector((state) => state.portfolio);
    
    return (
        <Wrap> 
            {skilsData.map(({ name, title, src }) => (
                <Items 
                    key={`skils_${name}`}
                    className={name}
                >
                    <span>
                        <img 
                            src={src} 
                            alt={`${title} 아이콘`} 
                        />
                    </span>
                </Items>
            ))}
        </Wrap>
    );
};

export default Skils;