const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool } = require('../../db/db');
const jwtGenerator = require('../../utils/jwtGenerator');
const validInfo = require('../../middleware/validInfo');

require('dotenv').config();

router.post('/login', validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM admins WHERE email = $1", [ email ]);
    
    if (user.rows.length === 0) {
      return res.json('Email or Password is incorrect!');
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.json('Email or Password is incorrect!');
    }

    const token = jwtGenerator(user.rows[0].aid);
    res.json({ token });

  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;



