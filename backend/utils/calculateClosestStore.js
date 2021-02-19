const constants = require('./constants');

const deg2rad = (deg) => deg * (Math.PI / 180);

const getDistanceBetweenTwoCoordInKm = (lat1, lon1, lat2, lon2) => {
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = constants.radiusEarth * c; // Distance in km
  return distance;
};

module.exports = (position, stores) => {
  let bestStore;
  let bestDistance = Number.MAX_SAFE_INTEGER;
  const lat1 = position[0];
  const lon1 = position[1];

  return new Promise((resolve, reject) => {
    const process = (ind) => {
      if (ind === stores.length) {
        resolve(bestStore);
      } else {
        const lat2 = stores[ind].coordinates[0];
        const lon2 = stores[ind].coordinates[1];
        const dist = getDistanceBetweenTwoCoordInKm(lat1, lon1, lat2, lon2);

        if (dist < bestDistance) {
          bestDistance = dist;
          bestStore = stores[ind];
        }
        process(ind + 1);
      }
    };
    process(0);
  });
};
