import React, { useEffect, useState } from 'react';
import './Gallery.css';

const images = [
  { id: 1, src: '/images/buoy.jpg', alt: 'Los Angeles, CA' },
  { id: 2, src: '/images/morocco.jpg', alt: 'Description 3' },
  { id: 3, src: '/images/NorwayCat2.jpg', alt: 'Description 4' },
  { id: 4, src: '/images/boats.jpg', alt: 'Description 6' },
  { id: 5, src: '/images/baywatch.jpg', alt: 'Description 8' },
  { id: 6, src: '/images/mont_st.jpg', alt: 'Description 7' },
  { id: 7, src: '/images/volcano.jpg', alt: 'Description 8' },
  { id: 8, src: '/images/space_needle.jpg', alt: 'Description 8' },
  { id: 9, src: '/images/SeattleEye.jpg', alt: 'Description 8' },
  { id: 10, src: '/images/myk.jpg', alt: 'Description 8' }
];

const generatePositions = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    x: (i) * (90 / count), // Evenly distribute x values
    y: Math.random() * 80 + 55,   // Random y values
  }));
};

const Gallery = () => {
  const [scrollY, setScrollY] = useState(0);
  const [positions] = useState(() => generatePositions(images.length)); // Fixed positions
  const [hoveredImage, setHoveredImage] = useState(null); // Track hovered image

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="gallery">
      {images.map((image, index) => {
        const position = positions[index];
        return (
          <div
            key={image.id}
            className="gallery-image"
            style={{
              backgroundImage: `url(${image.src})`,
              left: `${position.x}%`,
              top: `calc(${position.y}% - ${scrollY * 0.1}px)`,
              zIndex: hoveredImage === image.id ? 10 : 1, // Bring to front on hover
            }}
            onMouseEnter={() => setHoveredImage(image.id)} // Set hovered image
            onMouseLeave={() => setHoveredImage(null)} // Reset on mouse leave
          />
        );
      })}
    </div>
  );
};

export default Gallery;