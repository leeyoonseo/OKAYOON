import { useEffect, useState } from 'react'
import App from '@layouts/App';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Home = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(Cookies.get('oky_nickname') ?? '');
  
  useEffect(() => {
    if(!nickname) {
      navigate('/entry');
    }
  }, [nickname]);

  return (
    <App>
      <div>Home</div>
    </App>
  )
}

export default Home