import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import DigitalClock from '../components/DigitalClock';

const bgImageUrl = 'https://cdn.pixabay.com/photo/2020/11/07/01/28/abstract-5719221_1280.jpg';

const SleepModeWrap = styled.div`
    display: flex;
    height: ${props => props.windowHeight}px;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImageUrl});
    background-size: cover;
`;

const sleep = () => {
    const [windowHeight, setWindowHeight] = useState(null);


    // todo 
    // window 클릭 react에서는 어떻게하는지 찾아보자
    useEffect(() => {
        console.log('window');
        window.addEventListener('keydown', () => {
            console.log('keydown');
        });

        return () => {
            window.removeEventListener('keydown');
        }
    }, []);

    useEffect(() => {
        const windowH = window.innerHeight;
        setWindowHeight(windowH);
    }, [windowHeight]);
    
    const onKeyPressWindow = useCallback((e) => {
        console.log('onKeyPressWindow', e.key);
    }, []);

    const onClickWindow = useCallback((e) => {
        console.log('onClickWindow', e.target);
    }, []);

    return(
        <SleepModeWrap
            windowHeight={windowHeight}
            onKeyPress={onKeyPressWindow}
            onClick={onClickWindow}
        >
            <DigitalClock />       
        </SleepModeWrap>
    );
};

export default sleep;