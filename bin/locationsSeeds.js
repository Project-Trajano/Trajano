require("dotenv").config();

const mongoose = require('mongoose')
const Location = require('../models/location')
const fs = require("fs");

mongoose
  .connect(process.env.DB, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

Location.collection.drop()

fs.readFile("starbucksLocations/locations.json", "utf8", (err, locationsData) => {
  let output = JSON.parse(locationsData);
  output = output
    .filter(location => (location.country === "ES" && location.city === "Madrid"))
  let result = [...output]
  Location.insertMany(result)
    .then((inserted) => {
      console.log(`Inserted ${inserted.length} register`)
      mongoose.disconnect()
    })
    .catch((err) => console.log(err))
})
