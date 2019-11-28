const express = require("express");
const router = express.Router();
const Books = require("../models/book");
const User = require("../models/user");
const Location = require("../models/location");

router.get("/randombook", (req, res, next) => {
  Books.find()
    .then(book => {
      res.render("books/genreselected");
      // res.render("books/randombook", {
      //   book
      // });
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

router.get("/:title", (req, res, next) => {
  Books.find({
    title: req.params.title
  })
    .populate("locationId")
    .then(booksFound => {
      res.render("books/bookselect", { booksFound });
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

router.get("/:title/map", (req, res, next) => {
  Books.find({
    title: req.params.title
  })
    .populate("locationId")
    .then(booksFound => {
      res.json(booksFound);
    });
});

router.post("/:title", (req, res, next) => {
  Books.find({
    title: req.body.title
  })
    .then(booksFound => {
      res.render("books/bookselect", {
        booksFound
      });
    })
    .catch(err => {
      alert("El libro que buscas no está en Trajano todavía");
      console.log(err);
      next();
    });
});

router.post("/:id/book-selected", (req, res, next) => {
  const bookCounter = req.user.bookCounter - 1;
  Books.findByIdAndDelete(req.params.id).then(() => {
    User.findByIdAndUpdate(req.user._id, { bookCounter }).then(() => {
      res.redirect("/users/bookinfo");
    });
  });
});



module.exports = router;
