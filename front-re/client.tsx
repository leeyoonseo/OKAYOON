import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import router from './src/routes/index';
import './index.css';

const appNode = document.getElementById('app');

if (!appNode) {
  throw new Error('Failed to find the app element');
}

ReactDOM.createRoot(appNode).render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>,
);
