import db from './db';
import bcrypt from 'bcrypt';

// const findByUsername = (username) => {
//   return 
// }

//  비밀번호 생성
export const setPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export const checkPassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
}
