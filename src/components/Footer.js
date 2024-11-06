import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Footer({ onSelectPage }) {
    return (
        <div style={{
            backgroundColor: "#000630",
            height: "15vh",
            width: "100%",
            display: "flex",
            fontFamily: "Futura",
            justifyContent: "center",
            fontSize: "2vh",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
                <Link to="/film" className="footer-text" onClick={() => onSelectPage('Film')}>Film</Link>
                <Link to="/home" className="footer-text" onClick={() => onSelectPage('Home')}>Home</Link>
                <Link to="/tech" className="footer-text" onClick={() => onSelectPage('Tech')}>Tech</Link>
            </div>
            <div style={{ display: "flex", alignItems: "center", margin: "0 0 0 10vw" }}>
                <Link to="/contact" className="footer-text" onClick={() => onSelectPage('Contact')}>Contact</Link>
            </div>
        </div>
    );
}

export default Footer;
