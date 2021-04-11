const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const users = require('../../db/users');
const { createErr } = require('../../helper/util');

dotenv.config();

const validateUserDetails = (req, res, next) => {
  const userData = req.body;
  if (!userData.userName) {
    next(createErr("Please provide valid username", 4002));
    return;
  }
  if (!userData.password) {
    next(createErr("Please provide password", 4003));
    return;
  }
  next();
};

const validaiteAuthToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log(authHeader);
  if (!authHeader) {
    next(createErr("Needs login", 4002));
    return;
  }
  const authToken = authHeader.split(" ")[1];
  jwt.verify(
    authToken,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { algorithms: ["HS256"] },
    (err, user) => {
      if (!err) {
        next(err);
        return;
      }
      next();
    }
  );
};

router
  .route("/")
  .options()
  .post(validateUserDetails, async (req, res, next) => {
    // extract the userdata from request object.
    const { userName, password } = req.body;
    //validate with users object.
    const user = users.find(
      (user) =>
        (user.userName === userName || user.email === userName) &&
        user.password === password
    );

    // respond with proper handler
    if (!user) {
      next(createErr("Invalid login, please try again"));
      return;
    }
    const token = await jwt.sign(
      { user: user.userName },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { algorithm: "HS256", expiresIn: "20mins" }
    );
    res.json({
      status: "Login successfull",
      user: {
        name: user.name,
        email: user.email
      },
      accessToken: token
    });
  });

const loginModule = (module.exports = router);
loginModule.validateAuthToken = validateAuthToken;

// module.exports = router;


