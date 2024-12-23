const express = require("express");
const requestRouter = express.Router();
const { auth } = require("../middleware/auth");
const connectionRequest = require("../models/requests");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  auth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];

      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid Status");
      }

      if (fromUserId == toUserId) {
        throw new Error("Cannot send request to yourself!");
      }

      const checkId = await connectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (checkId) {
        throw new Error("Request already exists");
      }

      const toUserIdExist = await User.findById(toUserId);

      if (!toUserIdExist) {
        return res.status(404).send("User not found!");
      }

      const request = new connectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      request.save();

      res.send("Request sent successfully");
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  }
);

requestRouter.post(
  "/request/recieve/:status/:requestId",
  auth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "declined"];

      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status");
      }

      const checkRequest = await connectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      console.log(checkRequest);

      if (!checkRequest) {
        return res.status(404).send("Request not found");
      }

      const request = new connectionRequest({
        fromUserId: checkRequest.fromUserId,
        toUserId: loggedInUser._id,
        status: status,
      });

      await request.save();

      await connectionRequest.findByIdAndDelete(requestId);

      res.send(request);
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  }
);

module.exports = { requestRouter };
