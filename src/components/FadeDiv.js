import React, { useState, useEffect } from 'react';
import './FadeDiv.scss';


const FadeDiv = ({ text, className, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [prevScrollY, setPrevScrollY] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const element = document.getElementById('fade-div');

    if (scrollTop > prevScrollY) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }
    setPrevScrollY(scrollTop);

    if (element) {
      const elementTop = element.getBoundingClientRect().top;

      // Calculate when the element is in the viewport
      if (elementTop < windowHeight * 0.75 && scrollDirection === "down") {
        setIsVisible(true);
      } else if (elementTop > windowHeight && scrollDirection === "up") {
        setIsVisible(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollDirection]);

  return (
    <div id="fade-div" className={`fade-in ${isVisible ? 'visible' : ''}`} >
        <div className={className} style={{justifyContent: "center"}} onClick={onClick}>
          {text}
        </div>
    </div>
  );
};

export default FadeDiv;
