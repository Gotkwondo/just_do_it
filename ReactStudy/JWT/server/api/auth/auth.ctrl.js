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
    res.status(400);
    res.body = result.error;
    return;
  }

  const { username, password } = req.body;
  try {
    let hspw = await setPassword(password);

    //  username이 이미 있는지 확인
    //  db에 같은 이름을 갖은 요청이 들어오면 INSERT하지 않게 끔 함
    db.query(`SELECT name FROM account_info WHERE name="${username}";`, (err, result) => {
      if (err) throw err;
      else {
        // console.log(result.length, "dddd")
        if (result.length === 0) {
          db.query(`INSERT INTO account_info (name,password) VALUES ("${username}","${hspw}");`)
          res.send(`${username}님 어서오세요`)
        }
        else {
          res.send("이미 있는 사용자 입니다.")
        }
        // console.log(result.length, result)
      }
    })

    // const exist = db.query(`SELECT name FROM account_info WHERE name="${username}";`)
    // if (db.query("SELECT EXISTS(SELECT name FROM account_info) as isChk")) {
    //   res.status(409); //  Conflict
    //   return;
    // }
    // let exist = 0;

    // console.log(exist)
    // if (exist === 0) {
    //   db.query(`INSERT INTO account_info (name,password) VALUES ("${username}","${hspw}");`)
    //   await res.send(`${username}님 어서오세요`)
    // }
    // else {
    //     res.send("이미 있는 사용자 입니다.")
    // }
    //INSERT INTO `join&login_with_jwt`.`account_info` (`name`, `password`) VALUES ('123123', '14131');
    // console.log(typeof username);
    
    // console.log(exist);
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