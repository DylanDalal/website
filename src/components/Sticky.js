import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./StickyNavbar.scss";

export default function StickyNavbar() {
  const [show, setShow] = useState(false);
  const location = useLocation();

  const isWebRoute = location.pathname === "/web";

  useEffect(() => {
    if (isWebRoute) {
      setShow(true); // Always show for /web
      return;        // Skip scroll listener
    }

    const onScroll = () =>
      setShow(window.scrollY >= window.innerHeight * 2.25);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isWebRoute]);

  return (
    <div className={`stickyNavbar ${show ? "show" : "hide"}`}>
      <div className="navLinks">
        <NavLink to="/"     className="navLink">Home</NavLink>
        <NavLink to="/film" className="navLink">Film Portfolio</NavLink>
        <NavLink to="/tech" className="navLink">Tech Portfolio</NavLink>
      </div>
    </div>
  );
}
