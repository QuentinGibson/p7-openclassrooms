const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const errorhandler = require("errorhandler");
const { Sequelize } = require("sequelize");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const postRoutes = require("./routes/post");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/message", messageRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/permission", permissionRoutes);
// app.use("/api/room", roomRoutes);
// app.use("/api/job", jobRoutes);
// app.use("/api/department", departmentRoutes);
// app.use("/api/post", postRoutes);
// app.use("/api/topic", topicRoutes);
// app.use("/api/role", roleRoutes);

if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
}

module.exports = app;
