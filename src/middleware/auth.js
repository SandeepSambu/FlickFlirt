const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please login");
    }

    const decodedMsg = jwt.verify(token, process.env.JWT_SCERET);

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
