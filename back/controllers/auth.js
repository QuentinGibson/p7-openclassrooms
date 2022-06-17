const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  signUp: async (req, res, next) => {
    const { firstName, lastName, email, pass } = req.body;
    const password = await bcrypt.hash(pass, 13);
    //Store password into the database
  },
  signIn: async (req, res, next) => {
    const { email, pass } = req.body;
    //Find user by email using sequalize
    //Add storedHash

    bcrypt.compare(pass, storedHash).then((match) => {
      if (match) {
        const token = jwt.sign({ user_id }, process.env.TOKEN_SECRET);
        res.status(200).json({
          token,
        });
      } else {
        res.status(400).json({
          message: "Login Invalid",
        });
      }
    });
  },
};
