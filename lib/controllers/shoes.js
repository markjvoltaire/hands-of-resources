const { Router } = require('express');
const Shoes = require('../models/Shoes');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newShoe = await Shoes.createShoes({
        kind: req.body.kind,
        color: req.body.color,
      });
      res.send(newShoe);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res) => {
    try {
      const shoes = await Shoes.getAllShoes();
      res.send(shoes);
    } catch (error) {
      return null;
    }
  })

  .get('/:id', async (req, res) => {
    try {
      const shoes = await Shoes.findById(req.params.id);
      res.send(shoes);
    } catch (error) {
      return null;
    }
  })

  .patch('/:id', async (req, res) => {
    try {
      const shoes = await Shoes.updateShoes(req.params.id, req.body);
      res.send(shoes);
    } catch (error) {
      return null;
    }
  });
