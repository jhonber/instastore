const data = require('./data-stores.json');

module.exports = () =>
  data.map((item, ind) => {
    return {
      storeId: ind,
      storeName: item.city,
      isOpen: true,
      coordinates: [parseFloat(item.lat, 10), parseFloat(item.lng, 10)],
      nextDeliveryTime: new Date().toISOString(),
    };
  });
