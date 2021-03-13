import React from 'react';
import styled  from 'styled-components';

const Wrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Sunflower';
    position: relative;
    padding: 5% 0;
    // padding: 5%;
    height: calc(100% - ${({ theme }) => theme.calcRem(30)});
    text-align: center;
    background: ${({ theme }) => theme.pColors.yellow};

    button {
        font-family: 'Sunflower';
    }
`;

const Inner = styled.div`
    display: inline-block;
    width: 100%;
`;

const Layout = ({ children }) => {
    return (
        <Wrap>
            <Inner>
                {children}
            </Inner>
        </Wrap>
    );
};

export default Layout;