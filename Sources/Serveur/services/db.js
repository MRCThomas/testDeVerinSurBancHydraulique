import mysql from 'mysql2/promise';
// import * as config from'../config';

export default async function query(sql, params) {
  const connection = await mysql.createConnection({
    /* don't expose password or any sensitive info, done only for demo */
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "testverins",
  });
  const [results, ] = await connection.execute(sql, params);

  return results;
}
