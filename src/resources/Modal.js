import React, { useEffect } from 'react';
import './Modal.css';
import '../pages/Tech.css';

const Modal = ({ isOpen, headerText, bodyContent, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable background scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable background scrolling
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-inner">
          <span className="close-button" onClick={onClose}>&times;</span>
          <div className="modal-header" style={{ textAlign: 'center' }}>
            <h className="modal-header-text">{headerText}</h>
            <div className="subheader">
              PIPELINE DEVELOPMENT
            </div>
          </div>
          <div className="modal-body">
            {bodyContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
