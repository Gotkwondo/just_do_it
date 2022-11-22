import db from './db.js';
import bcrypt from 'bcrypt';

//  비밀번호 생성
export const setPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  // .then(hash => console.log(hash));
  // console.log(hash);
  return hash;
};

//  **************** 여기부터 문제 발생 ****************
export const checkPassword = async (username, password) => {
  
  try {
    const saved_hashed_pw = await db.query(`SELECT password FROM account_info WHERE name="${username}";`);
    console.log(typeof saved_hashed_pw[0][0].password, typeof password)
    const result = await bcrypt.compare(password, saved_hashed_pw[0][0].password);
    return result;
  }
  catch (e) {
    throw e;
  }
}

export const checkExistName = async (username) => {
  const isExist_username = await db.query(`SELECT name FROM account_info WHERE name="${username}";`);

  if (isExist_username[0].length === 0) {
    return false;
  }
  else {
    return true;
  }
}