const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const bookSchema = new Schema({
  title: {type: String, require: true},
  author: {type: String, require: true},
  genre: {type: String, require: true},
  rating: Number,
  state: Number,
  description: String,
  locationId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
  bookImage: {
    imgName: String,
    imgPath: String,
    // default: //PENDIENTE URL
  },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;