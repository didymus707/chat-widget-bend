const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createAdminsTable = () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS
      admins(
        aid SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        updated_at TIMESTAMP NOT NULL DEFAULT now()
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
      customers(
        cuid SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
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

const createChatRoomsTable = () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS
      chatrooms(
        chid SERIAL PRIMARY KEY,
        admin_id INT REFERENCES admins(aid),
        customer_id INT REFERENCES customers(cuid) NOT NULL,
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

const dropAdminsTable = () => {
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

const dropCustomersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS customers';
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

const dropChatRoomsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS chatrooms';
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

const dropChatsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS chats';
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

const createAllTables = () => {
  createAdminsTable(),
  createCustomersTable(),
  createChatRoomsTable(),
  createChatsTable()
}

const dropAllTables = () => {
  dropAdminsTable(),
  dropCustomersTable(),
  dropChatRoomsTable(),
  dropChatsTable()
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createAdminsTable,
  createCustomersTable,
  createChatRoomsTable,
  createChatsTable,
  createAllTables,
  dropAdminsTable,
  dropCustomersTable,
  dropChatRoomsTable,
  dropChatsTable,
  dropAllTables
};

require('make-runnable');