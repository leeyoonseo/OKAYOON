import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
    position: relative;
    padding: 5%;
    height: calc(100% - ${({ theme }) => theme.calcRem(30)});
    text-align: center;
    background: ${({ theme }) => theme.nColors.lightPink};
    border-radius: 0 0 ${({ theme }) => theme.calcRem(20)} ${({ theme }) => theme.calcRem(20)};
`;

const Layout = ({ children }) => {
    return (
        <Wrap>
            {children}
        </Wrap>
    );
};

export default Layout;