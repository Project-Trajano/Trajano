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

// schemaName.index({lcoation: '2dsphere'})

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;

// "city": "Hong Kong", 
// "name": "Plaza Hollywood", 
// "country": "CN", 
// "longitude": 114.20169067382812, 
// "latitude": 22.340700149536133, 
// "store_id": 1