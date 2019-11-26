const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  lastName: String,
  email: String,
  phone: Number,
  birthDate: Date,
  path: {
    type: String,
    default: "/images/default.png"
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
