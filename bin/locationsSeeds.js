const mongoose = require('mongoose')
const Location = require('../models/location')
const fs = require("fs");

const dbtitle = 'Trajano'
mongoose.connect(`mongodb://localhost/${dbtitle}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

Location.collection.drop()

// function jsonGenerator () {
//   fs.readFile("starbucksLocations/locations.json", "utf8", (err, locationsData) => {
//     let output = JSON.parse(locationsData);
//     output = output
//       .filter(location => location.country === "ES")
//     let result = [...output]
//     console.log(result)
//       return result
//   })
// }

fs.readFile("starbucksLocations/locations.json", "utf8", (err, locationsData) => {
  let output = JSON.parse(locationsData);
  output = output
    .filter(location => location.country === "ES")
  let result = [...output]
  console.log(result)
  return result
}).then((results) => {
  Location.create(results, (err) => {
    if (err) {
      throw (err)
    }
    console.log(`Created ${results.length} locations`)
    mongoose.connection.close();
  });
}).catch(err => {
  console.log(err)
})