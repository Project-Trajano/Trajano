const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const bookSchema = new Schema({
  title: {type: String, require: true},
  author: {type: String, require: true},
  genre: {type: String, require: true},
  rating: String,
  state: String,
  description: String,
  locationId: {type: Schema.Types.ObjectId, ref:'Location'},
  userId: {type: Schema.Types.ObjectId, ref:'User'},
  bookImage: {
    imgName: String,
    imgPath: String,
    // default: //PENDIENTE URL
  },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;