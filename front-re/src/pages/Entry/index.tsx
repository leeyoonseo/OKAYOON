import { useCallback, MouseEvent } from 'react'
import useInput from '@src/hooks/useInput';
import App from '@src/layouts/App';
import { Wrap, Form } from './styles';
import { Link } from 'react-router-dom';

const Entry = () => {
  const [nickname, handleChangeNickname, setNickname] = useInput(`guest${getRandomNumber()}`);
  const handleSaveNickname = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!nickname.trim()) {
      setNickname(`guest${getRandomNumber()}`);
    }
  }, [nickname]);

  // TODO:
  // - 쿠키 저장하는 로직 추가 === redux? recoil? SWR?
  return (
    <App style={{ background: '#566270' }}>
      <Wrap>
        <Form>
          <input 
            className="entry__input-nickname"
            value={nickname} 
            placeholder="닉네임을 입력해주세요.." 
            onChange={handleChangeNickname}
          />
          <button 
            onClick={handleSaveNickname}
            className="entry__button-submit"
          >
            확인
          </button>
          <Link 
            to="/sleep"
            className="entry__button-sleep"
            title="잠자기모드"
          >
            zZzZ
          </Link>
        </Form>
      </Wrap>
    </App>
  )
}

function getRandomNumber() {
  const Max = 10000;
  return Math.floor(Math.random() * Max);
}

export default Entry