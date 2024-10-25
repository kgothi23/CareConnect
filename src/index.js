import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Features from './features.js';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './Store';

ReactDOM.render (
  <StoreProvider>
    <Features />
  </StoreProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();