import React from 'react';
import './ConfirmationModal.css';

export function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{message}</h3>
        <div className="button-group">
          <button className="btn confirm-btn" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn cancel-btn" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
