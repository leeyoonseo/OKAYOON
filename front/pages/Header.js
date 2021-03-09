import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

import { colors, calcRem } from '../theme/styles';
import SystemTools from '../components/SystemTools';

const Wrap = styled(Layout.Header)` 
    padding: 0;
    height: auto;
    color: ${colors.white};
    background: none;
`;

const Inner = styled.div`
    padding: 0 2%;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: ${calcRem(30)};
    align-items: center;
    justify-content: flex-end;
`;

const Header = ({ themecolor, setHeight }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        setHeight(ref.current.clientHeight);
    }, [ref])

    return (
        <Wrap>
            <Inner ref={ref}>
                <SystemTools themecolor={themecolor} />    
            </Inner>
        </Wrap>
    );
};

export default Header;