const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const { auth } = require("../middleware/auth");
const { editValidation } = require("../utils/validation");
const User = require("../models/user");

profileRouter.get("/profile/view", auth, (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", auth, async (req, res) => {
  try {
    console.log(req.body.skills);
    if (req.body.skills) {
      req.body.skills = req.body.skills
        .split(", ")
        .map((skill) => skill.trim())
        .map((skill) => skill.toLowerCase());
    }

    const isEditAllowed = editValidation(req);

    if (!isEditAllowed) {
      throw new Error("Edit is not allowed.");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.send(loggedInUser);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/changePassword", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword, reEnteredNewPassword } = req.body;

    const user = req.user;

    const decryptedPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!decryptedPassword) {
      throw new Error("Invalid password");
    }

    if (newPassword != reEnteredNewPassword) {
      throw new Error("Password mismatch");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.send("Password updated successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = { profileRouter };
