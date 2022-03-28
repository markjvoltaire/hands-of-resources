const { Router } = require('express');
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
  })

  .get('/:id', async (req, res) => {
    try {
      const shirts = await Shirts.findById(req.params.id);
      res.send(shirts);
    } catch (error) {
      return null;
    }
  })

  .patch('/:id', async (req, res) => {
    try {
      const shirtById = await Shirts.updateShirt(req.params.id, req.body);
      res.send(shirtById);
    } catch (error) {
      return null;
    }
  })

  .delete('/:id', async (req, res) => {
    const shirts = await Shirts.deleteShirts(req.params.id, req.body);
    res.send(shirts);
  });
