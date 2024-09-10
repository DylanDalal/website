import React, { useEffect } from 'react';
import './Modal.css';



const Modal = ({ isOpen, content, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';  // Disable scrolling
    } else {
      document.body.style.overflow = 'auto';    // Re-enable scrolling
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
