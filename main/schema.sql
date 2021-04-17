CREATE TABLE admins (
  aid SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(25) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE customers (
  cuid SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT Null
);

CREATE TABLE chatrooms (
  chid SERIAL PRIMARY KEY,
  admin_id INT REFERENCES admins(aid),
  customer_id INT REFERENCES customer(cuid) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE chats (
  cid SERIAL PRIMARY KEY,
  chat VARCHAR(255) NOT NULL,
  chatroom_id INT REFERENCES chatrooms(chid),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);