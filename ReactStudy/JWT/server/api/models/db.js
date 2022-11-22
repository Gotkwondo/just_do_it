import mysql from 'mysql2/promise';

//  connection pools를 사용하면 이전의 연결을 재사용해 MySQL 서버 연결에
//  필요한 시간을 줄이고 연결되면 연결을 닫지 않고 열어둔다.
//  이로서 새 연결을 설정할 때 생기는 시간이 단축된다.
const db = mysql.createPool({
  host: process.env.REACT_APP_MYSQL_HOST,
  user: process.env.REACT_APP_MYSQL_USER,
  password: process.env.REACT_APP_MYSQL_PW,
  database: process.env.REACT_APP_MYSQL_DB,
  port: process.env.REACT_APP_MYSQL_PORT,
  // port: 3307,
  waitForConnections: true,
  connectionLimit: 10,
});

export default db;