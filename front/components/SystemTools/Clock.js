import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';

const ClockWrapper = styled.div`
    text-align: center;
    color: ${props => props.themecolor}
`;

const Clock = ({ themecolor }) => {
    const [timer, setTimer] = useState(dayjs());
    const [currentTime, setCurrentTime] = useState(null);

    let timerInterval = null;

    useEffect(() => {
        timerInterval = setInterval(() => {
            setTimer(dayjs());
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    }, []);

    useEffect(() => {
        if(timer.format('HH:mm') === currentTime){
        return;
        }

        setCurrentTime(timer.format('HH:mm'));
    }, [timer]);

    return(
        <ClockWrapper themecolor={themecolor}>
            {currentTime}
        </ClockWrapper>
    );
};

Clock.propTypes = {
    themecolor: PropTypes.string,
};

Clock.defaultProps = {
    themecolor: '#333',
};

export default Clock;