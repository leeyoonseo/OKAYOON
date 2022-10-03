import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { Wrap } from './styles';

const DigitalClock = () => {
  const [timer, setTimer] = useState(dayjs());
  const [hour, setHour] = useState('00');
  const [min, setMin] = useState('00');
  const [sec, setSec] = useState('00');
  let intervalFunc: ReturnType<typeof window.setInterval> | null  = null;

  useEffect(() => {
    intervalFunc = setInterval(() => {
      setTimer(dayjs());
    }, 1000);

    return () => {
      if (intervalFunc) {
        clearInterval(intervalFunc);
      }
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


  return (
    <Wrap>
      <span>{hour}</span>
      <span>{min}</span>
      <span>{sec}</span>
    </Wrap>
  )
}

export default DigitalClock