const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "a user should have a user_name!"],
    unique: [true, "a user should have a unique user_name!"],
    minlength: [5, "a user should have minimum 5 character in user_name!"],
  },
  email: {
    type: String,
    required: [true, "a user should have an email address!"],
    unique: [true, "The email address should be unique!"],
  },
  password: {
    type: String,
    required: [true, "a user should have a password!"],
    minlength: [5, "a user should have a minimum 5 character's in password!"],
  },
});

module.exports = new mongoose.model("User", userSchema);
