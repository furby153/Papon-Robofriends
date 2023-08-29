import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { configureStore ,combineReducers } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { searchRobots, requestRobots } from './reducers';
import "./index.css";
import App from "./containers/App";
import "tachyons";
import reportWebVitals from "./reportWebVitals";

const logger = createLogger(); // Create a logger middleware instance

const rootReducer = combineReducers({ searchRobots, requestRobots });
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, logger]
  // Other options can be passed here as well
  }, 
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
