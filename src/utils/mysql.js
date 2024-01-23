const dotenv = require('dotenv');
dotenv.config();
const mysql = require('serverless-mysql')({
    config: {
        host     : process.env.ENDPOINT,
        database : process.env.DATABASE,
        user     : process.env.USERNAME,
        password : process.env.PASSWORD
    }
})

// Función para realizar una consulta a la base de datos
async function query(sql, params) {
  return new Promise((resolve, reject) => {
    mysql.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Función para cerrar la conexión a la base de datos
async function end() {
  return mysql.end()
}

module.exports = { query, end };
