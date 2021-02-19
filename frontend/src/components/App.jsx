import React, { useEffect, useState } from 'react';
import Map from './Map';
import Header from './Header';
import Config from '../config.json';
import { getRequest } from '../apiUtils';

const App = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [closestStore, setClosestStore] = useState(null);
  const url = `${Config.urlBase}${Config.closestStore}`;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const coord = [latitude, longitude];
      setUserPosition(coord);
      getRequest(url, coord).then((resp) => {
        const { store } = resp.data;
        if (!store) {
          console.log('NO STORE');
        } else {
          console.log('DATA: ', store);
          setClosestStore(store.coordinates);
        }
      });
    });
  }, [url]);

  return (
    <div className="App">
      <Header />
      <Map userPosition={userPosition} storePosition={closestStore} />
    </div>
  );
};

export default App;
