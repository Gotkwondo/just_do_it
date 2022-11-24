import db from './db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    // console.log(typeof saved_hashed_pw[0][0].password, typeof password)
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
    return isExist_username[0][0].name;
  }
}

export const serialize = async (username) => {
  const hspw = await db.query(`SELECT password FROM account_info WHERE name="${username}";`);
  const data = JSON.stringify(
    {
      _id: hspw[0][0].password,
      username: username
    }
  );
  console.log(data, "user");
  return data;
}

export const generateToken = (username, password) => {
  const token = jwt.sign(
    //  첫번째 파라미터는 토큰 안에 넣고싶은 데이터를 넣는다.
    {
      username: username,
      password: password
    },
    process.env.JWT_SECRET, //  두 번째 파라미터에는 JWT 암호를 넣는다.
    {
      expiresIn: '7d' //  유효기간을 정함 (7일)
    },
  );
  return token;
}