import './styles/index.css';
// import App from './App';

import React from 'react';
import ReactDOM from 'react-dom';
// import GlobalStyle from './styles/globalStyle';
import Navbar from './components/menu/Navbar';

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
  </React.StrictMode>,
  document.getElementById('root')
);
