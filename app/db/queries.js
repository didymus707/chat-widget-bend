const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

pool.on('connect', () => {
  console.log('connected to the db');
});