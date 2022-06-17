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

module.exports = storiesRouter;
