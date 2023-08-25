import React, { useState } from 'react';
import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import ReactDOM from 'react-dom';
import './App.css';
import Home from "./pages/Home";
import Film from "./pages/Film";

function App() {
    const [selectedPage, setSelectedPage] = useState('Story');

    const getPageComponent = () => {
        switch (selectedPage) {
            case 'Story':
                return <Home/>;
            case 'Film':
                return <Film/>;
            default:
                return null;
        }
    };

    return (
        <div className="App">
            <Router>
                <Navbar onSelectPage={setSelectedPage}/>
                <Routes>
                    <Route path='/' exact element={getPageComponent()}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
