import jwt from 'jsonwebtoken';
import { serialize } from '../models/user.js';

//  이 미들웨어를 사용하는 곳은 무조건 get,post,use 하는 곳에 추가해줘야 한다.
const jwtMiddlware = async (req, res, next) => {
  const token = await req.headers.cookie.replace('access_token=', '');
  console.log(token, "token 확인")
  if (!token) {
    console.log("토큰 없음")
    return next();  //  토큰 없음
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded, "middle");
    const data = await serialize(decoded.username);
    // res.send(data)
    res.locals.user = data;
    next();
  }
  catch {
    //  토큰 검증 실패
    return next();
  }
}

export default jwtMiddlware;