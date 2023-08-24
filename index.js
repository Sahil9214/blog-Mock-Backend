const express = require("express");
const { connection } = require("./db");
const app = express();
const cors=require("cors")
const { userRouter } = require("./Routes/User.Routes");
const { blogRouter } = require("./Routes/Blog.Routes");

require("dotenv").config();
app.use(cors())
app.use(express.json());
app.use("/user", userRouter);

app.use("/", blogRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`${process.env.PORT} is Running`);
  } catch (err) {
    console.log("err", err);
  }
});
