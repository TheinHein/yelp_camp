const express = require("express");
const router = express.Router();
const passport = require("passport");

// * MIDDLEWARE
const catchAsync = require("../utils/catchAsync");

// * CONTROLLER
const users = require("../controllers/users");

// * ROUTES
// * REGISTER FORM
router.get("/register", catchAsync(users.renderRegister));

// * REGISTER
router.post("/register", catchAsync(users.register));

// * LOGIN FORM
router.get("/login", catchAsync(users.renderLogin));

// * LOGIN
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  catchAsync(users.login)
);

// * LOGOUT
router.get("/logout", catchAsync(users.logout));

module.exports = router;
