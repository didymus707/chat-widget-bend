const express = require('express');
const app = require('../app');
const router = express.Router();

router.get('/', (req, res) => {
  res.json('I will know all there is to know about Nodejs soon');
});

module.exports = router;