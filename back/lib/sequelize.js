const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

let database;
if (process.env.NODE_ENV === "development") {
  database = process.env.POSTGRESDATABASE;
} else if (process.env.NODE_ENV === "test") {
  database = process.env.POSTGRESTESTINGDATABASE;
}

const sequelize = new Sequelize(
  database,
  process.env.POSTGRESUSERNAME,
  process.env.POSTGRESPASSWORD,
  {
    host: "localhost",
    port: process.env.POSTGRESPORT,
    dialect: "postgres",
  }
);
module.exports = sequelize;
