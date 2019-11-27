const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const locationSchema = new Schema({
  name: {type: String, require: true},
  city: {type: String, require: true},
  country:{type: String, require: true},
  longitude: Number,
  latitude: Number,
  type: {
    type: String,
    enum: ['coffeeShop', 'bookStore']
  }
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
