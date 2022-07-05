const Koa = require('koa');

const app = new Koa();

//  app.use 함수는 미들웨어 함수를 애플리케이션에 등록
//  ctx는 Context의 줄임말로, 웹 요철과 응답에 관한 정보를 지니고 있다.
//  next는 현재 처리중인 미들웨어의 다음 미들웨어를 호출하는 함수
//  미들웨어를 등록하고 next 함수를 호출하지 않으면, 그다음 미들웨어를 처리할 수 없다.

//  next() 함수가 반환하는 Promise를 이용해 .then()을 사용한 방법
// app.use((ctx, next) => {
//   console.log(ctx.url);
//   console.log(1);
//   //  쿼리 파라미터를 조회하여 조건부로 미들웨어를 처리해줌
//   if (ctx.query.authorized !== '1') {
//     ctx.status = 401; //  Unauthorized
//     return;
//   }
//   //  next() 함수가 반환하는 Promise는 다음에 처리할 미들웨어가 끝나야 완료된다.(Koa와 Express와 차별되는 부분)
//   next().then(() => {
//     console.log('END');
//   });
// });

//  async/await를 이용한 방법(나중에 try, catch를 사용해보자)
app.use(async (ctx, next) => {
  console.log(ctx.url);
  console.log(1);
  //  쿼리 파라미터를 조회하여 조건부로 미들웨어를 처리해줌
  if (ctx.query.authorized !== '1') {
    ctx.status = 401; //  Unauthorized
    return;
  }
  //  next() 함수가 반환하는 Promise는 다음에 처리할 미들웨어가 끝나야 완료된다.(Koa와 Express와 차별되는 부분)
  await next();
  console.log('END');
  
});

app.use((ctx, next) => {
  console.log(2);
  next();
})

//  다음 미들웨어를 처리할 필요가 없는 라우트 미들웨어를 나중에 설정할 때 next생략하고 미들웨어 작성
app.use(ctx => {
  ctx.body = 'hello world';
});

//  서버 포트 설정
app.listen(4000, () => {
  console.log('Listening to port 4000');
});