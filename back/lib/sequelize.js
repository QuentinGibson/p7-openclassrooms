const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.POSTGRESDATABASE,
  process.env.POSTGRESUSERNAME,
  process.env.POSTGRESPASSWORD,
  {
    host: "localhost",
    port: process.env.POSTGRESPORT,
    dialect: "postgres",
  }
);

module.exports = sequelize;
