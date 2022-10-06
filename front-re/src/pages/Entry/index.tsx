import App from '@src/layouts/App';
import LoginForm from '@src/components/LoginForm';
import { Wrap } from './styles';

const Entry = () => {
  return (
    <App style={{ background: '#566270' }}>
      <Wrap>
        <LoginForm/>
      </Wrap>
    </App>
  )
}

export default Entry