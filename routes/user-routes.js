const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const User = require("../models/user");
const multer = require("multer");
const uploadCloud = require("../config/cloudinary.js");
// const upload = multer({ dest: "../public/uploads/" });
const Location = require('../models/location')
const Book = require('../models/book')


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array;
}

router.get(
  "/user-dashboard/",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    let userId = req.user._id;
    Book.find()
      .limit(5)
      .then((books) => {
        let book = shuffle(books);
        Book.find({
            userId: userId
          })
          .then((booksFoundbyUserId) => {
            User.find({
                _id: userId
              })
              .then(user => {
                console.log(booksFoundbyUserId)
                res.render("users/user-dashboard", {
                  user,
                  booksFoundbyUserId,
                  book
                });
              })
              .catch(err => {
                console.log(err);
                next();
              });
          })
      })


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
  const username = req.body.username;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const birthDate = req.body.birthDate;
  const gender = req.body.gender;

  User.findByIdAndUpdate(req.body._id, {
      username,
      lastName,
      email,
      phone,
      birthDate,
      gender
    })
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
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  console.log(req.user);
  User.findByIdAndUpdate(req.user._id, {
      imgPath,
      imgName
    })
    .then(() => {
      res.redirect("user-dashboard");
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

router.get("/bookinfo", (req, res, next) => {
  const bookCounter = req.user.bookCounter;
  Location.find().then(locationFound => {
    Book.find({
      userId: req.user._id
    }).then(bookFoundbyUser => {
      res.render("bookSearchForm", {
        locationFound,
        bookFoundbyUser,
        bookCounter
      });
    });
  });
});

router.post("/bookinfo", (req, res, next) => {
  const searchInput = req.body.title.split(" ").join("+");
  Location.find().then(locationFound => {
    Book.find({
      userId: req.user._id
    }).then(bookFoundbyUser => {
      res.render("bookSearchForm", {
        searchInput,
        locationFound,
        bookFoundbyUser
      });
    });
  });
});

router.post("/bookinfo/save", (req, res, next) => {
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
  });
  newBook
    .save()
    .then(() => {
      const bookCounter = req.user.bookCounter + 1;
      User.findByIdAndUpdate(req.user._id, {
        bookCounter
      }).then(() => {
        res.redirect("/users/bookinfo");
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;