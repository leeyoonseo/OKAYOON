import React from 'react';
import styled from 'styled-components';

const Wrap = styled.footer`
    padding: ${({ theme }) => theme.calcRem(20)} 2%;
    text-align: center;
    font-size: ${({ theme }) => theme.calcRem(13)};
    box-sizing: border-box;
`;

const Footer = () => (
    <Wrap>
        Copyright 2021. Web Front-end developer portfolio
    </Wrap>
);

export default Footer;