const { Router } = require('express');
const Hat = require('../models/Hats');

module.exports = Router().post('/', async (req, res) => {
  try {
    const newHat = await Hat.createHat({
      kind: req.body.kind,
      color: req.body.color,
    });
    res.json(newHat);
    console.log('newHat', newHat);
  } catch (error) {
    return null;
  }
});
