const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool } = require('../../db/db');
const jwtGenerator = require('../../utils/jwtGenerator');

require('dotenv').config();

// const validaiteAuthToken = (req, res, next) => {
//   const authHeader = req.header("Authorization");
//   console.log(authHeader);
//   if (!authHeader) {
//     next(createErr("Needs login", 4002));
//     return;
//   }
//   const authToken = authHeader.split(" ")[1];
//   jwt.verify(
//     authToken,
//     process.env.JWT_ACCESS_TOKEN_SECRET,
//     { algorithms: ["HS256"] },
//     (err, user) => {
//       if (!err) {
//         next(err);
//         return;
//       }
//       next();
//     }
//   );
// };

// router
//   .route("/")
//   .options()
//   .post(validateUserDetails, async (req, res, next) => {
//     // extract the userdata from request object.
//     const { userName, password } = req.body;
//     //validate with users object.
//     const user = users.find(
//       (user) =>
//         (user.userName === userName || user.email === userName) &&
//         user.password === password
//     );

//     // respond with proper handler
//     if (!user) {
//       next(createErr("Invalid login, please try again"));
//       return;
//     }
//     const token = await jwt.sign(
//       { user: user.userName },
//       process.env.JWT_ACCESS_TOKEN_SECRET,
//       { algorithm: "HS256", expiresIn: "20mins" }
//     );
//     res.json({
//       status: "Login successfull",
//       user: {
//         name: user.name,
//         email: user.email
//       },
//       accessToken: token
//     });
//   });

// const loginModule = (module.exports = router);
// loginModule.validateAuthToken = validateAuthToken;

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM admins WHERE email = $1", [ email ]);
    
    if (user.rows.length === 0) {
      return res.status(401).json('Email or Password invalid');
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json('Email or Password invalid');
    }

    const token = jwtGenerator(user.rows[0].aid);
    res.json({ token });

  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;



