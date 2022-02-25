import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MapComponent from './MapComponent';

export default function TabsComponent() {
  const [newLocation, setNewLocation] = useState();
  const [locations, setLocations] = useState([
    { id: 0, descr: 'My Home', lng: 49.957273, lat: 11.617979, zoom: 9 },
    {
      id: 1,
      descr: 'My Fav Location',
      lng: 53.271309,
      lat: -9.044823,
      zoom: 9,
    },
    {
      id: 2,
      descr: 'My Birth Location',
      lng: -70.892044,
      lat: -69.330381,
      zoom: 5,
    },
    {
      id: 3,
      descr: 'My Honeymoon Location',
      lng: 75.262492,
      lat: 139.789775,
      zoom: 5,
    },
  ]);

  function addLocation(event) {
    event.preventDefault();
    console.table(locations);
    console.table(newLocation);

    // lng und lat auf Nummer prüfen
    for (const [key, value] of Object.entries(newLocation)) {
      if (!value?.trim().length || (key !== 'descr' && isNaN(value))) {
        console.log('unvollständige Daten!');
        return;
      }
    }

    setLocations((prevLocs) => [...prevLocs, newLocation]);
  }

  function handleChangeInput(event) {
    const { name, value } = event.target;
    console.log(`name: ${name} - value: ${value}`);
    setNewLocation((prevLoc) => ({ ...prevLoc, [name]: value }));
  }

  return (
    <div className="tabs">
      <form onSubmit={addLocation}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3px',
            marginBottom: '10px',
          }}
        >
          <input
            type="text"
            name="descr"
            value={newLocation?.descr}
            placeholder="Name"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            name="lng"
            value={newLocation?.lng}
            placeholder="longitude"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            name="lat"
            value={newLocation?.lat}
            placeholder="latitude"
            onChange={handleChangeInput}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}
        >
          <button onClick={addLocation}>Add Location</button>
        </div>
      </form>
      <Tabs>
        <TabList>
          {locations.map((location, index) => (
            <Tab key={index}>{location.descr}</Tab>
          ))}
        </TabList>

        {locations.map((location, index) => (
          <TabPanel key={index}>
            <MapComponent
              lng={location.lng}
              lat={location.lat}
              zoom={location.zoom}
            />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
