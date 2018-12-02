import React from 'react';
import ReactDOM from 'react-dom';
// import App2 from './state/App';
import App from './components/App';
// import LocalStorage from './state/LocalStorage';
// import CounterContainer from './state/CounterContainer';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom'

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) {
  module.hot.accept();
}
