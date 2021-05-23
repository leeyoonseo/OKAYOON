import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ClockCircleOutlined } from '@ant-design/icons';

const TimerIcon = styled(ClockCircleOutlined)`
    margin-right: ${({ theme }) => theme.calcRem(5)};
    font-size: ${({ theme }) => theme.calcRem(20)};
`;

const Time = styled.span`
    font-size: ${({ theme }) => theme.calcRem(25)};
`;

const Timer = ({ MAX_TIME, isRunning, openedResult, setNext }) => {
    const [time, setTime] = useState(MAX_TIME);

    useEffect(() => {
        if (!isRunning) return;

        let timer = null;

        timer = setInterval(() => {
            setTime(time - 10);
        }, 100);

        if (time === 0) {
            setNext();
            clearInterval(timer);
            setTime(MAX_TIME);
        }

        return () => {
            clearInterval(timer);
        }
    }, [time, isRunning, MAX_TIME]);

    useEffect(() => {
        if (!isRunning && !openedResult) {
            setTime(MAX_TIME);
        }
    }, [isRunning, openedResult, MAX_TIME]);

    return (
        <>
            <TimerIcon />
            <Time>{Math.floor(time / 100)}</Time>
        </>
    );
};

Timer.propTypes = {
    MAX_TIME: PropTypes.number.isRequired, 
    isRunning: PropTypes.bool.isRequired, 
    setNext: PropTypes.func.isRequired, 
    openedResult: PropTypes.bool.isRequired,
};

export default Timer;