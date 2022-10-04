import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DigitalClock from '@src/components/DigitalClock';
import { Wrap } from './styles';

const Sleep = () => {
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState<string>(getRandomColor());
  const handleClickAnywhere = useCallback(() => {
    const hasNickname = false; // guest 등록을 했을때 === 쿠키가 있을 경우
    if (hasNickname) {
      // ...
    } else {
      // ...
      navigate('/entry');
    }

  }, []);

  return (
    <Wrap 
      style={{ background: bgColor }}
      onClick={handleClickAnywhere}
    >
      <DigitalClock />
      <span className="sleep__noti">Click anywhere!</span>
    </Wrap>
  )
}

type colorType = 'rgb' | 'rgba';
function getRandomColor (colorType: colorType = 'rgba') {
  const r = getRandom(0, 255);
  const g = getRandom(0, 255);
  const b = getRandom(0, 255);
  let a = colorType === 'rgba' ? getRandom(3, 10) : '';

  if (typeof a === 'number') {
    a = a / 10;
  } else {
    a = '';
  }

  if (!r && !g && !b) {
    getRandomColor(colorType);
  }

  return `${colorType}(${r}, ${g}, ${b}${(colorType === 'rgba') ? `, ${a}` : ''})`;
}

const getRandom = (min: number, max: number): number | false => {
  if (min >= max) return false;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Sleep;