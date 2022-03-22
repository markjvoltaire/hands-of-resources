const { Router } = require('express');
const Pants = require('../models/Pants');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const newPants = await Pants.createPants({
      kind: req.body.kind,
      color: req.body.color,
    });
    console.log('newPants', newPants);
    res.json(newPants);
  } catch (error) {
    next(error);
  }
});
