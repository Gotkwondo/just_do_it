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
export const checkPassword = async (username) => {
  
  try {
    let check_password;
    db.getConnection(function(err, connect) {
      if (err) {
        return err;
      }
      else {
        check_password = connect.query(`SELECT password FROM account_info WHERE name="${username}";`);
        console.log(check_password);
        
      }
      db.releaseConnection(connect)
    })
    // const {check_password} = await connectDB.query(`SELECT password FROM account_info WHERE name="${username}";`);
    // console.log(Object.values(check_password).toString());
    // return check_password;
  }
  catch (e) {
    throw e;
  }
  finally {
    connectDB.release();
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



  
  // const user_exist = db.query(`SELECT name FROM account_info WHERE name="${username}";`);
  // if (user_exist) {
  //   return true;
  // }
  // else {
  //   return false;
  // }
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