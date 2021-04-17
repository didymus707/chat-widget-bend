const { Pool } = require('pg');
const express = require('express');
const router = express.Router();

// Post register
router.post('/api/post/chat', (req, res, next) => {
  const values = [req.body.messages, req.body.chatroom_id, req.body.created_at];
  Pool.query(`INSERT INTO chats(messages, chatroom_id, created_at)
              VALUES($1, $2, $3)`, values,
              (q_err, q_res) => {
                res.json(q_res)
                console.log(q_err)
              }
            )
});

// GET REGISTER
router.get('/api/get/chats', (req, res, next) => {
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