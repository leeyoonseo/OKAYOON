import { useCallback, MouseEvent } from 'react'
import useInput from '@src/hooks/useInput';
import App from '@src/layouts/App';
import { Wrap } from './styles';
import { Link } from 'react-router-dom';
import LoginForm from '@src/components/LoginForm';

const Entry = () => {
  // const [nickname, handleChangeNickname, setNickname] = useInput(`guest${getRandomNumber()}`);
  // const handleSaveNickname = useCallback((e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   if (!nickname.trim()) {
  //     setNickname(`guest${getRandomNumber()}`);
  //   }
  // }, [nickname]);

  // TODO:
  // - 쿠키 저장하는 로직 추가 === redux? recoil? SWR?
  return (
    <App style={{ background: '#566270' }}>
      <Wrap>
        <LoginForm />
      </Wrap>
    </App>
  )
}

function getRandomNumber() {
  const Max = 10000;
  return Math.floor(Math.random() * Max);
}

export default Entry