import Joi from 'joi';
import db from '../models/db.js';
import { checkExistName, checkPassword, setPassword } from '../models/user.js';

//  여기서 각 동작을 위한 api 작성

export const register = async (req, res) => {
  //  회원가입
  
  const schema = Joi.object().keys({

    //  객체가 다음 필드를 갖음을 검증
    username: Joi.string().alphanum().min(3).max(20).required(),
    //  문자열 타입, 알파벳과 0~9의 범위, 최소3 최대 20의 길이, 필수적인
    password: Joi.string().required()
  });
  //  validate() 현제 스키마와 옵션을 사용하여 값을 검증한다.
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400);
    res.body = result.error;
    return;
  }

  const { username, password } = req.body;
  try {
    let hspw = await setPassword(password);
    const isExist_username = await db.query(`SELECT name FROM account_info WHERE name="${username}";`);
    console.log(isExist_username[0][0].name, hspw)
    // console.log(hspw)
    // await db.getConnection(function(err, connect) {
    //   if (err) {
    //     return err;
    //   }
    //   const isExist_username = connect.query(`SELECT name FROM account_info WHERE name="${username}";`)
    //   console.log(isExist_username, hspw);
    //   db.releaseConnection(connect);
    // });
    //  username이 이미 있는지 확인
    //  db에 같은 이름을 갖은 요청이 들어오면 INSERT하지 않게 끔 함
    
    
    
    // await connectDB.query(`SELECT name FROM account_info WHERE name="${username}";`, (err, result) => {
    //   if (err) throw err;
    //   else {
    //     // console.log(result.length, "dddd")
    //     if (result.length === 0) {
    //       connectDB.query(`INSERT INTO account_info (name,password) VALUES ("${username}","${hspw}");`)
    //       res.send(`${username}님 어서오세요`)
    //     }
    //     else {
    //       res.send("이미 있는 사용자 입니다.")
    //     }
    //     // console.log(result.length, result)
    //   }
    // })
  } catch (e) {
    throw e  //  에러
  }
}

export const login = async (req, res) => {
  //  로그인
  const { username, password } = req.body;

  if (!username || !password) {
    res.send("유저 비번 없음");  //  Unauthorized
    return;
  }

  try {
    const user = await checkExistName(username);
    // const test_user = db.query(`SELECT name FROM account_info WHERE name="${username}";`)
    console.log(user)
    if (!user) {
      res.send("db에 유저 없음");
      return
    }

    const valid = await checkPassword(username, password);
    console.log(valid, "valid");
    if (!valid) {
      res.send("잘못된 비밀번호입니다.");
      return
    }
    else if (valid) {
      res.send(`${username}`);
    }
  }
  catch (e) {
    throw e;
  }
}

export const check = (req, res) => {
  //  로그인 상태 확인
}
export const logout = (req, res) => {
  //  로그아웃
}