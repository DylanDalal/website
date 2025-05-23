import React from 'react';

const VisitWebsiteButton = ({ url, text = "Visit website", newTab = true }) => {
    const containerStyle = {
        cursor: 'pointer',
    };

    const buttonStyle = {
        backgroundColor: '#007BFF',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        fontFamily: 'Futura',
        margin: '4px 2px',
        borderRadius: '12px',
        boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
    };

  return (
      <a
        href={url}
        style={buttonStyle}
        target={newTab ? "_blank" : "_self"}
        rel="noopener noreferrer"
      >
        {text}
      </a>
  );
};

export default VisitWebsiteButton;
