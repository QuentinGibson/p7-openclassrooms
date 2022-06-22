const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const errorhandler = require("errorhandler");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
}
module.exports = app;
