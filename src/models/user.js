const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 1,
      ref: "connectionRequest",
    },
    lastName: {
      type: String,
      required: true,
      minLength: 1,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
        message: "Email is invalid",
      },
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong");
        }
      },
      trim: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    about: {
      type: String,
      maxLength: 50,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not a valid gender",
      },
    },
    skills: {
      type: [String],
      lowercase: true,
    },
    photoURL: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOizmxkQV5rf4N9ayOC3pojndp0nzIDAFUtg&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Enter a valid photo URL");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.getJWT = async function () {
  const token = await jwt.sign({ id: this._id }, "Susuvasa@20", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.checkPassword = async function (passwordEnteredByUser) {
  const isValidPassword = await bcrypt.compare(
    passwordEnteredByUser,
    this.password
  );

  return isValidPassword;
};

module.exports = mongoose.model("User", userSchema);
