import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Wrap = styled.div`
    margin: 0 auto;
    max-width: 700px;
`;

const Items = styled.div`
    height: 50px;
    width: 19%;
    height: 100px;
    display: inline-block;

    &:nth-child(n+6) {
        margin-top: 10px;
    }

    & + div {
        margin-left: 1%;
    }    

    span {
        display: inline-block;
        padding: 5px;

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
            {skilsData.map((v, i) => (
                <Items 
                    key={`skils_${v.name}`}
                    className={v.name}
                >
                    <span>
                        <img src={v.src} alt={`${v.title} 아이콘`} />
                    </span>
                </Items>
            ))}
        </Wrap>
    );
};

export default Skils;