import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarSearch from './pages/CarSearch';
import Contact from './pages/Contact';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import ManageVehicles from './ManageVehicles';

function App() {
    return (
        <Router>
            <div className="d-flex">
                <Navbar />
                <div className="App-content" style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/car-search" element={<CarSearch />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/manage-vehicles" element={<ManageVehicles />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
