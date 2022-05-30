import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import loadable from '@loadable/component'

//  loadable component로 RedPage, BluePage, UsersPage를 스플리팅 해준다.
const RedPage = loadable(() => import('./pages/RedPage'));
const BluePage = loadable(() => import('./pages/BluePage'));
const UsersPage = loadable(() => import('./pages/UsersPage'));

function App() {
  return (
    <div>
      <Menu />
      <hr />
      <Routes>
        <Route path="/red" element={<RedPage />} />
        <Route path="/blue" element={<BluePage />} />
        <Route path="/users/*" element={<UsersPage />} />
      </Routes>
    </div>
  );
};

export default App;
