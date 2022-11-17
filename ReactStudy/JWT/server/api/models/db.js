import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'oo991128',
  database: 'join&login_with_jwt',
  port: 3307
});


//  수정 시도 코드 시발
//   mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'oo991128',
//   database: 'join&login_with_jwt',
//   port: 3307
// });
// const db = async () => {
//   const database = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'oo991128',
//     database: 'join&login_with_jwt',
//     port: 3307
//   });
//   console.log("connect db");
//   return database;
// }


db.connect();
export default db;