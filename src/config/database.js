const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://node:xLVR9MjcQtNnPIhR@flickflirt.4l6tq.mongodb.net/flickflirt"
  );
};

module.exports = connectDB;
