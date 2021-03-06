import React from 'react';
import PropTypes from 'prop-types';
import styled  from 'styled-components';

const Wrap = styled.div`
    font-family: 'Sunflower';
    display: flex;
    position: relative;
    padding: 5% 0;
    height: ${({ theme }) => theme.calcRem(550)};
    text-align: center;
    background: ${({ theme }) => theme.pColors.yellow};
    align-items: center;
    justify-content: center;

    button {
        font-family: 'Sunflower';
    }
`;

const Inner = styled.div`
    display: inline-block;
    width: 100%;
`;

const Frame = ({ children }) => {
    return (
        <Wrap>
            <Inner>
                {children}
            </Inner>
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