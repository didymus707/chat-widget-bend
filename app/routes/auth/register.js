const express = require('express');
const router = express.Router();
const { pool } = require('../../db/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../../utils/jwtGenerator');
const validInfo = require('../../middleware/validInfo');

// Post register
router.post('/register', validInfo, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await pool.query("SELECT * FROM admins WHERE email=$1", [email]);
    if (user.rows.length !== 0) return res.status(401).send('User already exist!');
    
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const values = [name, email, bcryptPassword];
    const newUser = await pool.query(
      "INSERT INTO admins (name, email, password) VALUES ($1, $2, $3) RETURNING *", values
    );
    
    const token = jwtGenerator(newUser.rows[0].aid)
    res.json({ token });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// GET REGISTER
router.get('/user', (req, res) => {
  const email = String(req.body.email)
  Pool.query(`SELECT * FROM admin_users
              WHERE email = $1`, [ email ], values,
              (q_err, q_res) => {
                res.json(q_res.rows)
                console.log(q_err)
              }
            )
});

module.exports = router;