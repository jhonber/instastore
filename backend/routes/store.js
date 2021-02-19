const express = require('express');
const generateStores = require('../utils/generateStores');
const calculateClosestStore = require('../utils/calculateClosestStore');

const stores = generateStores();
const router = express.Router();

const memoAllTracks = [];

router.get('/closest', (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    res.status(400).json({
      msg: 'Longitude/latitude params are required!',
    });
    return;
  }

  const userPosition = [parseFloat(latitude, 10), parseFloat(longitude, 10)];

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    res.status(400).json({
      msg: 'Invalid value for longitude/latitude!',
    });
    return;
  }

  calculateClosestStore(userPosition, stores).then((closestStore) => {
    const ipAddress =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const track = {
      date: new Date().toUTCString(),
      position: userPosition,
      ipAddress,
      closestStoreId: closestStore.storeId,
    };

    memoAllTracks.push(track);

    res.json({
      store: closestStore,
    });
  });
});

router.get('/tracks', (req, res) => {
  res.json({
    tracks: memoAllTracks,
  });
});

module.exports = router;
