import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Tooltip,
} from 'react-leaflet';
import moment from 'moment';
import { IconHouse, IconStore } from './Icons';

const Map = ({ userPosition, closestStore }) => {
  const Colombia = [4.5709, -74.2973];
  const [centerPosition, setCenterPosition] = useState(Colombia);
  const [storePosition, setStorePosition] = useState(null);

  useEffect(() => {
    if (!userPosition) return;
    setCenterPosition(userPosition);
  }, [userPosition]);

  useEffect(() => {
    if (!closestStore) return;
    setStorePosition(closestStore.coordinates);
  }, [closestStore]);

  const markerUser = (
    <Marker position={centerPosition} icon={IconHouse}>
      <Tooltip permanent offset={[20, -5]}>
        <b>User Information</b>
        <br />
        <b>City</b>: {closestStore?.storeName}
        <br />
      </Tooltip>
    </Marker>
  );

  const markerStore = (
    <Marker position={storePosition} icon={IconStore}>
      <Tooltip permanent offset={[20, -5]}>
        <b>Closest Available Store</b>
        <br />
        <b>Store name</b>: {closestStore?.storeName}
        <br />
        <b>State</b>: {closestStore?.isOpen ? 'open' : 'close'}
        <br />
        <b>Opened</b>: {moment(closestStore?.nextDeliveryTime).calendar()}
        <br />
      </Tooltip>
    </Marker>
  );

  const ChangeCenter = ({ center }) => {
    const map = useMap();
    if (centerPosition && storePosition) {
      map.fitBounds([centerPosition, storePosition], { padding: [10, 10] });
    } else {
      map.setView(center);
    }
    return null;
  };

  return (
    <MapContainer style={{ height: '90vh' }} center={centerPosition} zoom={12}>
      <ChangeCenter center={centerPosition} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {userPosition && markerUser}
      {storePosition && markerStore}
    </MapContainer>
  );
};

export default Map;
