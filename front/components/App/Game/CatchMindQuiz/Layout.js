import React from 'react';
import styled  from 'styled-components';

const Wrap = styled.div`
    position: relative;
    display: flex;
    height: calc(100% - ${({ theme }) => theme.calcRem(30)});
    font-family: 'Sunflower';
    text-align: center;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    button {
        font-family: 'Sunflower';
    }
`;

const Layout = ({ children }) => {
    return (
        <Wrap>
            {children}
        </Wrap>
    );
};

export default Layout;