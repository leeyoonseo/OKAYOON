import { createBrowserRouter } from "react-router-dom";
import loadable from '@loadable/component';

// Code Split
const Home = loadable(() => import('@pages/Home'));
const Game = loadable(() => import('@pages/Game'));
const Guestbook = loadable(() => import('@pages/Guestbook'));
const Photos = loadable(() => import('@pages/Photos'));
const Portfolio = loadable(() => import('@pages/Portfolio'));
const Sleep = loadable(() => import('@pages/Sleep'));

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/game',
    element: <Game />,
  },
  {
    path: '/guestbook',
    element: <Guestbook />,
  },
  {
    path: '/photos',
    element: <Photos />,
    // children: [
    //   {
    //     index: true,
    //     loader: homeLoader,
    //     element: <Home />,
    //   },
    //   {
    //     path: "about",
    //     element: <About />,
    //   },
    // ]
  },
  {
    path: '/portfolio',
    element: <Portfolio />,
  },
  {
    path: '/sleep',
    element: <Sleep />,
  },
  // TODO:
  // {
  //   path: "*",
  //   element: <NoMatch />,
  // },
]);