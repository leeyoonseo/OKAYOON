import { FC, CSSProperties } from 'react'
import { Wrap, Header, Container, Footer } from './styles';

interface Props {
  style?: CSSProperties
}

const App: FC<React.PropsWithChildren<Props>> = ({ 
  children,
  style,
}) => {
  return (
    <Wrap style={style}>
      <Header>
        <div className="header__inner">
          header
        </div>
      </Header>
      <Container>{children}</Container>
      <Footer>Footer</Footer>
    </Wrap>
  )
}

export default App;

// TODO:
// footer: welcome, info, blog, github, log | logout 맥북처럼 가운데 아이콘으로 만들기