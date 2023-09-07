import React, { useState, useEffect } from 'react';
import './FadeDiv.scss';

const FadeVideo = ({ youtubeVideoId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [prevScrollY, setPrevScrollY] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    if (scrollTop > prevScrollY) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }
    setPrevScrollY(scrollTop);

    const elementTop = document.body.getBoundingClientRect().top;

    // Calculate when the element is in the viewport
    if (elementTop < windowHeight * 0.75 && scrollDirection === "down") {
      setIsVisible(true);
    } else if (elementTop > windowHeight && scrollDirection === "up") {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollDirection]);

  return (
    <>
      {isVisible && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
          title="YouTube video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
    </>
  );
};

export default FadeVideo;
