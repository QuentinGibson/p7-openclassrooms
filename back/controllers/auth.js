const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  signUp: async (formData) => {
    const { firstName, lastName, email, pass } = formData;
    const password = await bcrypt.hash(pass, 13);
  },
  signIn: async (formData) => {
    const { email, pass } = formData;

    bcrypt.compare(pass, hash).then((match) => {
      if (match) {
        const token = jwt.sign({ user_id }, process.env.TOKEN_SECRET);
      }
    });
  },
};
