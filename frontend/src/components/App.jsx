import React, { useEffect, useState } from 'react';
import Map from './Map';
import Header from './Header';

const App = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition([latitude, longitude]);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Map userPosition={position} />
    </div>
  );
};

export default App;
