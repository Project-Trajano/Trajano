const express = require("express");
const router = express.Router();
const Books = require("../models/book");

router.get("/randombook", (req, res, next) => {
  Books.find()
    .then(book => {
      res.render("books/randombook", { book });
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

router.get("/:id", (req, res, next) => {
  let bookId = req.params.id;

  Books.find({ _id: bookId }) //find()
    .then(book => {
      console.log(book)
      res.render("books/bookselect", book[0]);
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

module.exports = router;
