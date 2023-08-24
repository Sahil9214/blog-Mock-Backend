const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    Username: String,
    Avatar: String,
    Email: String,
    Password: String,
  },
  {
    versionKey: false,
  }
);

const UserModal = mongoose.model("user", UserSchema);
module.exports = { UserModal };
