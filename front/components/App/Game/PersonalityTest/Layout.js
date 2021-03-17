import React from 'react';
import styled  from 'styled-components';

const Wrap = styled.div`
    font-family: 'Sunflower';
    display: flex;
    position: relative;
    padding: 5% 0;
    height: ${({ theme }) => theme.calcRem(550)};
    // height: calc(100% - ${({ theme }) => theme.calcRem(30)});
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