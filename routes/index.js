const express = require('express');
const router  = express.Router();
const Books = require("../models/book");


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/getList", (req, res, next) => {
  Books.find()
    .populate("locationId")
    .then(booksFound => {
      console.log(booksFound);
      res.json(booksFound);
    })
    .catch(err => console.log(err));
});

module.exports = router;
