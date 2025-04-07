import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarSearch from './pages/CarSearch';
import Contact from './pages/Contact';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import ManageVehicles from './ManageVehicles'; // working on adding new route for car edit

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <div className="App-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/car-search" element={<CarSearch />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/manage-vehicles" element={<ManageVehicles />} /> {/* added new route for car edit */}
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
