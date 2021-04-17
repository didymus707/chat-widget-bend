const { Pool } = require('pg');
const express = require('express');
const router = express.Router();

// GET ROOMS
router.get('/api/get/chatrooms', (req, res, next) => {
  const customer_id = req.body.customer_id
  Pool.query(`SELECT email FROM customers
              WHERE customer_id = $1`, [ customer_id ], 
              (q_err, q_res) => {
                res.json(q.res.rows);
                console.log(q_err);
            });
});

