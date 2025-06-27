import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import DINCondensed from './components/fonts/DIN-Condensed-Bold.ttf';

// Preload the DIN Condensed font so headers render with the correct typeface
const preloadFont = document.createElement('link');
preloadFont.rel = 'preload';
preloadFont.as = 'font';
preloadFont.href = DINCondensed;
preloadFont.type = 'font/ttf';
preloadFont.crossOrigin = 'anonymous';
document.head.appendChild(preloadFont);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

<Route exact path="/">
    <Navigate to="./Home" />
</Route>
