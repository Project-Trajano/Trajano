const express = require("express");
const router = express.Router();
const Books = require("../models/book");
<<<<<<< HEAD
const User = require("../models/user");
const Location = require("../models/location");
=======
const User = require("../models/user")
const Location = require("../models/location")
>>>>>>> 310e633cb322e3b5949ee0ca8e28148cf6d9eba3



router.get("/randombook", (req, res, next) => {

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array;
  }

  Books.find()
    .limit(4)
    .then(book => {
<<<<<<< HEAD
      res.render("books/genreselected");
      // res.render("books/randombook", {
      //   book
      // });
=======
      shuffle(book);
      res.render("books/randombook", {
        book
      });
>>>>>>> 310e633cb322e3b5949ee0ca8e28148cf6d9eba3
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
<<<<<<< HEAD
      res.render("books/bookselect", { booksFound });
=======
      res.render("books/bookselect", {
        booksFound
      });
>>>>>>> 310e633cb322e3b5949ee0ca8e28148cf6d9eba3
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

router.get("/:title/map", (req, res, next) => {
  Books.find({
<<<<<<< HEAD
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
=======
      title: req.params.title
    })
    .populate('locationId')
    .then(booksFound => {
      res.json(booksFound)
    })
})

router.post("/:title", (req, res, next) => {
  Books.find({
      title: req.body.title
    })
    .populate('locationId')
>>>>>>> 310e633cb322e3b5949ee0ca8e28148cf6d9eba3
    .then(booksFound => {
      res.render('books/bookselect', {
        booksFound
      });
    })
    .catch(err => {
      alert("El libro que buscas no está en Trajano todavía");
      console.log(err);
      next();
    });
});

<<<<<<< HEAD
router.post("/:id/book-selected", (req, res, next) => {
  const bookCounter = req.user.bookCounter - 1;
  Books.findByIdAndDelete(req.params.id).then(() => {
    User.findByIdAndUpdate(req.user._id, { bookCounter }).then(() => {
      res.redirect("/users/bookinfo");
    });
  });
});


=======
router.post('/:id/book-selected', (req, res, next) => {
  const bookCounter = req.user.bookCounter - 1
  Books.findByIdAndDelete(req.params.id)
    .then(() => {
      User.findByIdAndUpdate(req.user._id, {
          bookCounter
        })
        .then(() => {
          res.redirect('/users/bookinfo')
        })
    })
})
>>>>>>> 310e633cb322e3b5949ee0ca8e28148cf6d9eba3

module.exports = router;
