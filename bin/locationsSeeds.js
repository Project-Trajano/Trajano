const mongoose = require('mongoose')
const Location = require('../models/location')
const fs = require("fs");

const dbtitle = 'Trajano'
mongoose.connect(`mongodb://localhost/${dbtitle}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

Location.collection.drop()

fs.readFile("starbucksLocations/locations.json", "utf8", (err, locationsData) => {
  let output = JSON.parse(locationsData);
  output = output
    .filter(location => location.country === "ES")
  let result = [...output]
  Location.insertMany(result)
    .then((inserted) => {
      console.log(`Inserted ${inserted.length} register`)
      mongoose.disconnect()
    })
    .catch((err) => console.log(err))
})
