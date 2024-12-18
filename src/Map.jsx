import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { TripModal } from './TripModal';
import { TripForm } from './TripForm';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import L from 'leaflet';

// Placeholder text

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
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  // Fetching Trip Data from Backend
  const fetchTrips = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/trips`)
      .then((response) => setTrips(response.data))
      .catch((error) => {
        console.error("Error fetching trips:", error); // NEW: Log the error
      });
  };

  // Function to handle trip creation or update
  const handleFormSuccess = (trip) => {
    fetchTrips();
    setShowForm(false);
    setEditingTrip(null);
    setSelectedTrip(trip);
  };

  // Function to handle trip deletion
  const handleDelete = (tripId) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/trips/${tripId}`)
        .then(() => {
          fetchTrips(); // Refresh trips after deletion
          setSelectedTrip(null); // Clear selected trip
        })
        .catch((error) => {
          console.error("Error deleting trip:", error); // NEW: Log delete errors
        });
    }
  };

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
    <div className="map-container-wrapper"> {/* NEW: Wrapper for positioning */}
      {/* NEW: Add New Trip Button */}
      <button
        className="add-trip-overlay"
        onClick={() => setShowForm(true)}
      >
        Add Trip
      </button>

      <MapContainer
        // Adjusted center to focus the map appropriately
        center={[23, 0]}
        // Increased default zoom level for a closer view
        zoom={3}
        // Increased minimum zoom level to match default zoom
        minZoom={3}
        className="map-container"
        // Set maxBounds to limit panning and prevent duplicate regions
        maxBounds={[
          [85, -180], // North-west corner
          [-85, 180], // South-east corner
        ]}
        maxBoundsViscosity={1.0}
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
        <TripModal
          trip={selectedTrip}
          onClose={() => setSelectedTrip(null)}
          onEdit={() => {
            setEditingTrip(selectedTrip);
            setShowForm(true);
          }}
          onDelete={() => handleDelete(selectedTrip.id)}
        />
      )}

      {showForm && (
        <TripForm
          trip={editingTrip}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingTrip(null);
          }}
        />
      )}
    </div>
  );
}
