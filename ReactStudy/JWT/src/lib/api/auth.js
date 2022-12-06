import client from './client.js'

//  각 함수에서 return 하지 않는다면 RegisterForm.js에서 auth를 제대로 받아오지 못한다.

//  로그인
export const login = ({ username, password }) => {
  return client.post('/api/auth/login', { username, password });
};

//  회원가입
export const register = ({ username, password }) => {
  return client.post('/api/auth/register', { username, password });
};

//  로그인 상태 확인
export const check = () => {
  return client.get('/api/auth/check');
}