CREATE TABLE chatrooms (
  chid SERIAL PRIMARY KEY,
  user_id INT REFERENCES admin_users(uid),
  customer_id INT REFERENCES customer(cuid)
);

CREATE TABLE admin_users (
  uid SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);
CREATE TABLE customer (
  cuid SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT Null
);

CREATE TABLE chats (
  cid SERIAL PRIMARY KEY,
  chat VARCHAR(255) NOT NULL,
  chatroom_id INT REFERENCES chatrooms(chid),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);