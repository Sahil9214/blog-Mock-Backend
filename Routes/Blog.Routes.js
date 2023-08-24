const express = require("express");
const blogRouter = express.Router();
const { BlogModal } = require("../Modal/Blog.Modal.js");
const { userRouter } = require("./User.Routes.js");

// GET DATA
blogRouter.get("/blogs", async (req, res) => {
  try {
    let data = await BlogModal.find();
    console.log("data", data);
    res.status(200).send({ msg: "Data shown", data: data });
  } catch (err) {
    res.status(400).send({ msg: "Error fetching data", error: err.message });
  }
});

// POST DATA
blogRouter.post("/blogs", async (req, res) => {
  try {
    const newBlog = new BlogModal(req.body);

    await newBlog.save();

    res.status(200).send({ msg: "Blog created successfully", data: newBlog });
  } catch (err) {
    res.status(400).send({ msg: "Error creating blog" });
  }
});
//Patch Request
blogRouter.patch("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updatedData = await BlogModal.findByIdAndUpdate(id, data);

    res
      .status(200)
      .json({ message: "Blog updated successfully", data: updatedData });
  } catch (error) {
    res.status(400).json({ error: "Internal server error" });
  }
});
//Delete Request
blogRouter.delete("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await BlogModal.findByIdAndDelete(id);

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Internal server error" });
  }
});
//search
blogRouter.get("/blogs", async (req, res) => {
  try {
    const searchQuery = req.query.title;

    let Data = await BlogModal.find({ title: searchQuery });
    res.status(200).send({ msg: "data added successfull", data: Data });
  } catch (error) {
    res.status(400).json({ message: "something goes wrong" });
  }
});
module.exports = { blogRouter };
