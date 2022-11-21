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

//  **************** 여기부터 문제 발생 ****************
export const checkPassword = async (username, password) => {
  
  try {
    const saved_hashed_pw = await db.query(`SELECT password FROM account_info WHERE name="${username}";`);
    console.log(typeof saved_hashed_pw[0][0].password, typeof password)
    const result = await bcrypt.compare(password, saved_hashed_pw[0][0].password);
    return result;
    // const {check_password} = await connectDB.query(`SELECT password FROM account_info WHERE name="${username}";`);
    // console.log(Object.values(check_password).toString());
    // return check_password;
  }
  catch (e) {
    throw e;
  }

  // db.query(`SELECT password FROM account_info WHERE name="${username}";`,
  //     async (err, result) => {
  //       if (err) {
  //         throw err;
  //       }
  //       // console.log(result[0].password)
  //       await pushResult(result[0].password);
  //     }
  // )
  // console.log(hashedPassword,"hashedPassword");
}

  // const test_function = async (callback) => {
  //   db.query(`SELECT password FROM account_info WHERE name="${username}";`,
  //     (err, result) => {
  //       if (err) {
  //         callback(err);
  //       }
  //       callback(result);
  //     }
  //   )
  // }
  // // test_function((err, result) => {
  // //   hashedPassword + Object.values(result[0]).toString();
  // // })
  // const fun = () => {
  //   test_function(async (err, result) => {
  //     return Object.values(result[0]).toString();
  //   })
  //   // console.log(string)
  // }
  // fun()

  // console.log(hashedPassword);
  // db.query(`SELECT password FROM account_info WHERE name="${username}";`
  //   , async (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       return err;
  //     }
  //     if (result) {
  //       console.log(Object.values(result[0]).toString());
  //     }
  //   }
  // );
  // console.log(row);
  // const result = await bcrypt.compare(password, hashedPassword);
  // return result;
// };
//  **************** 문제 끝 부분 *******************

export const checkExistName = async (username) => {
  const isExist_username = await db.query(`SELECT name FROM account_info WHERE name="${username}";`);

  if (isExist_username[0].length === 0) {
    return false;
  }
  else {
    return true;
  }
}