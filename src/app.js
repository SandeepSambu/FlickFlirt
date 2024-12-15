const express = require("express");
const connectDB = require("./config/database");
const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/request");
const cookieParser = require("cookie-parser");

const server = express();

server.use(express.json());
server.use(cookieParser());

server.use("/", authRouter);
server.use("/", profileRouter);
server.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("Database connection established");
    server.listen(7777, () => {
      console.log("Server started successfully");
    });
  })
  .catch((err) => {
    console.log("Database connection is not established");
  });
