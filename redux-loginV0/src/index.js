import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const preloadedState = {
  username: 'Paul',
  password: 'faul',
  isLoggedIn: false
}

const reducer = (state, action) => {
  // console.log(action);

  switch (action.type) {
    case 'LOGIN':
      if (action.username === state.username && action.password === state.password) {
        console.log('Login successful');
        return { ...state, isLoggedIn: true }
      } else {
        console.log('Login failed');
        return state
      }
      case 'LOGOUT':
      console.log('User logged out');
      return { ...state, isLoggedIn: false }

    default:
      return state
  }
}

const store = configureStore({reducer, preloadedState})

// store.subscribe(() => {
//   console.log(store.getState())
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
