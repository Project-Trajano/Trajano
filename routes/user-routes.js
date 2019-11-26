const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const User = require("../models/User");
const multer = require("multer");
const uploadCloud = require("../config/cloudinary.js");
const upload = multer({ dest: "../public/uploads/" });

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
    User.findById(userId)
      .then(user => {
        console.log(user);
        res.render("users/user-profile", user);
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
  // const imgPath = req.file.url;
  User.findByIdAndUpdate(req.body._id, req.body)
    .then(() => {
      // console.log(imgPath);
      res.redirect("user-dashboard");
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

router.post("/uploadPhoto", uploadCloud.single("photo"), (req, res) => {
  User.findByIdAndUpdate(req.body._id, req.body)
    .then(() => {
      console.log(req.file.url);
      res.redirect("user-dashboard");
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

module.exports = router;
