import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';

import DigitalClock from '../components/DigitalClock';

const bgImageUrl = 'https://cdn.pixabay.com/photo/2020/11/07/01/28/abstract-5719221_1280.jpg';

const SleepModeWrap = styled.div`
    display: flex;
    height: ${props => props.h}px;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImageUrl});
    background-size: cover;
`;

const GuideText = styled.span`
    position: fixed;
    bottom: 5%;
    font-size: 12px;
    color: #fff;
    opacity: 0.8;
`;

const sleep = () => {
    const [windowH, setWindowH] = useState(null);

    useEffect(() => {
        const windowH = window.innerHeight;
        setWindowH(windowH);

    }, [windowH]);

    const onClickBackground = useCallback(() => {
        Router.replace('./login');
    }, []);

    return(
        <SleepModeWrap
            h={windowH}
            onClick={onClickBackground}
        >
            <DigitalClock />       

            <GuideText>
                Click anywhere!
            </GuideText>
        </SleepModeWrap>
    );
};

export default sleep;