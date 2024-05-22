require('dotenv').config({ path: './config/.env' });
const session = require('express-session');
const MongoStore = require('connect-mongo');

console.log("MONGO_URI:", process.env.MONGO_URI);

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
});