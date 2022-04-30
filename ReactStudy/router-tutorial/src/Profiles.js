import { NavLink, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';
// import WithRouterSample from './WithRouterSample';

const Profiles = () => {
  const style = {
    background: "black",
    color: "white",
  }

  return (
    <div>
      <h3>사용자 목록</h3>
      <ul>
        <li>
          <NavLink
            to="/profiles/juhyeon"
            style={({isActive})=>isActive ? style : undefined}
          >주현</NavLink>
        </li>
        <li>
          <NavLink
            to="/profiles/changmin"
            style={({ isActive }) => isActive ? style : undefined}
            //클래스네임 설정
            // className={({ isActive }) => 'navlink' + (isActive ? 'activated' : '')}
          >창민</NavLink>
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