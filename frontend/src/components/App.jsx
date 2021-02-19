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
    if (userPosition) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const coord = [latitude, longitude];
      setUserPosition(coord);
      // const T = [488.711, -74.0721];
      // setUserPosition(T);

      // getRequest(url, T)
      //   .then((resp) => {
      getRequest(url, coord)
        .then((resp) => {
          const { store } = resp.data;
          if (!store) {
            alert("There aren't available stores");
          } else {
            console.log('Store: ', store);
            setClosestStore(store);
          }
        })
        .catch((err) => {
          console.log('err: ', err);
          alert(err.data.msg);
        });
    });
  }, [url, userPosition]);

  return (
    <div className="App">
      <div className="header-container">
        <Header setUserPosition={setUserPosition} />
      </div>
      <Map userPosition={userPosition} closestStore={closestStore} />
    </div>
  );
};

export default App;
