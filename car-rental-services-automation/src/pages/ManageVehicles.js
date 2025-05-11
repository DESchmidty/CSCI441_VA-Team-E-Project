import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const ManageVehicles = () => {
    const { language } = useLanguage();

    const translations = {
        en: {
            manage: 'Manage Vehicles',
        },
        de: {
            manage: 'Fahrzeuge verwalten',
        },
    };

    const t = translations[language];

    return (
        <div>
            <h1>{t.manage}</h1>
        </div>
    );
};

export default ManageVehicles;
