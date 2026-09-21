import React, { useEffect, useRef } from "react";
import "./WebsiteWall.css";

/*
 * Tilted wall of site screenshots. Columns drift in opposite directions as the
 * section scrolls through the viewport, and the tall full-page captures pan
 * inside their frames. Everything is driven by one CSS variable (--p, 0 → 1).
 *
 * columns: [{ shift: <travel in column-widths, sign = direction>, shots: [
 *   { src, kind: "wide" | "tall", from?: <% of image height to start at>, pan?: <% to travel> }
 * ] }]
 */
export default function WebsiteWall({ columns }) {
  const wallRef = useRef(null);

  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = wall.getBoundingClientRect();
      const winH = window.innerHeight;
      const prog = Math.max(
        0,
        Math.min((winH - rect.top) / (winH + rect.height), 1)
      );
      wall.style.setProperty("--p", prog.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();                                // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="wall" ref={wallRef} aria-hidden="true">
      <div className="wall__plane">
        {columns.map((col, c) => (
          <div className="wall__col" key={c} style={{ "--shift": col.shift }}>
            {col.shots.map((shot, i) => (
              <figure className={`wall__card wall__card--${shot.kind}`} key={i}>
                {shot.kind === "wide" && (
                  <span className="wall__chrome"><i /><i /><i /></span>
                )}
                <div className="wall__frame">
                  <img
                    src={shot.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={
                      shot.kind === "tall"
                        ? { "--from": `${shot.from || 0}%`, "--pan": `${shot.pan || 0}%` }
                        : undefined
                    }
                  />
                </div>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
