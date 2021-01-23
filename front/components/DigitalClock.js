import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

const DigitalClockWrap = styled.div`
    font-size: 64px;
    color: #fff;

    span {
        display: inline-block;
    }

    span + span {
        margin-left: 1px;

        &:before {
            padding: 0 20px;
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

// TODO
// - 시간을 state로 하나로 관리하는게 나을지, 아니면 각각의 컴포넌트에서 구해서 사용해서 나을지.
// -- 디지털시계만 초 단위로 사용, 배터리랑 상단 시계는 분 단위로 사용
// -- 하나로 관리하게되면 reducer 호출을 계속하는게 어떤게 좋을지? (Clock.js 로직과 동일함...)