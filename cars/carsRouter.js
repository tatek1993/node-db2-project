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

router.put('/:id', (req, res) => {
  const changes = req.body;
  db('cars')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ 
                message: 'Car updated successfully'
            })
        } else {
            res.status(404).json({ 
                message: 'Car not found'
              })
        }
    })
    .catch(error => {
        res.status(500).json({ 
            message: 'Oh no! There was an error!'
        })
    });
});

router.delete('/:id', (req, res) => {
  db('cars')
      .where({ id: req.params.id })
      .del()
      .then(count => {
          if(count > 0) {
              res.status(200).json({ 
                  message: 'Car deleted successfully'
               })
          } else {
              res.status(404).json({ 
                  message: 'That car could not be found 🤷🏽‍♀️'
               })
          }
      })
      .catch(error => {
          res.status(500).json({
              message: 'Oops we ran into an error'
          });
      });
});
  
  module.exports = router;