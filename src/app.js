const express = require("express");
const connectDB = require("./config/database");
const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const { requestRouter } = require("./routes/request");
const { userRouter } = require("./routes/user");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const server = express();

require("dotenv").config();
const { createServer } = require("http");
const connectSocket = require("./utils/socket");

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
server.use(express.json());
server.use(cookieParser());

server.use("/", authRouter);
server.use("/", profileRouter);
server.use("/", requestRouter);
server.use("/", userRouter);

const app = createServer(server);

connectSocket(app);

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("Server started successfully");
    });
  })
  .catch((err) => {
    console.log("Database connection is not established");
  });
