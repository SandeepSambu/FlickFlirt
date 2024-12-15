const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not valid!!!!!!!");
    }

    const decodedMsg = jwt.verify(token, "Susuvasa@20");

    const { id } = decodedMsg;

    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(404).send("Error: " + err.message);
  }
};

module.exports = { auth };
