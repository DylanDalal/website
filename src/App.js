import React, { useState } from 'react';
import Navbar from './components/Navbar.js';
import './App.css';
import Home from "./pages/Home";
import Film from "./pages/Film";
import Tech from "./pages/Tech";
import Footer from "./components/Footer.js";
import Particles from 'react-tsparticles';
import ParticleConfig from "./config/particle-config";

function App() {
    const [selectedPage, setSelectedPage] = useState('Story');

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
            {/* Pass setSelectedPage and selectedPage to Navbar and Footer */}
            <Navbar onSelectPage={setSelectedPage} selectedPage={selectedPage} />

            {/* Render the selected page component */}
            <div className="page-content">
                {getPageComponent()}
            </div>

            {/* Pass setSelectedPage to Footer as well */}
            <Footer onSelectPage={setSelectedPage} />
        </div>
    );
}

export default App;
