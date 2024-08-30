import * as icons from '@elvia/elvis-assets-icons';
import { addIcons } from '@elvia/elvis-icons';
import '@elvia/elvis/css/elvis.min.css';
import '@elvia/elvis/elvis.js';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const iconObj = Object.entries(icons).reduce(
  (acc, [name, icon]) => {
    acc[name] = { svg: icon.getIcon() };
    return acc;
  },
  {} as Parameters<typeof addIcons>[0],
);

addIcons(iconObj);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
