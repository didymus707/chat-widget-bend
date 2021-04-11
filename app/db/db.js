const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createAdminUsersTable = () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS
      admin_users(
        uid SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT now()
  )`;
  pool.query(queryText)
  .then(res => {
    console.log(res);
    pool.end;
  })
  .catch(err => {
    console.log(err);
    process.exit(0);
  })
}

const createCustomersTable = () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS
      chats(
        cuid SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) NOT Null
  )`;
  pool.query(queryText)
  .then(res => {
    console.log(res);
    pool.end;
  })
  .catch(err => {
    console.log(err);
    process.exit(0);
  })
}

const createChatRoomTable = () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS
      chatrooms(
        chid SERIAL PRIMARY KEY,
        user_id INT REFERENCES admin_users(uid),
        customer_id INT REFERENCES customer(cuid) 
  )`;
  pool.query(queryText)
  .then(res => {
    console.log(res);
    pool.end;
  })
  .catch(err => {
    console.log(err);
    process.exit(0);
  })
}

const createChatsTable = () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS
      chats(
        cid SERIAL PRIMARY KEY,
        chat VARCHAR(255) NOT NULL,
        chatroom_id INT REFERENCES chatrooms(chid),
        created_at TIMESTAMP NOT NULL DEFAULT now()
  )`;
  pool.query(queryText)
  .then(res => {
    console.log(res);
    pool.end;
  })
  .catch(err => {
    console.log(err);
    process.exit(0);
  })
}

const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS admin_users';
  pool.query(queryText)
    .then(res => {
      console.log(res);
      pool.end;
    })
    .catch(err => {
      console.log(err);
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