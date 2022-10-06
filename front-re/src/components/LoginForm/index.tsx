import {  FormEvent, useCallback, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useInput from '@src/hooks/useInput';
import { getRandomNumber } from '@utils/helper';
import Avatar from '@components/Avatar';
import { Wrap } from './styles';

const LoginForm = () => {
  const navigate = useNavigate();
  const [nickname, handleChangeNickname, setNickname] = useInput(Cookies.get('oky_nickname') ?? '');

  useEffect(() => {
    if (nickname) {
      navigate('/');
    }
  }, []);

  const onSubmitLogin = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let _nickname = nickname;

    if (!nickname.trim()) {
      _nickname = `guest${getRandomNumber()}`;
      setNickname(_nickname);
    }

    Cookies.set('oky_nickname', _nickname, { expires: 1 });
    navigate('/');
  }, [nickname]);

  return (
    <Wrap>
      <Avatar 
        size={62}
        nickname={nickname}
      />
      <form onSubmit={onSubmitLogin}>
        <label className="entry__input">
          <span className="hidden">nickname</span>
          <input 
            value={nickname} 
            placeholder="닉네임을 입력하세요." 
            onChange={handleChangeNickname}
          />
        </label>
        <button className="entry__button-submit">
          ↵
          <span className="hidden">입력</span>
        </button>
        {/* Sleep 위치 footer로 옮길 것 */}
        <Link 
          to="/sleep"
          className="entry__button-sleep"
          title="잠자기모드"
        >
          sleep
        </Link>
      </form>
    </Wrap>
  )
};

export default LoginForm;