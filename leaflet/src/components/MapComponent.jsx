import React from 'react';
import { Map, Marker } from 'pigeon-maps';

export default function MapComponent({ lng, lat, zoom }) {
  const position = [lng, lat];
  return (
    <Map height={300} defaultCenter={position} defaultZoom={zoom}>
      <Marker width={50} anchor={position} />
    </Map>
  );
}
