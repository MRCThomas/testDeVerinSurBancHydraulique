import mysql from 'mysql2/promise';

export async function queryOnDatabase(sql, params) {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "root",
      database: "testverins",
    });
    console.log(`La connexion à la base de donnée est effectuée : ${connection.threadId}`);
    const [results, ] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    throw new Error(error)
  }
}

export async function queryOnEngine(sql, params) {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "root",
      //database: "testverins",
    });
    console.log(`La connexion à la base de donnée est effectuée : ${connection.threadId}`);
    const [results, ] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    console.error(sql)
    throw new Error(error)
  }
}


