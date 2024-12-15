const express = require("express");
const requestRouter = express.Router();
const { auth } = require("../middleware/auth");

requestRouter.post("/sendRequest", auth, (req, res) => {
  res.send("Request sent");
});

module.exports = { requestRouter };
