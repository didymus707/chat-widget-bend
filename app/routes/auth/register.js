require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('../../db/users');
const app = require('../../../main/app');
const router = express.Router();

// GET register
router.get('/register', (req, res, next) => {
  res.json('GET /register');
});

// Post register
router.post('/regiser', (req, res, next) => {
  res.json('POST /register')
});

module.exports = router;