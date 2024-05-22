require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sessionConfig = require('./config/session');
const authRoutes = require('./routes/auth');
const reclamationRoutes = require('./routes/reclamation');

const app = express();

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true,
};

mongoose.connect(process.env.MONGO_URI, mongoOptions)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

app.use(bodyParser.json());
app.use(sessionConfig);
app.use('/auth', authRoutes);
app.use('/reclamation', reclamationRoutes);

app.listen(3900, () => {
  console.log('Server running on port 3900');
});
