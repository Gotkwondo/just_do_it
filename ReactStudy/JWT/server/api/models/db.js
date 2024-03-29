import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config()

//  connection pools를 사용하면 이전의 연결을 재사용해 MySQL 서버 연결에
//  필요한 시간을 줄이고 연결되면 연결을 닫지 않고 열어둔다.
//  이로서 새 연결을 설정할 때 생기는 시간이 단축된다.
const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB,
  port: 3307,
  waitForConnections: true,
  connectionLimit: 10,
});

export default db;