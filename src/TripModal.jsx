import React from 'react';

export function TripModal({ trip, onClose, onEdit, onDelete }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{trip.location}, {trip.country}</h2>
        <img src={trip.image_url} alt={trip.location} style={{ width: '100%' }} />
        <p><strong>Continent:</strong> {trip.continent}</p>
        <p><strong>Year:</strong> {trip.year}</p>
        <p><strong>Highlights:</strong> {trip.highlights}</p>
        {/* Edit and Delete Buttons */}
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}