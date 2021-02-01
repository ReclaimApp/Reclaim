import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import { Reducer } from "./store/Reducer";
import thunk from "redux-thunk";

const store = createStore(Reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
      <Router>
          <App />
      </Router> 
    </Provider>,
  document.getElementById("root")
);
