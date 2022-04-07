//tip 50 빌드 도구를 이용해 컴포넌트를 결합하라
//이번에는 자바스크립트 코드와 자산을 빌드 도구를 이용해 컴파일하는 방법을 배워보자

//이전에 컴포넌트 아키텍처의 이점을 살펴 보았고 컴포넌트 아키텍처의 대표적인 문제점인 브라우저의 내장 기능만으로 지원되지 않는 점을 알았다.
//프로젝트의 컴파일과 실행을 위해 create-react-app이 제공하는 도구를 사요했다. 처음에는 항상 미리 설계된 빌드 도구가 가져다주는 이점을 챙기는 것이 좋다.
//리액트뿐만 아니라 다른 프래임워크들도 자체 빌드 도구가 있다. 공식적인 빌드 도구가 없다면 깃허브에서 스타터팩을 찾아보는 것도 좋다.
//하지만 결국에 빌드 도구를 직접 다뤄야 하는 순간이 온다.

//이번에는 기본적인 빌드 프로세스를 구추해보자.
//빌드 도구는 다루기 힘들고, 최신 경향과 도구를 계속해서 따라가기가 어려울 수 있다.
import React from 'react';
import Copyright from './components/Copyright/Copyright';
export default function App() {
  return (
    <div className="main">
      <footer>
        <Copyright />
      </footer>
    </div>
  );
}
//위의 예제 코드를 JSX로 작성한 HTML과 약간의 자바스크립만 남기고 나머지 코드를 없애보자
//다뤄야할 자산이 적으면 딜드 도구를 만드는 것도 쉬워진다.
import React from 'react';
export default function CopyrightStatement() {
  const year = new Date().getFullYear();
  return (
    <div className='copyright'>
      Copyright {year}
    </div>
  );
}
//이 파일들이 단순하기는 하지만 브라우저에서 바로 실행할 수는 없다.
//실행 가능한 브라우제가 있다 해도 구형 브라우저에서는 실행이 불가능하다.
//import문, export문 등 ES6문법과 JSX로 작성된 코드를 브라우저에 호환되는 코드를 바꿀 수 있는 도구가 필요하다

//❗❗주의❗❗
//🔰현제 react폴더의 test폴더에 진행하고있으니 보면서 확인하자🔰

//바벨(babel)이라는 도구를 사용하면 최신 자바스크립트를 브라우저에서 실행 가능한 코드로 변환할 수 있다.
//바벨은 최신 자바스크립트를 다루는 데 필요한 중요한 도구이다.
//ES6이후의 문법으로 작성한 자바스크립트를 변환할 수 있을 뿐만 아니라 논의 단계에 있는 문법도 사용할 수 있다.

//바벨은 코드를 변환하지만 가져오기와 내보내기를 처리하는 모듈 로더(module loader)는 내장되어 있지 않는다.
//고로 모듈 로더 몇가지 중 한개를 선택해야 한다. 크게 웹팩과 롤업이 있는데 지금은 웹팩을 사용하겠다(일단 책에서 하는 대로 해보자)

//웹팩을 이용하면 자바스크립트 병합뿐만 아니라 CSS와 Sass처리, 이미지 변환도 해결할 수 있다.
//웹팩은 로더라고 부르는 방법을 이용해 파일 확장자에 따라 필요한 다른 동작을 선언할 수 있다.
//따라서 다양한 파일 형식을 다룰 수 있다.

//웹팩 설치에서 웹팩을 위한 바벨 로더도 설치해야 한다.
//로더는 다른 빌드 도수의 작업(task)이라 생각할 수 있다.
//바벨로 코드를 컴파일하는 것은 브라우저에서 실행 가능한 자바스크립트를 생성하는 과정이며, 이를 위해서는 babel-loader가 필요하다.
//npm install --save-dev babel-loader webpack-cli 명령으로 babel-loader를 설치하자

//또한 webpack.config.js파일도 생성해야 한다. 이 파일은 원본 코드의 진입점과 컴파일이 완료된 파일이 풀력될 경로를 선언한다.
//복잡하지만 각 단계에 대해서만 신경을 쓰는 것이 좋다.
//1️⃣처음에는 ES6와 리액트 코드를 변환하기 위해 바벨을 설치했고, 2️⃣모든 코드를 결합하기 위해 웹팩을 설치,
//3️⃣웹팩이 구체적인 자바스크립트를 어떻게 다룰지 설정, 4️⃣스타일과 자산을 처리하는 방법을 선언하는 단계로 기억하자

//웹팩은 정규 표현식을 사용해 로더마다 처리해야 할 파일을 정한다.
//자바스크립트를 다루기 때문에 확장자가 .js인 파일만 처리하려고 한다
//확장자가 .js인 파일을 발견했을 때 어떤 로더가 이것을 처리할지 설정해줘야 한다.
//지금은 webpack.config.js를 코딩하여 babel-loader를 실행하자

//마지막 단계는 웹팩을 실행하기 위해 package.json 스크립트를 수정하는 것이다.
//웹팩은 우리가 설정한 webpack.config.js파일을 확인하기 때문에 별도의 플래그나 인수가 필요하지 않는다.
// "scripts": {
//     "build": "babel src/index.js -o build/bundle.js"
// }
//위의 코드에서 아래의 코드로 바꾼다.
// "scripts": {
//     "build": "webpack"
//   }

//수정된 스크립트를 실행하면 브라우저에서 코드가 실행될 것이다.
//최종적인 목표는 모든 의존성을 처리하는 컴포넌트를 만드는 것이다.
//웹팩으로는 자바스크립트를 컴파일할 수 있을 뿐만 아니라, CSS를 컴파일하고 이미지를 불러올 수도 있다.
//먼저 CSS부터 살펴보자
//CSS를 가져와보자
import React from 'react';
import './Copyright.css';

export default function CopyrightStatement() {
  const year = new Date().getFullYear();
  return (
    <div className="copyright">
      Copyright {year}
    </div>
  );
}
//이제 CSS파일을 해석하기 위한 css-loader와 스타일을 페이지의 <head> 요소에 주입할 때 사용하는 style-loader를 설치하자

//로더를 설치했다면 웹팩 설정에서 확장자가 css로 끝나는 파일을 위한 로더를 추가하자
//이번에는 두개의 로더를 함깨 적용하기에 로더 이름을 문자열로 작성하지 않고 배열에 두개의 로더 이름을 작성한다.
//style-loader부터 추가하고 css-loader를 추가하자


//마지막으로 이미지를 처리하는 것이다.
//이미지는 컴파일하지 않는다. 다만 웹팩으로 파일을 옮기고 고유한 이름으로 파일명을 바꾼다.
//웹팩은 마크업에 있는 경로를 파일이 옮겨진 경로로 자동으로 바꿔준다.
//이미지를 불러오는 컴포넌트를 다시 한번 보자
import React from 'react';
import './IdeaButton.css';
import idea from './idea.svg';

export default function IdeaButton({ handleClick, message }) {
  return (
    <button
      className="idea-button"
      onClick={handleClick}
    >
      <img
        className="idea-button__icon"
        src={idea}
        alt="idea icon"
      />
      { message }
    </button>
  );
}
//이미지에 픅별한 조작을 하지 않으므로 file-loader를 사용하여 파일을 옮기고 경로를 갱신하자
//웹팩 설정에 svg파일을 위한 조건을 추가하자
//최종 웹팩 설정
const path = requre('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.svg?/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'build/',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.js?/,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    filename: 'build/bundle.js',
    path: path.resolve(__dirname),
  },
};

//설정을 마친 뒤 build 스크립트를 실행하고 index.html을 실행하면 컴포넌트를 확인할 수 있다.


//생각보다는 어렵지 않다고 하면 거짓말이다....
//SVG이외에도 더 많은 이미지가 필요할 것이고 CSS를 <style>태그에 푸가하는 대신 스타일시트 파일을 생성해야할 수도 있다.
//빌드 도구를 사용하면 이런 문제들을 해결할 수 있다.

//빌드 도구를 다룰 때 가장 중요한 것은 천천히 한번에 하나씩 추가하는 것이다.
//큰 프로젝트에 설정을 추가하는 것은 한번에 하나씩 추가하는 것보다 훨씬 어렵다.