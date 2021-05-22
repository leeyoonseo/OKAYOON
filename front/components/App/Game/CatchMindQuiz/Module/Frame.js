import React from 'react';
import PropTypes from 'prop-types';
import styled  from 'styled-components';

const Wrap = styled.div`
    position: relative;
    display: flex;
    height: ${({ theme }) => theme.calcRem(550)};
    font-family: 'Sunflower';
    text-align: center;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    button {
        font-family: 'Sunflower';
    }
`;

const Frame = ({ children }) => {
    return (
        <Wrap>
            {children}
        </Wrap>
    );
};

Frame.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
};

export default Frame;