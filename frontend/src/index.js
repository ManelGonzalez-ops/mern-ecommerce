import "core-js" //ojo que nos puede cagar
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import "./css/main.css"
import AppRedux from "./AppRedux"
import { Provider } from "react-redux"
import store from "./store"
import * as serviceWorker from './serviceWorker';
import ContextoComp from "./Context";





ReactDOM.render(

  <Provider store={store}>
    <ContextoComp>
      
      <AppRedux />
     
    </ContextoComp>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
