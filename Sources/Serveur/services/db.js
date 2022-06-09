import mysql from 'mysql2/promise';

export async function query(sql, params) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "testverins",
  });
  console.log(`[SQL] Execting : ${sql}`);
  const [results, ] = await connection.execute(sql, params);

  return results;
}
