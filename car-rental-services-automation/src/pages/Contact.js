import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { language } = useLanguage();

    const translations = {
        en: {
            contactUs: 'Contact Us',
        },
        de: {
            contactUs: 'Kontaktieren Sie uns',
        },
    };

    const t = translations[language];

    return (
        <div>
            <h1>{t.contactUs}</h1>
        </div>
    );
};

export default Contact;