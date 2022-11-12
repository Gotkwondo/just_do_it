import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'oo991128',
  database: 'join&login_with_jwt',
  port: 3307
});

db.connect();

export default db;