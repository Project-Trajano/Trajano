const express = require('express');
const router = express.Router();
const Location = require('../models/location')

router.get('/bookinfo', (req, res, next) => {
  Location.find()
    .then(locationFound => {
      res.render('bookSearchForm', {
        locationFound
      });
    })

});

router.post('/bookinfo', (req, res, next) => {
  const searchInput = (req.body.title).split(' ').join('+');
  Location.find()
    .then(locationFound => {
      res.render('bookSearchForm', {
        searchInput, locationFound
      })
    })
})

router.post('/bookinfo/save', (req, res, next) => {
  console.log('////////////////////////////////////////////////////////////')
  console.log(req.user)
  console.log('////////////////////////////////////////////////////////////')
  console.log(req.body)
  console.log('////////////////////////////////////////////////////////////')
  
  res.redirect('/bookinfo')
})

module.exports = router;