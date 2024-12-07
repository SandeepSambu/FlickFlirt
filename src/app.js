const express = require("express");

const server = express();

server.get("/", (req, res, next) => {
  res.send("Hello from the server");
  next();
});

server.get("/hello", (req, res) => {
  res.send("Hello Hello Hello");
});

server.get("/test", (req, res) => {
  res.send("This is test");
});

server.listen(7777, () => {
  console.log("Server started successfully");
});
