import { Link, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
// import WithRouterSample from './WithRouterSample';

const Profiles = () => {
  return (
    <div>
      <h3>사용자 목록</h3>
      <ul>
        <li>
          <Link to="/profiles/juhyeon">주현</Link>
        </li>
        <li>
          <Link to="/profiles/changmin">창민</Link>
        </li>
      </ul>

      <Routes>
        <Route
          path="/*"
          element={<div>사용자를 선택해 주세요.</div>}
        />
        <Route path=":username" element={<Profile />} />
        {/* /profiles/:username 으로 useParams()을 통해 username을 확인 */}
        {/* /profiles/는 색략 가능 */}
      </Routes>
      {/* <WithRouterSample/> */}
    </div>
  );
};

export default Profiles;