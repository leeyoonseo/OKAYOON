import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
    width: 100%;
    height: 100%;

    button {
        width: 100%;
        height: 100%;
        background: #ddd;
        border: 1px solid #ccc;
        border-radius: 3px;
        outline: none;
        cursor: pointer;
    
        &:hover,
        &:focus {
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
        }

    }
`;

const TriggerButton = ({children}) => {
    return (
        <Wrap>
            <button>
                {children}
            </button>
        </Wrap>
    );
};

export default TriggerButton;