import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import HomePage from './pages/HomePage';
import CarSearch from './pages/CarSearch';
import Contact from './pages/Contact';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import ManageVehicles from './pages/ManageVehicles';
import CustomerInformation from './pages/CustomerInformation';
import ManageCustomers from './pages/ManageCustomers';

function App() {
    const [darkMode, setDarkMode] = useState(false); 

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.className = darkMode ? '' : 'dark-mode'; 
    };

    return (
        <LanguageProvider>
            <div className="App">
                <Router>
                    <Navbar toggleDarkMode={toggleDarkMode} />
                    <div className="App-content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/car-search" element={<CarSearch />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/manage-vehicles" element={<ManageVehicles />} />
                            <Route path="/book/:carId" element={<CustomerInformation />} />
                            <Route path="/manage-customers" element={<ManageCustomers />} />
                        </Routes>
                    </div>
                </Router>
            </div>
        </LanguageProvider>
    );
}

export default App;
