import React, { useEffect, useState } from 'react';
import './Gallery.css';

const images = [
  { id: 1, src: '/images/buoy.jpg', alt: 'Juneau, Alaska', zIndex: 1},
  { id: 2, src: '/images/morocco.jpg', alt: 'The Sahara Desert in Morocco', zIndex: 6},
  { id: 3, src: '/images/NorwayCat2.jpg', alt: 'A cat I saw in Norway lol', zIndex: 3},
  { id: 4, src: '/images/boats.jpg', alt: 'Boats off of Cape Cod', zIndex: 10},
  { id: 5, src: '/images/baywatch.jpg', alt: 'Venice Beach, CA', zIndex: 2},
  { id: 6, src: '/images/mont_st.jpg', alt: 'Mont St. Michel, France', zIndex: 8.5},
  { id: 7, src: '/images/volcano.jpg', alt: 'Arenal Volcano, Costa Rica', zIndex: 2.5},
  { id: 8, src: '/images/space_needle.jpg', alt: 'Space Needle, Seattle, WA', zIndex: 8},
  { id: 9, src: '/images/SeattleEye.jpg', alt: 'Seattle, WA', zIndex: 9.5},
  { id: 10, src: '/images/myk.jpg', alt: 'Mykonos, Greece', zIndex: 5}
];

const generatePositions = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    x: i * (90 / count), // Evenly distribute x values
  }));
};

const Gallery = () => {
  const [scrollY, setScrollY] = useState(0);
  const [positions] = useState(() => generatePositions(images.length)); // Fixed positions
  const [hoveredImage, setHoveredImage] = useState(null); // Track hovered image

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Use requestAnimationFrame for better performance
    const onScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="gallery">
      {images.map((image, index) => {
        const position = positions[index];
        const currentZIndex = hoveredImage === image.id ? 100 : image.zIndex; // Bring to front on hover
        const parallaxFactor = image.zIndex; // Use zIndex for parallax factor
        const translateY = scrollY  * (parallaxFactor * 0.013) - 70 ; // Adjust multiplier for effect

        return (
          <div
            key={image.id}
            className="gallery-image"
            style={{
              backgroundImage: `url(${image.src})`,
              left: `${position.x}%`,
              transform: `translateY(${translateY}px) scale(${hoveredImage === image.id ? 1.1 : 1})`,
              zIndex: currentZIndex,
              transition: 'transform 0.3s ease, z-index 0.3s ease',
            }}
            onMouseEnter={() => setHoveredImage(image.id)} // Set hovered image
            onMouseLeave={() => setHoveredImage(null)} // Reset on mouse leave
            title={image.alt} // Optional: Show alt text on hover
          />
        );
      })}
    </div>
  );
};

export default Gallery;
