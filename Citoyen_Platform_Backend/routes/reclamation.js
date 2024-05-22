const express = require('express');
const router = express.Router();
const Reclamation = require('../models/Reclamation');

router.post('/', async (req, res) => {
  const { location, description, imageUrl } = req.body;
  const userId = req.session.userId;

  if (!location || !location.type || !location.coordinates || !description || !imageUrl || !userId) {
    return res.status(400).send({ error: 'Invalid data. Please check the input data.' });
  }

  try {
    const newReclamation = new Reclamation({
      location,
      description,
      imageUrl,
      userId
    });
    await newReclamation.save();
    res.status(201).send({ message: 'Reclamation added successfully' });
  } catch (error) {
    console.error('Error saving reclamation:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = req.session.userId; // Get user ID from session
    const reclamations = await Reclamation.find({ userId });
    res.status(200).json(reclamations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
