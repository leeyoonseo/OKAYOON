import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
    position: absolute;
    left: 50%;
    bottom: 100%;
    display: block;
    min-width: ${({ theme }) => theme.calcRem(340)};
    color: white;
    transform: translateX(-50%);
`;

const Tip = styled.div`
    position: relative;
    display: inline-block;
    padding: 5%;
    font-size: ${({ theme }) => theme.calcRem(13)};
    text-align: center;
    word-break: keep-all;
    border-radius: ${({ theme }) => theme.calcRem(5)};
    background: rgba(0, 0, 0, 0.6);
    box-sizing: border-box;
    
    &:after {
        position: absolute;
        top: 100%;
        left: 50%;
        display: block;
        content: '';
        width: 0px;
        height: 0px;
        border-bottom: ${({ theme }) => theme.calcRem(10)} solid none;
        border-top: ${({ theme }) => theme.calcRem(10)} solid  rgba(0, 0, 0, 0.6);
        border-right: ${({ theme }) => theme.calcRem(10)} solid transparent;
        border-left: ${({ theme }) => theme.calcRem(10)} solid  transparent;
        transform: translate(-50%, 0);
    }
`;

const Tooltip = ({ message }) => (
    <Wrap>
        <Tip
            dangerouslySetInnerHTML={{ __html: message }}
        />
    </Wrap>
);

export default Tooltip;