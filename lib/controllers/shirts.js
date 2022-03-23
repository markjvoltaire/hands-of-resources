const { Router } = require('express');
const Shirts = require('../models/Shirts');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const newShirt = await Shirts.createShirts({
      kind: req.body.kind,
      color: req.body.color,
    });
    res.send(newShirt);
  } catch (error) {
    next(error);
  }
});
