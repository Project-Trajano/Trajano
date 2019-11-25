const express = require("express");
const router = express.Router();
const fs = require("fs");

// this serves the airports json
router.get("/locationsData", (req, res) => {
    fs.readFile("starbucksLocations/locations.json", "utf8", (err, locationsData) => {
      let output = JSON.parse(locationsData);

      output = output
        .filter(location => location.country === "ES")
      res.json(output)
    })
})

module.exports = router;
