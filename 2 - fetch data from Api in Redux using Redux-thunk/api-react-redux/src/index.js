import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import the createStore
// import applyMiddleware from redux
import { createStore, applyMiddleware } from "redux";
// second, we import redux-thunk
import thunk from "redux-thunk";
// import the Provider
import { Provider } from "react-redux";
// import the reducer
import reducer from "./reducers/Asynchronous_reducer";
// creating the Redux store
const store = createStore(reducer, applyMiddleware(thunk));


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
