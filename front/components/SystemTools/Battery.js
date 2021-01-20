import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';

function getCurrentPercent(time){
    const totalMin = 24 * 60;
    const currentMin = (time.format('HH') * 60) + Number(time.format('mm'));
    
    return Math.floor(100 / (totalMin / currentMin));
}

const BatteryWrapper = styled.div`
    &:before {
        margin-right: 2px;
        display: inline-block;
        content: '${props => Math.floor(props.percent)}%';
        color: ${props => props.themecolor};
    }

    .gauge {
        display: inline-block;
        width: 28px;
        height: 12px;
        border: 1px solid ${props => props.themecolor};
        border-radius:3px;
    }

    .gauge:before {
        display: block;
        content: '';
        width: ${props => props.percent}%;
        height: 100%;
        background-color: ${props => props.themecolor};
    }
`;

const Battery = ({ themecolor }) => {
    const [time, setTime] = useState(dayjs());
    const [percent, setPercent] = useState(null);

    let timerInterval = null;

    useEffect(() => {
        timerInterval = setInterval(() => {
            setTime(dayjs());
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    }, []);

    useEffect(() => {
        const currentPer = getCurrentPercent(time);
        
        if(percent === currentPer){
            return;
        }

        setPercent(Math.floor(currentPer));
    }, [time]);

    return(
        <BatteryWrapper themecolor={themecolor} percent={percent}>
            <span className="gauge"></span>
        </BatteryWrapper>

    );
};

Battery.propTypes = {
    themecolor: PropTypes.string,
};

Battery.defaultProps = {
    themecolor: '#333',
};

export default Battery;

// [TODO]
// - dayjs 한글만 가져오도록 최적화