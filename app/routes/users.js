const express = require('express');
const router = express.Router();
const { pool } = require('../db/db');

router.get('/api/users', async (req, res, next) => {
  try {
    const users = await pool.query(`SELECT * FROM admins`);
    res.json(users.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;