const { Schema, model } = require("mongoose");

const User = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String, required: false },
  role: { type: String, required: false },
  linkedIn: { type: String, required: false },
});

module.exports = model("User", User);
