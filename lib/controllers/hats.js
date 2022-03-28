const { Router } = require('express');
const { request } = require('../app');
const { updateHat } = require('../models/Hats');
const Hat = require('../models/Hats');

module.exports = Router()
  .post('/', async (req, res) => {
    try {
      const newHat = await Hat.createHat({
        kind: req.body.kind,
        color: req.body.color,
      });
      res.json(newHat);
    } catch (error) {
      return null;
    }
  })

  .get('/', async (req, res) => {
    try {
      const hats = await Hat.getAllHats();
      res.send(hats);
    } catch (error) {
      return null;
    }
  })

  .get('/:id', async (req, res) => {
    try {
      const hat = await Hat.getById(req.params.id);
      res.send(hat);
    } catch (error) {
      return null;
    }
  })

  .patch('/:id', async (req, res) => {
    try {
      const changeHat = await updateHat(req.params.id, req.body);
      res.send(changeHat);
    } catch (error) {
      return null;
    }
  })

  .delete('/:id', async (req, res) => {
    const hats = await Hat.deleteHat(req.params.id, req.body);
    res.send(hats);
  });
