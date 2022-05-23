import logo from './logo.svg';
import './App.css';
import React, { useState, Suspense } from 'react';  // 책에서는 React를 import 하지 않았지만 실제 해보니 import해주지 않으면 동작을 안한다.
const SplitMe = React.lazy(() => import('./SplitMe'));

const App = () => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick}>Hello React</p>
        <Suspense fallback={<div>loading...</div>}>
          {visible&&<SplitMe />}
        </Suspense>
      </header>
    </div>
  )
}

export default App;
