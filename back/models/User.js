const { DataTypes } = require("sequelize");
const sequelize = require("../lib/sequelize");

if (process.env.NODE_ENV === "test") {
  data = { force: true };
} else {
  data = { alter: true };
}
const User = sequelize.define("User", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
User.sync(data);
module.exports = User;
