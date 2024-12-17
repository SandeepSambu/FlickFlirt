const express = require("express");
const userRouter = express.Router();
const { auth } = require("../middleware/auth");
const connectionRequest = require("../models/requests");
const User = require("../models/user");

userRouter.get("/user/requests/received", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const requests = await connectionRequest
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate(
        "fromUserId",
        "firstName lastName age gender about skills photoURL"
      );

    if (!requests) {
      return res.status(404).send("No requests found");
    }

    res.send(requests);
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

userRouter.get("/user/connections", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const requests = await connectionRequest
      .find({
        $or: [
          { fromUserId: loggedInUser._id, status: "accepted" },
          { toUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate(
        "fromUserId",
        "firstName lastName age gender about skills photoURL"
      )
      .populate(
        "toUserId",
        "firstName lastName age gender about skills photoURL"
      );

    if (!requests) {
      return res.status(404).send("No requests found");
    }

    const data = requests.map((request) => {
      if (request.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return request.toUserId;
      }
      return request.fromUserId;
    });

    res.send(data);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/feed", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    limit = limit > 50 ? 50 : limit;

    const connectedWith = await connectionRequest
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .populate("fromUserId", "firstName lastName")
      .populate("toUserId", "firstName lastName");

    const connectedIds = connectedWith.map((id) => {
      if (id.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return id.toUserId._id;
      } else {
        return id.fromUserId._id;
      }
    });

    const users = await User.find({
      $nor: [{ _id: loggedInUser._id }, { _id: { $in: connectedIds } }],
    })
      .skip(skip)
      .limit(limit);

    res.send(users);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = { userRouter };
