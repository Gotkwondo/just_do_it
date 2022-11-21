import Joi from 'joi';
import db from '../models/db.js';
import { checkExistName, checkPassword, setPassword } from '../models/user.js';

//  여기서 각 동작을 위한 api 작성

export const register = async (req, res) => {
  //  회원가입
  const { username, password } = req.body;  
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

  try {
    const isExist_username = await db.query(`SELECT name FROM account_info WHERE name="${username}";`);
    // console.log(isExist_username[0].length)
    // res.send(`${isExist_username[0][0].name}, ${hspw}`)

    //  username이 이미 있는지 확인
    //  db에 같은 이름을 갖은 요청이 들어오면 INSERT하지 않게 끔 함
    if (isExist_username[0].length > 0) {
      //  isExist_username의 0번 인덱스에는 RowDataPacket이 존재하고 
      //  이 안에 반환값이 있다면 length는 0 이상인 것을 확인
      res.status(409);
      res.send("already exist username")
      // console.log("이미 있음")
      return;
    }
    else {
      const hspw = await setPassword(password);
      await db.query(`INSERT INTO account_info (name,password) VALUES ("${username}","${hspw}");`);
      res.send("welcome to join us")
      // console.log("회원가입 완료");
    }
  } catch (e) {
    throw e  //  에러
  }
}

// ***************** 에러 고치기 *****************
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
// ***************** 에러 고치기 *****************

export const check = (req, res) => {
  //  로그인 상태 확인
}
export const logout = (req, res) => {
  //  로그아웃
}