import { createBrowserRouter } from "react-router-dom";
import App from '@layouts/App/index';

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);