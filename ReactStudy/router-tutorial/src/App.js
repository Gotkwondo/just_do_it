import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Profiles from './Profiles';
import HistorySample from './HistorySample';

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
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
        <li>
          <Link to="/history">History 예제</Link>
        </li>
      </ul>
      <hr />
      {/* 새로운 버전의 react-route에서는 Route는 Routes를 사용해 래핑해야하고 element={<Home />}의 형태로 보여줄 컴포넌트를 설정해주면 된다 */}
      <Routes>
        {/* v6 부터는 exact 옵션이 삭제됬다. */}
        <Route path="/" element={<Home />} />

        {/* v6부터 path는 문자열만 올 수 있기에 배열 형태로 여러개를 적용하려면 map함수를 이용해야 한다. */}
        {/* <Route path="/about" element={<About/>} /> */}
        {["/about", "/info"].map(path => <Route key={path} path={path} element={<About />} />)}
        
        <Route path="/profiles/*" element={<Profiles />} />
        <Route path="/history" element={<HistorySample />} />

        {/* v6이후 switch가 Routes로 바뀌었다. 존재하지 않는 페이지 주소 입력 시 */}
        <Route path="/*" element={<h1>존재하지 않는 페이지 입니다.</h1>}/>
      </Routes>
    </div>
  );
};

export default App;