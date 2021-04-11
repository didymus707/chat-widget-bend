const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const dropTables = () => {
  const queryText = 'SELECT EXISTS (SELECT relname FROM pg_class WHERE relname = chats);'
  pool.query(queryText)
    .then(res => {
      console.log(res);
      pool.end;
    })
    .catch(err => {
      console.log('err');
      process.exit(0);
    })
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  dropTables
};

require('make-runnable');