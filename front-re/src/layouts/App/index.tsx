import { FC } from 'react'
import { Header, Footer } from './styles';

const App: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div>
      <Header>Header</Header>
      <div>{children}</div>
      <Footer>Footer</Footer>
    </div>
  )
}

export default App

// TODO:
// footer: welcome, info, blog, github, log | logout 맥북처럼 가운데 아이콘으로 만들기