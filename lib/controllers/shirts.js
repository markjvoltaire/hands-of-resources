const { Router } = require('express');
const res = require('express/lib/response');
const Shirts = require('../models/Shirts');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newShirt = await Shirts.createShirts({
        kind: req.body.kind,
        color: req.body.color,
      });
      res.send(newShirt);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res) => {
    try {
      const shirts = await Shirts.getAllShirts();
      res.send(shirts);
    } catch (error) {
      return null;
    }
  });
