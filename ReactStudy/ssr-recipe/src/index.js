import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer, { rootSaga } from './modules';
import createSagaMiddleware from 'redux-saga';
import { loadableReady } from '@loadable/component';

const sagaMiddleware = createSagaMiddleware();

//  applyMiddleware는 store를 생성할 때 미들웨어를 적용시켜준다.(미들웨어가 여려개인 경우 파라미터로 여러개 전달, 순서대로 지정됨)
const store = configureStore(
  {
    reducer: rootReducer,
    middleware: [thunk, sagaMiddleware]
  },
  window.__PRELOADED_STATE__, //  이 값을 초기 상태로 사용함
);

sagaMiddleware.run(rootSaga);

//  renderㅎ마수 대신 hydrate함수를 이용
//  (hydrate는 SSR된 결과물이 이미 있는 경우 새로 렌더링 하지 않고 존재하는 UI에 이벤트만 연동하여 초기 구동시 리소스최적화로 성능 최적화를 함)
//  같은 내용을 쉽게 재사용할 수 있도록 렌더링할 내용을 하나의 컴포넌트로 묶음
const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

const root = document.getElementById('root');

//  프로덕션 환경에서는 loadableReady와 hydrate를 사용하고
//  개발 환경에서는 기존 방식으로 처리
if (process.env.NODE_ENV === 'production') {
  loadableReady(() => {
    ReactDOM.hydrate(<Root />, root);
  });
} else {
  ReactDOM.render(<Root />, root);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
