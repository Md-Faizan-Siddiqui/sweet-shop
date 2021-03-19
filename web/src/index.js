import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {GlobalStateProvider} from './context/globalContext'

ReactDOM.render(
  <GlobalStateProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GlobalStateProvider>,
  document.getElementById('root')
);