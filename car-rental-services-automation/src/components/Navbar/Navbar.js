import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Navbar.css';

const Navbar = ({ toggleDarkMode }) => {
  const [open, setOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const translations = {
    en: {
      title: 'Car Rental Services',
      home: 'Home',
      carSearch: 'Car Search',
      contact: 'Contact',
      manageVehicles: 'Manage Vehicles',
      manageCustomers: 'Manage Customers',
    },
    de: {
      title: 'Autovermietung',
      home: 'Startseite',
      carSearch: 'Autosuche',
      contact: 'Kontakt',
      manageVehicles: 'Fahrzeuge verwalten',
      manageCustomers: 'Kunden verwalten',
    },
  };

  const t = translations[language];

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const closeSidebar = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.navbar') && !e.target.closest('.menu-button')) {
        closeSidebar();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <button className="menu-button" onClick={toggleSidebar}>☰ Menu</button>

      <button onClick={toggleDarkMode} className="dark-mode-button">
        Toggle Dark Mode
      </button>

      <button onClick={toggleLanguage} className="localization-button">
        {language === 'en' ? 'DE' : 'EN'}
      </button>

      <nav className={`navbar ${open ? 'open' : ''}`}>
        <h1 className="navbar-title">{t.title}</h1>
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">{t.home}</Link>
          </li>
          <li className="navbar-item">
            <Link to="/car-search" className="navbar-link">{t.carSearch}</Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-link">{t.contact}</Link>
          </li>
          <li className="navbar-item">
            <Link to="/manage-vehicles" className="navbar-link">{t.manageVehicles}</Link>
          </li>
          <li className="navbar-item">
            <Link to="/manage-customers" className="navbar-link">{t.manageCustomers}</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
