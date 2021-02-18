import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const Map = ({ userPosition, storePosition }) => {
  const Colombia = [4.5709, -74.2973];
  const [centerPosition, setCenterPosition] = useState(Colombia);

  useEffect(() => {
    if (!userPosition) return;
    setCenterPosition(userPosition);
  }, [userPosition]);

  const ChangeCenter = ({ center }) => {
    const map = useMap();
    map.setView(center);
    return null;
  };

  return (
    <MapContainer style={{ height: '90vh' }} center={centerPosition} zoom={13}>
      <ChangeCenter center={centerPosition} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={centerPosition} open>
        <Popup>User position</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
