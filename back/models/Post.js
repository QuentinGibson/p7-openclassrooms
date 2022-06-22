const { DataTypes } = require("sequelize");
const dotenv = require("dotenv");
const sequelize = require("../lib/sequelize");
let data;

if (process.env.NODE_ENV === "test") {
  data = { force: true };
} else {
  data = { alter: true };
}
dotenv.config();
const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Post.sync(data);
module.exports = Post;
