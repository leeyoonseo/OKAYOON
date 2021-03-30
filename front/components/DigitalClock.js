import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

const DigitalClockWrap = styled.div`
    font-size: ${({ theme }) => theme.calcRem(64)};
    color: white;

    span {
        display: inline-block;
    }

    span + span {
        margin-left: ${({ theme }) => theme.calcRem(1)};

        &:before {
            padding: 0 ${({ theme }) => theme.calcRem(20)};
            display: inline-block;
            content: ':';
        }
    }
`;

const DigitalClock = () => {
    const [timer, setTimer] = useState(dayjs());
    const [hour, setHour] = useState(null);
    const [min, setMin] = useState(null);
    const [sec, setSec] = useState(null);

    let intervalFunc = null;

    useEffect(() => {
        intervalFunc = setInterval(() => {
            setTimer(dayjs());
        }, 1000);

        return () => {
            clearInterval(intervalFunc);
        };
    }, []);

    useEffect(() => {
        if(timer.format('HH') !== hour){
            setHour(timer.format('HH'));
        }

        if(timer.format('mm') !== min){
            setMin(timer.format('mm'));
        }

        if(timer.format('ss') !== sec){
            setSec(timer.format('ss'));
        }
    }, [timer]);

    return(
        <DigitalClockWrap>
            <span>{hour}</span>
            <span>{min}</span>
            <span>{sec}</span>
        </DigitalClockWrap>
    )
};

export default DigitalClock;