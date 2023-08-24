const express = require("express");
const { connection } = require("./db");
const app = express();

const { userRouter } = require("./Routes/User.Routes");
const { blogRouter } = require("./Routes/Blog.Routes");

require("dotenv").config();
app.use(express.json());
app.use("/user", userRouter);

app.use("/blog", blogRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`${process.env.PORT} is Running`);
  } catch (err) {
    console.log("err", err);
  }
});
