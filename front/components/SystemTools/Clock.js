import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';

const ClockWrapper = styled.div`
    text-align: center;
    color: ${props => props.themecolor}
`;

const Clock = ({ themecolor }) => {
    const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm'));


    useEffect(() => {
        let time = null;

        let timerInterval = setInterval(() => {
            time = dayjs();
            time = time.format('HH:mm');
            
            if(time === currentTime) return;
    
            setCurrentTime(time);
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    }, [currentTime]);

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