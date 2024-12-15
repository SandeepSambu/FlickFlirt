const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validation } = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    validation(req);
    const { firstName, lastName, email, password, skills } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    if (skills?.length > 10) {
      throw new Error("Skills can not be more than 10");
    }
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user, " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const hashPassword = await user.checkPassword(password);

    if (!hashPassword) {
      throw new Error("Invalid Credentials");
    }

    const token = await user.getJWT();
    res.cookie("token", token);
    res.send("Login Successful");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });

  res.send("Logged out successfully");
});

module.exports = { authRouter };
