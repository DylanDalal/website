import React, { useEffect, useState } from 'react';
import './StickyNavbar.scss';

function StickyNavbar({ pageContentRef, onSelectPage }) {
  const [isVisible, setIsVisible] = useState(false);

  // Same scroll logic you use in the Footer
  const vhAmount = 250;
  const scrollPosition = window.innerHeight * (vhAmount / 100);

  useEffect(() => {
    const handleScroll = () => {
      if (!pageContentRef?.current) return;

      // The top of .page-content:
      const contentTop = pageContentRef.current.offsetTop;

      // If user has scrolled beyond that point, fade in background
      if (window.scrollY >= contentTop) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageContentRef]);

  // Same approach as Footer to select page & scroll
  const handleClick = (page) => {
    onSelectPage(page);
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
  };

  return (
    <div className={`stickyNavbar ${isVisible ? 'show' : 'hide'}`}>
      <div className="navLinks">
        <div className="navLink" onClick={() => handleClick('Film')}>
          Film Portfolio
        </div>
        <div className="navLink" onClick={() => handleClick('Story')}>
          Home
        </div>
        <div className="navLink" onClick={() => handleClick('Tech')}>
          Tech Portfolio
        </div>
      </div>
    </div>
  );
}

export default StickyNavbar;
