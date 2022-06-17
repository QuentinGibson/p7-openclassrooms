const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.body;
    await bcrypt
      .hash(password, 13)
      .then(async (hash) => {
        return await User.findOrCreate({
          where: { email },
          defaults: { password: hash },
        });
      })
      .then(([user, created]) => {
        if (user) {
          res.status(500).json({
            message: "An account with this email already exists",
          });
        } else if (created) {
          res.status(202).json({
            message: "User successfully created",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error when saving user",
          error,
        });
      });
  },
  signIn: async (req, res, next) => {
    const { email, pass } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(500).json({
        message: "Login Invalid",
      });
    } else {
      const storedHash = user.getDataValue("password");
      await bcrypt.compare(pass, storedHash).then(async (match) => {
        if (match) {
          const user_id = await user.getDataValue("user_id");
          const token = jwt.sign({ user_id }, process.env.TOKEN_SECRET);
          res.status(200).json({
            message: "Sign in Successfull",
            token,
          });
        } else {
          res.status(500).json({
            message: "Login Invalid",
          });
        }
      });
    }
  },
};
