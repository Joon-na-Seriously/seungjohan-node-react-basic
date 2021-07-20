import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//Redux
import { Provider } from "react-redux";

import 'antd/dist/antd.css';

//Redux middleware
import {applyMiddleware, createStore} from "redux"; // or 'antd/dist/antd.less'
import promiseMiddleware from 'redux-promise'
import ReduxThunk from "redux-thunk";

//reducer
import Reducer from './_reducers';

//middleware for promise, thunk
const createStoreWithMiddleWare = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleWare(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
