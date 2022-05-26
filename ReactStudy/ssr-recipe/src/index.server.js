import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import path from 'path';
import fs from 'fs';
import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './modules';
import PreloadContext from './lib/PreloadContext';

//  asset-mainfest.json 에서 파일 경로들을 조회한다.
const manifest = JSON.parse(
  fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf8')
);

const chunks = Object.keys(manifest.files)
  .filter(key => /chunk\.js$/.exec(key)) //  chunk.js로 끝나는 키를 찾아서
  .map(key => `<script src="${manifest.files[key]}"></script>`) //  스크립트 태그로 변환함
  .join('') //  합침

function createPage(root) {
  return `<!DOCTYPE html>
    <html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <title>React App</title>
    <link href="${manifest.files['main.css']}" rel="stylesheet" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
      ${root}
    </div>
    <script src="${manifest.files['runtime-main.js']}"></script>
    ${chunks}
    <script src="${manifest.files['main.js']}"></script>
  </body>
  </html>
  `;
} //  위의 runtime-main.js 참조는 현제 asset-manifest.json에 없으므로 적용안됨

const app = express();

//  서버 사이드 렌더링을 처리할 핸들러 함수이다.
const serverRender = async (req, res, next) => {
  //  이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해줌
  const context = {};

    //  리덕스를 server에 설정, 요청이 들어올 때마다 새로운 스토어를 만듬
  const store = configureStore(
    { reducer: rootReducer },
    applyMiddleware(thunk)
  );

  //  PreloadContext를 이용해 프로미스를 수집하고 기다렸다 다시 렌더링하는 작업
  const preloadContext = {
    done: false,
    promises: []
  };
  
  const jsx = (
    <PreloadContext.Provider value={preloadContext}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </PreloadContext.Provider>
  );

  ReactDOMServer.renderToStaticMarkup(jsx); //  renderToStaticMarkup으로 한번 렌더링 한다.
  try {
    await Promise.all(preloadContext.promises);  //  모든 프로미스를 기다린다.
  } catch (e) {
    return res.status(500);
  }
  preloadContext.done = true;

  const root = ReactDOMServer.renderToString(jsx);  //  레더링을 함
  res.send(createPage(root)); //  클라이언트에게 결과물 응답
};

const serve = express.static(path.resolve('./build'), {
  index: false  //  "/"경로에서 index.html을 보여주지 않도록 설정
});

app.use(serve); //  순서가 중요하다. serverRender 전에 위치해야 한다.
app.use(serverRender);

//  5000포트로 서버를 가동
app.listen(5000, () => {
  console.log('Running on http://localhost:5000');
});