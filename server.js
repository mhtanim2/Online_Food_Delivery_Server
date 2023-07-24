const express = require('express');
const dotenv = require('dotenv');
// Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
// Database Lib Import
const mongoose = require('mongoose');
// read directory for routers
const { readdirSync } = require('fs');

const app = express();

dotenv.config();

mongoose.set('strictQuery', false);

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Body Parser Implement
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

// Api routing
readdirSync('./src/routes/').map((r) => app.use('/api/v1', require(`./src/routes/${r}`)));

// Undefined Route Implement
app.use('*', (req, res) => {
  res.status(404).json({ status: 'fail', data: 'Not Found' });
});

// Mongoose connection and run the server
const URI = process.env.DATABASE
  || 'mongodb+srv://<username>:<password>@cluster0.dfxgpct.mongodb.net/food_delivery?retryWrites=true&w=majority';
const port = process.env.PORT || 3000;

mongoose
  .connect(URI, {
    user: process.env.DB_USER,
    pass: process.env.PASS,
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log('Mongoose connected');
      console.log(`The app is listening on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

module.exports = app;
