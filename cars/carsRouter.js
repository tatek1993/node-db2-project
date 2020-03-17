const express = require('express');

const router = express.Router();

const db = require('../data/connection.js');

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        res.json(cars);
    })
    .catch(err => {
        res.status(500).json({ message: "Aw dang, we couldn't get the cars..." });
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db('cars')
    .where({ id })
    .first()
    .then(car => {
        res.json(fruit);
    })
    .catch(err => {
        res.status(500).json({ message: "Oh no, we couldn't grab that car..."})
    });
});

router.post('/', (req, res) => {
    const carData = req.body;
    db('cars').insert(carData)
    .then(ids => {
      db('cars')
      .where({ id: ids[0] })
      .then(newCarEntry => {
        res.status(201).json(newCarEntry);
      });
    })
    .catch (err => {
      console.log('POST error', err);
      res.status(500).json({ message: "Darn, failed to store car data..." });
    });
  });
  
  module.exports = router;