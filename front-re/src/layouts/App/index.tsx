import Avatar from '@src/components/Avatar';
import Cookies from 'js-cookie';
import { FC, CSSProperties, useState, useEffect } from 'react'
import { Wrap, Header, Container, Footer } from './styles';

interface Props {
  style?: CSSProperties
}

const App: FC<React.PropsWithChildren<Props>> = ({ 
  children,
  style,
}) => {
  const [nickname, setNickname] = useState(Cookies.get('oky_nickname') ?? '');

  return (
    <Wrap style={style}>
      <Header>
        <div className="header__inner">
          header
        </div>
      </Header>
      <Container>{children}</Container>
      <Footer>
        <div className="footer__inner">
          <ul className="footer__host">
            {/* 아이콘 넣기 */}
            <span>Github</span>
            <span>Blog</span>
          </ul>

          {nickname ? (
            <div className="footer__menu">
              <div className="footer__avatar">
                <Avatar 
                  size={32}
                  nickname={nickname}
                />
              </div>
              
              <ul className="footer__menu-list">
                <li>Hello~ {nickname}</li>
                <li>Welcome</li>
                <li>Info</li>
                <li>Logout</li>
              </ul>
            </div>
          ): (
            // TODO:
            <span>Sleep 넣기</span>
          )}
        </div>
      </Footer>
    </Wrap>
  )
}

export default App;

// TODO:
// footer: welcome, info, blog, github, log | logout 맥북처럼 가운데 아이콘으로 만들기