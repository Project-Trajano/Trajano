const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dnq0pam11",
  api_key: "562439819269991",
  api_secret: "panEqNL7emoDV19vqPNEafeDBdI"
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
