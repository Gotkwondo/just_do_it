import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import loadable from '@loadable/component'
const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>loading...</div>
}); //  loadable 함수의 두번째 파라미터에는 속성을 넣을 수 있다. https://loadable-components.com/docs/api-loadable-component/

const App = () => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  const onMouseOver = () => {
    SplitMe.preload();
  };  //  커서가 올라가면 preload()로 미리 로딩되게 함
      //  preload()외에 다른 기능들이 있음 (공식문서 확인 https://loadable-components.com/docs/getting-started/)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick} onMouseOver={onMouseOver}>Hello React</p>
        {visible&&<SplitMe />}
      </header>
    </div>
  )
}

export default App;
