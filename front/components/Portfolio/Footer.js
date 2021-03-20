import React from 'react';
import styled from 'styled-components';

const Wrap = styled.footer`
    padding: 20px 2%;
    text-align: center;
    font-size: 13px;
    box-sizing: border-box;
`;

const Footer = () => {
    return (
        <Wrap>
            <h2 className="hidden">footer 영역</h2>

            Copyright 2021. Web Front-end developer portfolio
        </Wrap>
    );
};

export default Footer;