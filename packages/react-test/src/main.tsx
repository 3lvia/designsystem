import '@elvia/elvis/css/elvis.min.css';
import '@elvia/elvis/elvis.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import { Breadcrumb } from './Breadcrumb';
import { Components } from './Components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Components />,
      },
      { path: '/search', element: <Breadcrumb /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
