import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  // createBrowserRouter,
  RouterProvider,
  // Route,
} from "react-router-dom";
// import { BrowserRouter } from 'react-router-dom';
import './index.css';
import router from './src/routes/index';

const appNode = document.getElementById('app');

if (!appNode) {
  throw new Error('Failed to find the app element');
}

ReactDOM.createRoot(appNode).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
  </React.StrictMode>,
);
