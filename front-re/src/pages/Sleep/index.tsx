import React, { useCallback, useEffect, useState } from 'react'
import DigitalClock from '@src/components/DigitalClock';
import { Wrap } from './styles';

const Sleep = () => {
  const [bgColor, setBgColor] = useState<string>(getRandomColor());

  return (
    <Wrap style={{ background: bgColor }}>
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