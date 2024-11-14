import React from 'react';

export function TripModal({ trip, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{trip.location}, {trip.country}</h2>
        <img src={trip.image_url} alt={trip.location} style={{ width: '100%' }} />
        <p><strong>Continent:</strong> {trip.continent}</p>
        <p><strong>Year:</strong> {trip.year}</p>
        <p><strong>Highlights:</strong> {trip.highlights}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
