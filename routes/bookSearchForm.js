const express = require('express');
const router = express.Router();

router.get('/bookinfo', (req, res, next) => {
  res.render('bookSearchForm');
});

router.post('/bookinfo', (req, res, next) => {
  const searchInput = (req.body.title).split(' ').join('+');
  // searchInput = searchInput.split(' ').join('+')
  console.log(typeof(searchInput))
  res.render('bookSearchForm', {searchInput})
})

module.exports = router;
