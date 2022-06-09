import mysql from 'mysql2/promise';

export async function queryOnDatabase(sql, params) {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "root",
      database: "testverins",
    });
    console.log(`Executing  ${sql}`);
    const [results, ] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    throw new Error(error)
  }
}

export async function mutiStatementsQuery(sqlContent) {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "root",
      // described at https://www.npmjs.com/package/mysql#multiple-statement-queries
      multipleStatements: true,
      // your connection options follow here
    });
    await connection.execute(sqlContent)
    /* , (err) => { 
      console.log(err ? err : 'restored!')
    }); */    
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}


