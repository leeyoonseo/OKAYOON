import React, { MouseEvent, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
import useInput from '@src/hooks/useInput';
import { Form } from './styles';
import dayjs from 'dayjs';


const LoginForm = () => {
  const navigate = useNavigate();
  // TODO: Cookie작업
  // const [cookies, setCookie, removeCookie] = useCookies(['oky_nickname']);

  const [nickname, handleChangeNickname, setNickname] = useInput('');

  const handleSaveNickname = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!nickname.trim()) {
      // let expires = new Date();
      // expires = expires.setHours(expires.getHours() + 24);
      const expireDate = new Date(2147483647 * 1000);
      const nickname = `guest${getRandomNumber()}`;
      setNickname(nickname);
      // console.log('dayjs', dayjs().date() + 1)
      // setCookie('oky_nickname', nickname, { expires: expireDate });
      // setCookie('oky_nickname', nickname, { expires: expires.setHours(expires.getHours() + 24) })
    }


    // TODO: 저장
    // navigate('/home');
  }, [nickname]);
  
  return (
    <Form>
      <label>
        <span className="hidden">nickname</span>
        <input 
          className="entry__input-nickname"
          value={nickname} 
          placeholder="닉네임을 입력하세요." 
          onChange={handleChangeNickname}
        />
      </label>
      <button 
        className="entry__button-submit"
        onClick={handleSaveNickname}
      >
        확인
      </button>
      <Link 
        to="/sleep"
        className="entry__button-sleep"
        title="잠자기모드"
      >
        sleep
      </Link>
    </Form>
  )
}

function getRandomNumber() {
  const Max = 10000;
  return Math.floor(Math.random() * Max);
}

export default LoginForm