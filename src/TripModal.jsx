import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TripModal.css';
import { ConfirmationModal } from './ConfirmationModal';

export function TripModal({ trip, onClose, onEdit, onDelete }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  // NEW: Handler for confirming deletion
  const handleConfirmDelete = () => {
    setShowConfirmation(false);
    onDelete();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content modal-custom-bg">
          <div className="modal-header">
            <h5 className="modal-title">
              {trip.location}, {trip.country}
            </h5>
          </div>
          <div className="modal-body">
            <img
              src={trip.image_url}
              alt={trip.location}
              className="img-fluid mb-3"
            />
            <p>
              <strong>Continent:</strong> {trip.continent}
            </p>
            <p>
              <strong>Year:</strong> {trip.year}
            </p>
            <p>
              <strong>Highlights:</strong> {trip.highlights}
            </p>
          </div>
          <div className="modal-footer justify-content-between">
            <button
              type="button"
              className="btn edit-btn"
              onClick={onEdit}
            >
              Edit
            </button>
            {/* NEW: Update Delete button to show confirmation modal */}
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => setShowConfirmation(true)}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {/* NEW: Render ConfirmationModal when showConfirmation is true */}
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete this trip?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
}
