import gravatar from 'gravatar';
import { Wrap } from './styles';

interface Props {
  nickname: string;
  size: number;
}

const Avatar = ({
  nickname,
  size
}: Props) => {
  return (
    <Wrap style={{ width: `${size}px`, height: `${size}px` }}>
      { nickname ? (
        <img 
          src={gravatar.url(nickname, { s: `${size}px`, d: 'retro' })} 
          alt={nickname} 
        />
      ) : (
        <span className="avatar__empty">
          닉네임을 입력하세요.
        </span>
      )}
    </Wrap>
  )
}

export default Avatar;