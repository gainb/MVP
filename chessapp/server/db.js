const { Pool } = require('pg');


const pool = new Pool({
  host: 'sdcdb-instance-1.cucdyuzurcan.us-east-1.rds.amazonaws.com',
  user: 'gainb',
  password: 'cnv7jnr0CVC6zur_jzm',
  database: 'postgres',
  post: 5432
})

const createAcc = (username, pass, chessname, callback) => {
  pool.connect()
  .then(client => {
    return client.query("INSERT INTO chessapp.users (username, password, chessname) VALUES ($1, crypt($2, gen_salt('bf')), $3)", [username, pass, chessname])
    .then(res => {
      client.release();
      callback(null, res)
    })
    .catch(err => {
      client.release();
      callback(err);
    })
  })
  .catch(err => {
    callback(err);
  })
}

const login = (username, pass, callback) => {
  pool.connect()
  .then(client => {
    return client.query("SELECT username, chessname FROM chessapp.users WHERE username = $1 AND password = crypt($2, password)", [username, pass])
    .then(res => {
      callback(null, res.rows);
    })
    .catch(err => callback(err))
  })
}

module.exports = {
  createAcc,
  login
};