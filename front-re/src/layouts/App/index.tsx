// import { FC } from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
// import loadable from '@loadable/component';

// const Main = loadable(() => import('@pages/Main'));
// // const SignUp = loadable(() => import('@pages/SignUp'));
// // const Workspace = loadable(() => import('@layouts/Workspace'));

// const App: FC = () => {
//   return (
//     // Switch: 여러개 라우터 중 하나만
//     <Switch>
//       <Redirect exact path="/" to="/main" />
//         <Route path="/login" component={Main} />
//         {/* <Route path="/signup" component={SignUp} /> */}
//         {/* main router를 가져오고 workspace 내에서 또 route를 통해 페이지 구분 */}
//         {/* <Route path="/workspace" component={Workspace} /> */}
//     </Switch>
//   );
// };

// export default App;

import React from 'react'

const App = () => {
  return (
    <div>App</div>
  )
}

export default App