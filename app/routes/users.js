const express = require('express');
const router = express.Router();
const { pool } = require('../db/db');

// get users
router.get('/users', async (req, res, next) => {
  try {
    const users = await pool.query(`SELECT aid, name, email FROM admins`);
    res.json(users.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;