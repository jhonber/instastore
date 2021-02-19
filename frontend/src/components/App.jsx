import React, { useEffect, useState } from 'react';
import Map from './Map';
import Header from './Header';

const App = () => {
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setUserPosition([latitude, longitude]);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Map userPosition={userPosition} />
    </div>
  );
};

export default App;
