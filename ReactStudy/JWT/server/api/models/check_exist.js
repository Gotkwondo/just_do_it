import db from './db';

export const check_exist_username = async (username) => {
  const isExist_username = await db.query(`SELECT name FROM account_info WHERE name="${username}";`);

  if (isExist_username[0].length === 0) {
    return false;
  }
  else {
    return true;
  }
}