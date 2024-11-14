import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { TripModal } from './TripModal';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import Marker Images
import blueMarker from './assets/blue-marker.png'; 
import redMarker from './assets/red-marker.png';   
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon paths when using bundlers like Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    'leaflet/dist/images/marker-icon-2x.png',
    import.meta.url
  ).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url)
    .href,
});

// Map Component Definition
export function MapComponent() {
  // State Variables for Trips and Selected Trip Modal
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Fetching Trip Data from Backend
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/trips`)
      .then((response) => setTrips(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Defining Custom Icons for Blue and Red Markers
  const blueIcon = new L.Icon({
    iconUrl: blueMarker,         
    iconRetinaUrl: blueMarker,   
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: markerShadow,     
    shadowSize: [41, 41],
  });

  const redIcon = new L.Icon({
    iconUrl: redMarker,          
    iconRetinaUrl: redMarker,    
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: markerShadow,     
    shadowSize: [41, 41],
  });

  // Rendering the Map and Trip Markers
  return (
    <>
      <MapContainer
        center={[25.276987, 51.520008]} // Centered on Doha initially
        zoom={2}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {trips.map((trip) => (
          <Marker
            key={trip.id}
            position={[trip.latitude, trip.longitude]}
            eventHandlers={{
              click: () => {
                setSelectedTrip(trip);
              },
            }}
            icon={trip.year <= new Date().getFullYear() ? blueIcon : redIcon}
          />
        ))}
      </MapContainer>

      {selectedTrip && (
        <TripModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
      )}
    </>
  );
}
