import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { colors, calcRem } from '../../theme/styles';

const Gauge = styled.span`
    display: inline-block;
    width: ${calcRem(25)};
    height: ${calcRem(15)};
    vertical-align: text-bottom;
    border: 1px solid ${({ themecolor }) => themecolor};

    &:before {
        display: block;
        content: '';
        width: ${({ percent }) => percent}%;
        height: 100%;
        background-color: ${({ themecolor }) => themecolor};
    }
`;

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
    themecolor: colors.black,
};

export default Battery;

// [TODO]
// - dayjs 한글만 가져오도록 최적화
// - 배터리 10% 미만일 때 깜빡 깜빡