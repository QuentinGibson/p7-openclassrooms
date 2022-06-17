const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
dotenv.config()

module.exports = {
  deleteUser: (res, req, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRECT)
    const {user_id} = decodedToken
    await User.destroy({ where: { user_id } }).then(res.status(200).json({message: "User successfully deleted!"}))
  },
  updateUser: (res, req, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 13);
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRECT)
    const {user_id} = decodedToken
    await User.update({ email, passwordHash},{where: {user_id}})
  }
};
