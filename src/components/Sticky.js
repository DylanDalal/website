import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./StickyNavbar.scss";

export default function StickyNavbar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setShow(window.scrollY >= window.innerHeight * 2.25);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
