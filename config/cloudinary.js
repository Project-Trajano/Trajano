const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dnctrmq99",
  api_key: "366546819933744",
  api_secret: "DTK7IqFx21HuJuB5hlmuKq0v07Q"
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "folder-name",
  allowedFormats: ["jpg", "png"],
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
