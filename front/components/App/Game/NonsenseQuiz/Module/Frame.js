import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.div`
    position: relative;
    padding: 5%;
    height: ${({ theme }) => theme.calcRem(500)};
    text-align: center;
    background: ${({ theme }) => theme.nColors.lightPink};
    border-radius: 0 0 ${({ theme }) => theme.calcRem(20)} ${({ theme }) => theme.calcRem(20)};
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