import { createBrowserRouter } from "react-router-dom";
import loadable from '@loadable/component';

// Code Split
const Home = loadable(() => import('@pages/Home'));

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  }
]);