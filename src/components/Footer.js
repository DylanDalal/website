import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#09153d",
        height: "15vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Futura",
        fontSize: "2vh",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* left group --------------------------------------------------- */}
      <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
        <NavLink to="/film" className="footer-text">
          Film Portfolio
        </NavLink>
        <NavLink to="/" className="footer-text">
          Home
        </NavLink>
        <NavLink to="/tech" className="footer-text">
          Tech Portfolio
        </NavLink>
      </div>

      {/* right group -------------------------------------------------- */}
      <div style={{ display: "flex", alignItems: "center", marginLeft: "10vw" }}>
        <a href="mailto:dylanmax@gmail.com" className="footer-text">
          Contact
        </a>
      </div>
    </footer>
  );
}
