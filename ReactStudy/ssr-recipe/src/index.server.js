import ReactDOMServer from 'react-dom/server';

//서버에서 리액트 컴포넌트를 렌더링할 때는 ReactDOMServer의 renderToString함수를 사용한다.
//이 함수에 JSX를 넣어 호출하면 렌더링 결과를 문자열로 반환한다.
const html = ReactDOMServer.renderToString(
  <div>Hello Server Side Rendering!</div>
);

console.log(html);