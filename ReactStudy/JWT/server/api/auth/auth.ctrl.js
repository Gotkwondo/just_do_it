import Joi from 'joi';
import db from '../models/db.js';
import { setPassword } from '../models/user.js';

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
    req.status = 400;
    req.body = result.error;
    return;
  }

  const { username, password } = req.body;
  try {
    //  username이 이미 있는지 확인
    // const exist = db.query("SELECT EXISTS(SELECT name FROM account_info) as isChk")
    // if (exist) {
    //   req.status(409); //  Conflict
    //   return;
    // }
    let hspw = await setPassword(password);
    // db.query(`INSERT INTO account_info (name,password) VALUES (${username},${hsqw})`)
    console.log(username, hspw);
    await res.send(`${username}, ${hspw}`)
    hspw = "deleted";
  } catch (e) {
    throw e;  //  에러
  }
}
export const login = (req, res) => {
  //  로그인
}
export const check = (req, res) => {
  //  로그인 상태 확인
}
export const logout = (req, res) => {
  //  로그아웃
}