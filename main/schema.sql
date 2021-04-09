CREATE TABLE chatrooms (
  chid SERIAL PRIMARY KEY,
  user_id INT REFERENCES admin_users(uid),
  anonymous__id INT REFERENCES anonymous_user(aid)
);

CREATE TABLE admin_users (
  uid SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE chats (
  cid SERIAL PRIMARY KEY,
  messages VARCHAR(255) NOT NULL,
  chatroom_id INT REFERENCES chatrooms(chid),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE anonymous_user (
  aid SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) NOT Null
);