import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import { store } from './store';
import rootReducer from './store/reducers';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// In development, we will use client side rendering.
if(process.env.NODE_ENV === 'development') {
  ReactDOM.render(
  	<Provider store={store}>
  		<BrowserRouter>
  			<App />
  		</BrowserRouter>
  	</Provider>,
  	document.getElementById('root')
  );
}

// In production (npm run build), we will use server side rendering.
if(process.env.NODE_ENV === 'production') {
 // we don't import store directly, as the server pass store to client via window.__PRELOADED_STATE__
  // get preloaded state populated from server
  const preloadedState = window.__PRELOADED_STATE__;
  delete window.__PRELOADED_STATE__;
  const preloadedStore = createStore(rootReducer, preloadedState);
  
  // use hydrate() method instead of render(), because we tell react that we render page from server side
  // and then react will handle the rest.
  ReactDOM.hydrate(
  	<Provider store={preloadedStore}>
  		<BrowserRouter>
  			<App />
  		</BrowserRouter>
  	</Provider>,
  	document.getElementById('root')
  );   
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
