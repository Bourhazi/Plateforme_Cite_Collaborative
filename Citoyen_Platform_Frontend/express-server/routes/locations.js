const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

router.post('/', async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).send(location);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.send(locations);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
