import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import { colors, calcRem } from '../theme/styles';

import Clock from '../components/DigitalClock';

const Wrap = styled.div`
    display: flex;
    height: ${({ h }) => h}px;
    justify-content: center;
    align-items: center;
    background: ${({ bg }) => bg};
`;

const Text = styled.span`
    position: fixed;
    bottom: 5%;
    font-size: ${calcRem(16)};
    color: ${colors.white};
    opacity: 0.8;
`;

const sleep = () => {
    const [windowH, setWindowH] = useState(null);
    const [bgcolor, setBgcolor] = useState('none');

    useEffect(() => {
        setBgcolor(getRandomColor('rgba'));
    }, []);

    useEffect(() => {
        const windowH = window.innerHeight;
        setWindowH(windowH);
    }, [windowH]);

    const onClick = useCallback(() => Router.replace('./login'), []);

    return(
        <>
            <Head>
                <title>OKAYOON | SLEEP</title>
            </Head>
            <Wrap
                h={windowH}
                onClick={onClick}
                bg={bgcolor}
            >
                <Clock />       

                <Text>
                    Click anywhere!
                </Text>
            </Wrap>
        </>
    );
};

function getRandomColor(isAlpha) {
    let r = getRand(0, 255);
    let g = getRand(0, 255);
    let b = getRand(0, 255);
    let a = getRand(3, 10) / 10;

    if (!r && !g && !b) {
        getRandomColor(isAlpha);
    }

    return `${isAlpha}(${r}, ${g}, ${b}${(isAlpha === 'rgba') ? `, ${a}` : ''})`;

    function getRand(min, max) {
        if (min >= max) return false;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
};

export default sleep;