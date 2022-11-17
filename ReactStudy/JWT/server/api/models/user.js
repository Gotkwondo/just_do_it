import db from './db.js';
import bcrypt from 'bcrypt';

// const findByUsername = (username) => {
//   return 
// }

//  비밀번호 생성
export const setPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  // .then(hash => console.log(hash));
  // console.log(hash);
  return hash;
};

// const querySQL = async (query) => {
//   // console.log(process.env.DB_HOST);
//   const connection = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'oo991128',
//   database: 'join&login_with_jwt',
//   port: 3307
//   });

//   const ret = await connection.query(query);
//   return ret;
// };
//  사용법 : await querySQL("쿼리문");

//  **************** 여기부터 문제 발생 ****************
export const checkPassword = async (username, password) => {
  
  let hashedPassword = "변경안됨"
  db.query(`SELECT password FROM account_info WHERE name="${username}";`
    , async (err, result) => {
      if (err) {
        console.log(err);
        return err;
      }
      if (result) {
        console.log(Object.values(result[0]).toString());
      }
    }
  );
  console.log(row);
  // const result = await bcrypt.compare(password, hashedPassword);
  // return result;
};
//  **************** 문제 끝 부분 *******************

export const checkExistName = async (username) => {
  // db.query(`SELECT name FROM account_info WHERE name="${username}";`, (err, result) => {
  //   if (err) throw err;
  //   else {
  //     // console.log(result, result.length)
  //     if (result.length === 0) {
  //       // console.log("없음")
  //       return false;
  //     }
  //     else {
  //       // console.log("있음")
  //       return true;
  //     }
  //   }
  // })
  const user_exist = db.query(`SELECT name FROM account_info WHERE name="${username}";`);
  if (user_exist) {
    return true;
  }
  else {
    return false;
  }
}
// export const checkExistName = async (username) => {

//   let exist;
//   db.query(`SELECT name FROM account_info WHERE name="${username}";`, (err, result) => {
//     if (err) return err;
//     if (result) {
//       exist = true;
//     }
//     else {
//       exist = false;
//     }
//     // console.log(Object.values(result[0]).toString());
//     // console.log(exist)
//   });
//   console.log(exist)
//   return exist;
// }