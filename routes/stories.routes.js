const express = require("express");
const storiesRouter = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Story = require("../models/Story");

// @desc  Show Add Page
// @route  GET /stories/add
storiesRouter.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});

// @desc  CREATE Story
// @route  POST /stories
storiesRouter.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc  Show All Stories
// @route  GET /stories
storiesRouter.get("/", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();

    res.render("stories/index", { stories });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc  Show Edit Page
// @route  GET /stories/add
storiesRouter.get("/edit/:id", ensureAuth, async (req, res) => {
  const story = await Story.findOne({
    _id: req.params.id,
  }).lean();

  if (!story) {
    return res.render("error/404");
  }
  if (story.user != req.user.id) {
    res.redirect("/stories");
  } else {
    res.render("stories/edit", { story });
  }
});

// @desc  Show SINGLE Page
// @route  GET /stories/:id
storiesRouter.get("/:id", ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).populate("user").lean();

    if (!story) {
      return res.render("error/404");
    }

    res.render("stories/show", { story });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc   Update
// @route  PUT /stories/:id
storiesRouter.put("/:id", ensureAuth, async (req, res) => {
  let story = await Story.findById(req.params.id).lean();

  if (!story) {
    return res.render("error/404");
  }

  if (story.user != req.user.id) {
    res.redirect("/stories");
  } else {
    story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.redirect("/dashboard");
  }
});

// @desc  Delete Story
// @route  DELETE /stories/add
storiesRouter.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Story.remove({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc  Show USER STORIES
// @route  GET /stories/user/:userId
storiesRouter.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({
      user: req.params.userId,
      status: "public",
    })
      .populate("user")
      .lean();
    res.render("stories/index", { stories });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = storiesRouter;
