import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';

function App() {
  return (
    <>
      <Routes>
        {/* <Route path='/@:username' element={<LoginPage />} /> */}
        {['/@:username', '/', '/login'].map(path => <Route key={path} path={path} element={<LoginPage />} />)}
        <Route path='/register' element={<RegisterPage />} />

      </Routes>
    </>
  );
}

export default App;
