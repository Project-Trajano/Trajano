require("dotenv").config();

const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const nodemailer = require("nodemailer");
const characters =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let token = "";

router.get("/access", (req, res, next) => {
  res.render("auth/access");
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users/user-dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  }),
  function(req, res) {
    res.redirect("/");
  }
);

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const confirmationCode = token;

  for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }

  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", {
      message: "Indicate username, password and email please"
    });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email,
      confirmationCode: token
    });

    newUser
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      });

    // NODEMAILER
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "ironnodemailertest@gmail.com",
        pass: "trajanomail"
      }
    });

    transporter
      .sendMail({
        from: "Trajano",
        to: email,
        subject: "Bienvenido a Trajano",
        text: "Please verify your email address by clicking the link below",
        html: `<a href="${process.env.LMS}${token}">Verificar</a>`
      })
      .then(info => res.render("auth/message", { email, token }))
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      });
  });
});

router.get("/confirm/:confirmationCode", (req, res) => {
  let code = req.params.confirmationCode;
  User.findOneAndUpdate(
    { confirmationCode: code },
    { $set: { status: "Active" } },
    { new: true }
  )
    .then(updated => {
      console.log(updated);
      res.render("auth/confirmation");
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/users/user-dashboard",
    failureRedirect: "/auth/login" // here you would redirect to the login page using traditional login approach
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
