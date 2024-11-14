import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Created TripForm.jsx component for adding and editing trips based on the presence of a trip prop.

export function TripForm({ trip, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    location: '',
    latitude: '',
    longitude: '',
    country: '',
    continent: '',
    year: '',
    highlights: '',
    image_url: '',
  });

  // Populate form data if editing an existing trip
  useEffect(() => {
    if (trip) {
      setFormData(trip);
    }
  }, [trip]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trip) {
      // Update existing trip
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/trips/${trip.id}`, { trip: formData })
        .then((response) => {
          onSuccess(response.data);
        })
        .catch((error) => console.error(error));
    } else {
      // Create new trip
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/trips`, { trip: formData })
        .then((response) => {
          onSuccess(response.data);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{trip ? 'Edit Trip' : 'Add New Trip'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <label>
            Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </label>
          <label>
            Latitude:
            <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} required />
          </label>
          <label>
            Longitude:
            <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} required />
          </label>
          <label>
            Country:
            <input type="text" name="country" value={formData.country} onChange={handleChange} required />
          </label>
          <label>
            Continent:
            <input type="text" name="continent" value={formData.continent} onChange={handleChange} required />
          </label>
          <label>
            Year:
            <input type="number" name="year" value={formData.year} onChange={handleChange} required />
          </label>
          <label>
            Highlights:
            <textarea name="highlights" value={formData.highlights} onChange={handleChange} required />
          </label>
          <label>
            Image URL:
            <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} required />
          </label>
          <button type="submit">{trip ? 'Update Trip' : 'Add Trip'}</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
