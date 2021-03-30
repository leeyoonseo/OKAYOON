import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import styled from 'styled-components';

const Gauge = styled.span`
    display: inline-block;
    width: ${({ theme }) => theme.calcRem(25)};
    height: ${({ theme }) => theme.calcRem(15)};
    border: 1px solid ${({ themecolor }) => themecolor};

    &:before {
        display: block;
        content: '';
        width: ${({ percent }) => percent}%;
        height: 100%;
        background-color: ${({ themecolor }) => themecolor};
    }
`;

/**
 * 시간 값으로 배터리 % 구하기
 * @param {string} time : dayjs()
 * @returns 배터리 %
 */
function getPercent(time){
    const maxNum = 100;
    const dayMinutes = 24 * 60;
    const currentMinutes = (time.format('HH') * 60) + Number(time.format('mm'));

    // [D] 최대 값(100%) - (최대 값(100%) / 하루 총 분 / 현재 분) 
    return (maxNum - Math.floor(maxNum / (dayMinutes / currentMinutes)));
};

const Battery = ({ themecolor }) => {
    const [percent, setPercent] = useState(getPercent(dayjs()));

    useEffect(() => {
        let time = null;
        let per = null;

        let timerInterval = setInterval(() => {
            time = dayjs();
            per = getPercent(time);

            if (per === percent) return;

            setPercent(Math.floor(per));
            
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    }, [percent]);

    return(
        <Gauge 
            themecolor={themecolor} 
            percent={percent}
        />
    )
};

Battery.propTypes = {
    themecolor: PropTypes.string,
};

Battery.defaultProps = {
    themecolor: '#566270',
};

export default Battery;