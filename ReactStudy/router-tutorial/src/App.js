import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">설명</Link>
        </li>
      </ul>
      <hr />
      {/* 새로운 버전의 react-route에서는 Route는 Routes를 사용해 래핑해야하고 element={<Home />}의 형태로 보여줄 컴포넌트를 설정해주면 된다 */}
      <Routes>
        <Route path="/" element={<Home />} exact={true} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </div>
  );
};

export default App;