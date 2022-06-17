const express = require("express");
const passport = require("passport");
const authRouter = express.Router();

// @desc   Auth With Google
// @route  GET /auth/google
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// @desc  Google Auth Callback
// @route  GET /auth/google/Callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    console.log("Google Called Us Back~~ ");
    res.redirect("/dashboard");
  }
);

//@desc     Logout User
//@route    GET /auth/logout
authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRouter;
