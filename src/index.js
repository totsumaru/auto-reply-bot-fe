import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import {store} from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
);
