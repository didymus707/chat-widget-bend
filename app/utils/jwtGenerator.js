const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(admin_id) {
  const payload = {
    admin: admin_id
  }

  return jwt.sign(payload, process.env.jwtSecret, {expiresIn: '1h'});
}

module.exports = jwtGenerator;