import React from 'react';
import './Navbar.scss';

function Footer({ onSelectPage }) {
    const vhAmount = 250;
    const scrollPosition = window.innerHeight * (vhAmount / 100);

    const handleClick = (page) => {
        onSelectPage(page);
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    };

    return (
        <div style={{
            backgroundColor: "#09153d",
            height: "15vh",
            width: "100%",
            display: "flex",
            fontFamily: "Futura",
            justifyContent: "center",
            fontSize: "2vh",
            position: "relative",
            zIndex: 1
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
                <div className="footer-text" onClick={() => handleClick('Film')}>Film Portfolio</div>
                <div className="footer-text" onClick={() => handleClick('Story')}>Home</div>
                <div className="footer-text" onClick={() => handleClick('Tech')}>Tech Portfolio</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", margin: "0 0 0 10vw" }}>
                <div className="footer-text" onClick={() => handleClick('Contact')}>Contact</div>
            </div>
        </div>
    );
}

export default Footer;
