import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

const app = express();

//  서버 사이드 렌더링을 처리할 핸들러 함수이다.
const serverRender = (req, res, next) => {
  //  이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해줌
  const context = {};
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const root = ReactDOMServer.renderToString(jsx);  //  레더링을 함
  res.send(root); //  클라이언트에게 결과물 응답
};

app.use(serverRender);

//  5000포트로 서버를 가동
app.listen(5000, () => {
  console.log('Running on http://localhost:5000');
});