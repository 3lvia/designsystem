import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@elvia/elvis/css/elvis.min.css';
import '@elvia/elvis/elvis.js';

const root = document.getElementById('root');
let renderMethod;
if (root && root.innerHTML !== '') {
  renderMethod = ReactDOM.hydrate;
} else {
  renderMethod = (app) => ReactDOM.render(<React.StrictMode>{app}</React.StrictMode>);
}
renderMethod(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
