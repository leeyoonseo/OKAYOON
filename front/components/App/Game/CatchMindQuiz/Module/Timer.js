import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.div`
    display: inline-block;
    width: ${({ theme }) => theme.calcRem(400)};
`;

const Bar = styled.div`
    display: inline-block;
    width: 100%;
    height: ${({ theme }) => theme.calcRem(10)};
    text-align: center;
    border-radius: ${({ theme }) => theme.calcRem(3)};
    background: none;
    overflow: hidden;

    &:after {
        display: block;
        content: '';
        width: ${({ progress }) => progress}%;
        height: 100%;
        border-radius: ${({ theme }) => theme.calcRem(3)};
        background: ${({ progress }) => progress <= 30 ? '#eb6b66' : '#f5b36e'};
    }
`;

const Timer = ({ MAX_TIME, isRunning, setNextRound, openedResult }) => {
    const [time, setTime] = useState(MAX_TIME);

    useEffect(() => {
        if (!isRunning) return;

        let timer = null;

        timer = setInterval(() => {
            setTime(time - 10);
        }, 100);

        if (time === 0) {
            setNextRound();
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

    const getProgress = useCallback(() => {
        return (time / MAX_TIME) * 100;
    }, [time, MAX_TIME]);

    return (
        <Wrap>
            <Bar 
                progress={getProgress}
            />
        </Wrap>
    );
};

Timer.propTypes = {
    MAX_TIME: PropTypes.number.isRequired, 
    isRunning: PropTypes.bool.isRequired, 
    setNextRound: PropTypes.func.isRequired, 
    openedResult: PropTypes.bool.isRequired,
};

export default Timer;