const { Router } = require('express');
const Hats = require('../models/Hats');

module.exports = Router().post('/', async (req, res) => {
  const hat = { id: '1', kind: 'snapback', color: 'red' };
  console.log('hat', hat);
  res.send(hat);
});
