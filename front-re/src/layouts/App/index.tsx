import { FC } from 'react'
import { Wrap, Header, Container, Footer } from './styles';

const App: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Wrap>
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

export default App

// TODO:
// footer: welcome, info, blog, github, log | logout 맥북처럼 가운데 아이콘으로 만들기