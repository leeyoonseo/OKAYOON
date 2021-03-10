import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import { colors, calcRem } from '../theme/styles';

const Wrap = styled(Layout.Footer)`
    padding: 0;
    font-size: ${calcRem(16)};
    line-height: 1;
    color: ${colors.white};
    background: ${colors.black};
    box-sizing: border-box;
`;

const Inner = styled.div`
    position: relative;
    padding: 0 2%;
    display: flex;
    min-height: ${calcRem(30)};
    align-items: center;
    justify-content: center;
`;

const Footer = ({
    setHeight,
    children,
}) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        setHeight(ref.current.clientHeight);
    }, [ref]);

    return (
        <Wrap>
            <Inner ref={ref}>
                {children}
            </Inner>
        </Wrap>
    );
};

export default Footer;