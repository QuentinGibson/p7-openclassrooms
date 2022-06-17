const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  deleteUser: (res, req, next) => {
    const { email } = req.body;
    await User.destroy({ where: { email } }).then(res.status(200).json({message: "User successfully deleted!"}))
  },
  updateUser: (res, req, next) => {
    const { email, password, token } = req.body;
    const passwordHash = await bcrypt.hash(password, 13);
    jwt.verify
    await User.update({ email, passwordHash},{where: {user_id}})
  }
};
