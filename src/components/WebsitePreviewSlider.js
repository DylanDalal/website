import React, { useEffect, useRef, useMemo } from "react";
import "./WebsitePreviewSlider.css";

export default function WebsitePreviewSlider({ images }) {
  const trackRef = useRef(null);
  const imgRefs  = useRef([]);

  const speeds = useMemo(
    () => images.map(() => 0.6 + Math.random() * 0.4), // 0.6-1.4
    [images.length]
  );

  useEffect(() => {
    const onScroll = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect   = track.getBoundingClientRect();
      const winH   = window.innerHeight;
      const prog   = Math.max(
        0,
        Math.min((winH - rect.top) / (winH + rect.height), 1)
      );

      const baseShift = 220; // px to travel overall

      imgRefs.current.forEach((img, i) => {
        if (!img) return;
        img.style.transform = `
          skewX(8deg)
          scale(1.05)
          translateY(${prog * baseShift * speeds[i] - 100}px)
          translateY(-5px)   /* hide bottom sliver */
        `;
      });
    };

    onScroll();                              // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speeds]);

  return (
    <div className="wps-wrapper">
      <div className="wps-track" ref={trackRef}>
        {images.map((src, i) => (
          <div className="wps-slice" key={i}>
            <img
              className="wps-shot"
              src={src}
              alt={`website preview ${i + 1}`}
              ref={el => (imgRefs.current[i] = el)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
