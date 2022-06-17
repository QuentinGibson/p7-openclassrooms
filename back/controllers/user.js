const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  deleteUser: async (res, req, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRECT);
    const { user_id } = decodedToken;
    await User.destroy({ where: { user_id } })
      .then(() => {
        res.status(200).json({ message: "User successfully deleted!" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Failed to delete User", error });
      });
  },
  updateUser: async (res, req, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 13);
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRECT);
    const { user_id } = decodedToken;
    await User.update({ email, passwordHash }, { where: { user_id } })
      .then(() => {
        res.ststus(200).json({ message: "User successfully updated!" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Failed to update User", error });
      });
  },
  getUser: async (res, req, next) => {
    const user_id = req.params.id;
    await User.findOne({ where: { user_id } })
      .then((user) => {
        res.status(200).json({ message: "User found!", user: user.toJSON() });
      })
      .catch((error) => {
        res.status(500).json({ message: "No user found!", error });
      });
  },
};
