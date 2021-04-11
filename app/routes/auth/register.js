const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Post register
router.post('/api/post/register', (req, res, next) => {
  const values = [req.body.name, req.body.email, req.body.created_at];
  Pool.query(`INSERT INTO admin_users(name, email, created_at)
              VALUES($1, $2, NOW())
              ON CONFLICT DO NOTHING`, values,
              (q_err, q_res) => {
                res.json(q_res.rows)
                console.log(q_err)
              }
            )
});

// GET REGISTER
router.get('/api/get/register', (req, res, next) => {
  const email = String(req.body)
  Pool.query(`SELECT * FROM admin_users
              WHERE email = $1`, [ email ], values,
              (q_err, q_res) => {
                res.json(q_res.rows)
                console.log(q_err)
              }
            )
});

module.exports = router;