const data = require('./data-stores.json');

module.exports = () =>
  data.map((item, ind) => ({
    storeId: ind.toString(),
    storeName: item.city,
    isOpen: true,
    coordinates: [parseFloat(item.lat, 10), parseFloat(item.lng, 10)],
    nextDeliveryTime: new Date().toISOString(),
  }));
