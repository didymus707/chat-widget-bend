const { Pool } = require('pg');
const express = require('express');
const router = express.Router();

// POST ROOMS
router.post('/api/post/chatroom', ());

// GET ROOMS
router.get('/api/get/chatrooms', (req, res, next) => {
  const anon_user_id = req.body.anonymous_id
  Pool.query(`SELECT email FROM anonymous_user
              WHERE anonymous_id = $1`, [ anon_user_id ], 
              (q_err, q_res) => {
                res.json(q.res.rows);
                console.log(q_err);
            });
});

