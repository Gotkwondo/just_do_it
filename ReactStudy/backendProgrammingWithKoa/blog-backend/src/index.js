const Koa = require('koa');

const app = new Koa();

//  서버에 접속하면 반환하는 신텍스 작성
app.use(ctx => {
  ctx.body = 'hello world';
});

//  서버 포트 설정
app.listen(4000, () => {
  console.log('Listening to port 4000');
});