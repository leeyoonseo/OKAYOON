import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';

const BatteryWrapper = styled.div`
    // &:before {
    //     margin-right: 7px;
    //     display: inline-block;
    //     content: '${props => Math.floor(props.percent)}%';
    //     color: ${props => props.themecolor};
    // }

    .gauge {
        display: inline-block;
        width: 25px;
        height: 15px;
        vertical-align: text-bottom;
        border: 1px solid ${props => props.themecolor};
        // border-radius:3px;
    }

    .gauge:before {
        display: block;
        content: '';
        width: ${props => props.percent}%;
        height: 100%;
        background-color: ${props => props.themecolor};
    }
`;

function getCurrentPercent(time){
    const maxNum = 100;
    const dayMinutes = 24 * 60;
    const currentMinutes = (time.format('HH') * 60) + Number(time.format('mm'));

    // 최대 값(100%) - (최대 값(100%) / 하루 총 분 / 현재 분) 
    return (maxNum - Math.floor(maxNum / (dayMinutes / currentMinutes)));
};

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
        if (!time) return;
        const currentPer = getCurrentPercent(time);
        console.log('currentPer',currentPer)
        
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
// - 배터리 10% 미만일 때 깜빡 깜빡