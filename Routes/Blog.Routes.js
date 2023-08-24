const express = require("express");
const blogRouter = express.Router();
const { BlogModal } = require("../Modal/Blog.Modal.js");
const { userRouter } = require("./User.Routes.js");

// GET DATA
blogRouter.get("/blogGet", async (req, res) => {
  try {
    let data = await BlogModal.find();
    console.log("data", data);
    res.status(200).send({ msg: "Data shown", data: data });
  } catch (err) {
    res.status(400).send({ msg: "Error fetching data", error: err.message });
  }
});

// POST DATA
blogRouter.post("/blogAdd", async (req, res) => {
  try {
    const newBlog = new BlogModal(req.body);

    await newBlog.save();

    res.status(200).send({ msg: "Blog created successfully", data: newBlog });
  } catch (err) {
    res.status(400).send({ msg: "Error creating blog" });
  }
});

userRouter.put("/blogs/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const editedContent = req.body;

    const updatedBlog = await BlogModal.findByIdAndUpdate(
      blogId,
      editedContent,
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Blog updated successfully", data: updatedBlog });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blogId = req.params.id;

    // Find the blog by its ID and delete it
    await BlogModal.findByIdAndDelete(blogId);

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { blogRouter };
