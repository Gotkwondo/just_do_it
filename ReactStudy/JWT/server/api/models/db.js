import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'oo991128',
  database: 'join&login_with_jwt',
  port: 3307
});

db.connect();
// console.log(db.query("SELECT EXISTS(SELECT name FROM account_info) as isChk"))
export default db;