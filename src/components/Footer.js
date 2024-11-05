import React, { useRef, useState, useEffect } from 'react';
import Radium, { StyleRoot } from 'radium';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Footer({ onSelectPage }) {

    return (
        <StyleRoot>
            <div style={{backgroundColor: "#000630",
                         height: "15vh",
                         width: "100%",
                         display: "flex",
                         fontFamily: "Futura",
                         justifyContent: "center",
                         fontSize: "2vh"
                         }}>
                <div style={{ display: "flex", alignItems: "center", gap: "3vw"}}>
                    <div className="footer-text">Film</div>
                    <div className="footer-text">Home</div>
                    <div className="footer-text">Tech</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", margin: "0 0 0 10vw"}}>
                    <div className="footer-text">Contact</div>
                </div>
            </div>
        </StyleRoot>
    );
}


export default Radium(Footer);