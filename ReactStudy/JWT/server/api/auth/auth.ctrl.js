import Joi from 'joi';
import db from '../models/db.js';
import { checkExistName, checkPassword, setPassword, generateToken, serialize } from '../models/user.js';

//  여기서 각 동작을 위한 api 작성
//  회원가입(완)
export const register = async (req, res) => {
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
    const exist_username = await checkExistName(username);
    // console.log(isExist_username[0].length)
    // res.send(`${isExist_username[0][0].name}, ${hspw}`)

    //  username이 이미 있는지 확인
    //  db에 같은 이름을 갖은 요청이 들어오면 INSERT하지 않게 끔 함
    if (exist_username) {
      //  exist_username의 0번 인덱스에는 RowDataPacket이 존재하고 
      //  이 안에 반환값이 있다면 length는 0 이상인 것을 확인
      res.status(409);
      res.send("already exist username")
      // console.log("이미 있음")
      return;
    }
    else {
      const hspw = await setPassword(password);
      await db.query(`INSERT INTO account_info (name,password) VALUES ("${username}","${hspw}");`);
      // res.body()  // 토큰 발급 및 검증에서 username과 _id(hashedpw)를 JSON형식의 객체로 보내주기
      const token = generateToken(username, password);
      const user_data = await serialize(username);
      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, //  7일
        httpOnly: true,
      });
      res.send(user_data)
    }
  } catch (e) {
    throw e  //  에러
  }
}

//  로그인
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401);
    res.send("id 혹은 pw 없음");  //  Unauthorized
    return;
  }

  try {
    const exist_username = await checkExistName(username);
    // const test_user = db.query(`SELECT name FROM account_info WHERE name="${username}";`)
    // console.log(user)
    if (!exist_username) {
      res.send("db에 유저 없음");
      return
    }

    const valid = await checkPassword(username, password);
    // console.log(valid, "valid");
    if (!valid) {
      res.status(401);
      res.send("잘못된 비밀번호입니다.");
      return
    }
    else if (valid) {
      // res.body()  
      // 토큰 발급 및 검증에서 username과 _id(hashedpw)를 JSON형식의 객체로 보내주기
      const token = generateToken(username, password);
      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, //  7일
        httpOnly: true,
      });
      res.send(`${serialize(username)}`);
    }
  }
  catch (e) {
    throw e;
  }
}

  //  로그인 상태 확인
export const check = async (req, res) => {
  // const user = req.user;
  console.log(req.user, "user업슴")
  // res.send(`${req.body}`)
  // if (!user) {
  //   res.status(401);
  //   return;
  // }
  // else {
  //   res.send("ehla");
  //   console.log(user, '1');
  // }
}
export const logout = (req, res) => {
  //  로그아웃
}