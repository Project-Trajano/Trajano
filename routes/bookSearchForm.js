const express = require('express');
const router = express.Router();
const Location = require('../models/location')
const Book = require('../models/book')

router.get('/bookinfo', (req, res, next) => {
  Location.find()
    .then(locationFound => {
      Book.find({
          userId: req.user._id
        })
        .then((bookFoundbyUser) => {
          res.render('bookSearchForm', {
            locationFound,
            bookFoundbyUser
          });
        })
    })

});

router.post('/bookinfo', (req, res, next) => {
  const searchInput = (req.body.title).split(' ').join('+');
  Location.find()
    .then(locationFound => {
      Book.find({
          userId: req.user._id
        })
        .then((bookFoundbyUser) => {
          res.render('bookSearchForm', {
            searchInput,
            locationFound,
            bookFoundbyUser
          })
        })

    })
})

router.post('/bookinfo/save', (req, res, next) => {
  const newBook = new Book({
    title: req.body.name,
    author: req.body.author,
    genre: req.body.category,
    rating: req.body.rating,
    state: req.body.state,
    description: req.body.description,
    locationId: req.body.location,
    userId: req.user._id,
    bookImage: {}
  })
  newBook.save()
    .then(() => {
      res.redirect('/bookinfo')
    })
    .catch((err) => {
      console.log(err)
    })
  // console.log(newBook);

})

module.exports = router;