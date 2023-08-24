const express = require("express");
const userRouter = express.Router();
const { UserModal } = require("../Modal/User.Modal");
const bycrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { Username, Avatar, Email, Password } = req.body;
  try {
    if (
      Username.length === 0 ||
      Avatar.length === 0 ||
      Email.length === 0 ||
      Password.length === 0
    ) {
      res.status(400).send({ msg: "Please Fill all the Crenditials" });
    } else {
      const userAvailable = UserModal.findOne({ Email });
      if (userAvailable.length > 0) {
        res.status(200).send({ msg: "Already you Signup" });
      } else {
        bycrypt.hash(Password, 4, async (err, hash) => {
          const User = new UserModal({
            Email,
            Password: hash,
            Avatar,
            Username,
          });
          await User.save();
        });
        res.status(200).send({ msg: "Signup Successfull" });
      }
    }
  } catch (err) {
    res.status(400).send({ msg: "Signin Fail" });
  }
});
//Login

userRouter.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const User = await UserModal.findOne({ Email });
    if (User) {
      bycrypt.compare(Password, User.Password, async (err, result) => {
        console.log("result",result)
        if (result === true) {
          const token = jwt.sign({ authorID: User._id }, "mock6");

          res.status(200).send({ msg: "Successfully get Token", token: token });
        } else {
          res.status(200).send({ msg: "U are not that person" });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ msg: "Login Failed " });
  }
});
module.exports = { userRouter };
