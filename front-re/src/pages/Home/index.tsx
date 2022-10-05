import { useEffect, useState } from 'react'
import App from '@layouts/App';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  
  useEffect(() => {
    if(!nickname) {
      navigate('/entry');
    }
  }, []);

  return (
    <App>
      <div>Home</div>
    </App>
  )
}

export default Home