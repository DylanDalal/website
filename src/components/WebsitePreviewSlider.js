import React from "react";
import "./WebsitePreviewSlider.css";

export default function WebsitePreviewSlider({ images }) {
  return (
    <div className="wps-track">
      {images.map((src, i) => (
        <div className="wps-slice" key={i}>
          <img className="wps-shot" src={src} alt={`website preview ${i+1}`} />
        </div>
      ))}
    </div>
  );
}
