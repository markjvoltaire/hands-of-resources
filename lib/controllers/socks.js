const { Router } = require('express');
const Socks = require('../models/Socks');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const newSocks = await Socks.createSocks({
      kind: req.body.kind,
      color: req.body.color,
    });
    res.send(newSocks);
  } catch (error) {
    next(error);
  }
});
