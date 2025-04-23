import React, { useState, useEffect } from 'react';
import Radium from 'radium';
import '../App.css';
import './Film.css';
import './Home.css';

function Art() {
  return (
    <>
      <div className="first_film" style={{ position: 'relative', zIndex: 1 }}>
        <div className="column-container" style={{ gap: '3vw', maxWidth: '80vw' }}>
          <div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Radium(Art);
