// import { Fragment } from 'react';
import React from 'react';
import './App.css';

function App() {
  const name1 = `React`;
  const name2 = undefined;
  const style = {
    backgroundColor: `black`,
    color: `aqua`,
    fontSize: `48px`,
    fontWeight: `bold`,
    padding: 16 //  단위를 생략하면 px로 지정된다
  };
  return (
    <div>
      <div>{(name1 === `React` ? <h1>리액트 if 문 대신 조건부 연산자 사용</h1> : <h1>라액트 아님</h1>)}</div>
      
      <div>{name1 === `React` && <h1>리액트 &&연산자 사용 조건부 렌더링</h1>}</div>
      
      <div>{name2}</div>  {/*undefined일때는 빈칸으로 null이 출력, JSX내부에서 undefined랜더링은 가능하다*/}
      <div>{name2 || `undefined일때 문구 표현`}</div>
      {/* 기본적으로 name || `표시할 문구`; 의 형식으로 사용하는게 기본, 하지만 유연함을 찾아서 사용할 것*/}

      <div style={style}>인라인 스탕일링을 통한 스타일 적용</div>
      {/* 미리 스타일 객체를 선언 하지 않을려면 style={{backgroundColor:`black`}}의 형태로 작성해야 한다 */}

      <div className="react">class대신 className을 이용한 css적용</div>

      <div>
        <div className="react">닫아야 하는 태그, self-closing태그</div>
        <input></input>
        {/* <input />이렇게 사용해도 닫힌다. 이 방법은 self-closing 태그라 한다. */}
      </div>

      {/* 주석은 항상 이러한 폼으로 작성해야하며 이외의 폼은 모두 화면에 출력된다. */}
    </div>
    
  );
}

export default App;
