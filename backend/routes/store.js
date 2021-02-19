const express = require('express');
const generateStores = require('../utils/generateStores');
const calculateClosestStore = require('../utils/calculateClosestStore');

const stores = generateStores();
const router = express.Router();

router.get('/closest', (req, res) => {
  const { latitude, longitude } = req.query;
  const userPosition = [parseFloat(latitude, 10), parseFloat(longitude, 10)];
  console.log('userPosition: ', userPosition);

  calculateClosestStore(userPosition, stores).then((closestStore) => {
    console.log('closestStore: ', closestStore);

    res.json({
      store: closestStore,
    });
  });
});

module.exports = router;
