// * MODEL
const User = require("../models/user");

// * REGISTER FORM
module.exports.renderRegister = async (req, res) => {
  res.render("users/register");
};

// * REGISTER
module.exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Campgrounds");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

// * LOGIN FORM
module.exports.renderLogin = async (req, res) => {
  res.render("users/login");
};

// * LOGIN
module.exports.login = async (req, res) => {
  const redirectURL = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  req.flash("success", "Welcome Back!");
  res.redirect(redirectURL);
};

// * LOGOUT
module.exports.logout = async (req, res) => {
  req.logout();
  req.flash("success", "Goodbye!");
  res.redirect("/campgrounds");
};
