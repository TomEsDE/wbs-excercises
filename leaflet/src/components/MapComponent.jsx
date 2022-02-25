import React from 'react';
import { Map, Marker } from 'pigeon-maps';
import { MapContainer, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

function MapComponent({ lng, lat, zoom, leaflet }) {
  const position = [lng, lat];

  return (
    <>
      {!leaflet && (
        <Map height={300} defaultCenter={position} defaultZoom={zoom}>
          <Marker width={50} anchor={position} />
        </Map>
      )}
      {leaflet && (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
}

export default MapComponent;
