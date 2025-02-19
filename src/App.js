import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar.js';
import './App.css';
import Home from "./pages/Home";
import Film from "./pages/Film";
import Tech from "./pages/Tech";
import StickyNavbar from "./components/Sticky.js";
import Footer from "./components/Footer.js";
import Particles from 'react-tsparticles';
import ParticleConfig from "./config/particle-config";

function App() {
    const [selectedPage, setSelectedPage] = useState('Story');
    const pageContentRef = useRef(null);

    // Dynamically render the selected page component
    const getPageComponent = () => {
        switch (selectedPage) {
            case 'Story':
                return <Home />;
            case 'Film':
                return <Film />;
            case 'Tech':
                return <Tech />;
            case 'Art':
                return;
            case 'Blog':
                return;
            default:
                return <Home />; // Default to Home if none match
        }
    };

    return (
        <div className="App">
            <div className="particles-background">
                <Particles params={ParticleConfig} />
            </div>

            {/* Standard Navbar (always visible) */}
            <Navbar onSelectPage={setSelectedPage} selectedPage={selectedPage} />

            {/* Sticky Navbar that changes background after scrolling past .page-content */}
            <StickyNavbar pageContentRef={pageContentRef} onSelectPage={setSelectedPage} />

            {/* Main content, referenced by pageContentRef */}
            <div className="page-content" ref={pageContentRef}>
                {getPageComponent()}
            </div>

            {/* Footer */}
            <Footer onSelectPage={setSelectedPage} />
        </div>
    );
}

export default App;
