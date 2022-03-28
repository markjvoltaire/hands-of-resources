const { Router } = require('express');
const res = require('express/lib/response');
const Socks = require('../models/Socks');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newSocks = await Socks.createSocks({
        kind: req.body.kind,
        color: req.body.color,
      });
      res.send(newSocks);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res) => {
    try {
      const socks = await Socks.getAllSocks();
      res.send(socks);
    } catch (error) {
      return null;
    }
  })

  .get('/:id', async (req, res) => {
    try {
      const socks = await Socks.findById(req.params.id);
      res.send(socks);
    } catch (error) {
      return null;
    }
  })

  .delete('/:id', async (req, res) => {
    const socks = await Socks.deleteSocks(req.params.id, req.body);
    res.send(socks);
  });
