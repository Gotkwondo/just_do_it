import jwt from 'jsonwebtoken';
import { checkExistName, generateToken, serialize } from '../models/user.js';

//  이 미들웨어를 사용하는 곳은 무조건 get,post,use 하는 곳에 추가해줘야 한다.
const jwtMiddlware = async (req, res, next) => {
  const { username, password } = req.body;
  const token = await req.headers.cookie.replace('access_token=', '');
  // console.log(token, "token 확인")
  if (!token) {
    console.log("토큰 없음")
    return next();  //  토큰 없음
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded, "middle decoded");
    const data = await serialize(decoded.username);
    // console.log(decoded, data, "decoded, data");
    // //  토큰의 유효기간이 3.5일 미만이면 재발급하는 코드
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 1000 * 60 * 60 * 24 * 3.5) {
      const user = await checkExistName(decoded.username);
      const token = generateToken(decoded.username, password);
      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, //  7일
        httpOnly: true,
      });
    }
    
    res.locals.user = data;
    next();
  }
  catch (e) {
    //  토큰 검증 실패
    return next();
  }
}

export default jwtMiddlware;