const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/hats', require('./controllers/hats'));
app.use('/api/v1/pants', require('./controllers/pants'));
app.use('/api/v1/shoes', require('./controllers/shoes'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
