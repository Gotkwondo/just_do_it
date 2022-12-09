import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { rootSaga } from './modules/index.js';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';
import { tempSetUser, check } from './modules/user';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: [
    // composeWithDevTools(applyMiddleware(sagaMiddleware)),
    // composeWithDevTools,
    sagaMiddleware,
  ],
});

//  index.js에서 하는 이유: App.js에서 진행하게 된다면 렌더링 도중 깜박이는 사용자 경험을 전달하기 때문에 index.js에서 진행한다.
const loadUser = () => {
  try {
    const user = localStorage.getItem('user');
    if (!user) return; //  로그인 상태가 아니라면 그냥 return

    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check());
  }
  catch (e) {
    console.log('localStorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
