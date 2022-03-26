const { Router } = require('express');
const Pants = require('../models/Pants');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newPants = await Pants.createPants({
        kind: req.body.kind,
        color: req.body.color,
      });

      res.json(newPants);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res) => {
    try {
      const pants = await Pants.getAllPants();
      res.send(pants);
    } catch (error) {
      return null;
    }
  })

  .get('/:id', async (req, res) => {
    try {
      const pant = await Pants.getById(req.params.id);
      res.send(pant);
    } catch (error) {
      return null;
    }
  })

  .delete('/:id', async (req, res) => {
    const pants = await Pants.deletePants(req.params.id, req.body);
    res.send(pants);
  })

  .patch('/:id', async (req, res) => {
    try {
      const pantsById = await Pants.updatePants(req.params.id, req.body);
      res.send(pantsById);
    } catch (error) {
      return null;
    }
  });
