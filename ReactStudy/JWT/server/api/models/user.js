import db from './db.js';
import bcrypt from 'bcrypt';

// const findByUsername = (username) => {
//   return 
// }

//  비밀번호 생성
export const setPassword = (password) => {
  const hash = bcrypt.hash(password, 10);
  return hash;
}

export const checkPassword = (password, hashedPassword) => {
  const result = bcrypt.compare(password, hashedPassword);
  return result;
}
