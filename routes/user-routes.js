const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");

router.get(
  "/user-dashboard/",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    let userId = req.user._id;
    User.find({ _id: userId })
      .then(user => {
        res.render("users/user-dashboard", user[0]);
      })
      .catch(err => {
        console.log(err);
        next();
      });
  }
);

router.get(
  "/user-profile/",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    let userId = req.user._id;
    User.find({ _id: userId })
      .then(user => {
        res.render("users/user-profile", user[0]);
      })
      .catch(err => {
        console.log(err);
        next();
      });
  }
);

router.get(
  "/user-collection",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    res.render("users/user-collection");
  }
);

router.get(
  "/user-success",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    res.render("users/user-success");
  }
);

router.post("/user-profile", (req, res) => {
  User.findByIdAndUpdate(req.body._id, req.body)
    .then(() => {
      console.log(req.body._id)
      res.redirect("user-dashboard");
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

module.exports = router;
