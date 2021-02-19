const express = require('express');
const generateStores = require('../utils/generateStores');

const stores = generateStores();
console.log('stores: ', stores);
const router = express.Router();

router.get('/closest', (req, res) => {
  const { userPosition } = req.body;
  console.log('userPosition: ', userPosition);

  res.json({
    ok: true,
    store: {
      storeId: '1',
      storeName: 'Store 1',
      isOpen: true,
      coordinates: [4.535, -75.6757],
      nextDeliveryTime: new Date(),
    },
  });
});

module.exports = router;
