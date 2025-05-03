// JavaScript source code

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CustomerInformation = () => {
    const { carId } = useParams();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, carId }),
        });

        if (response.ok) {
            // new fetch to grab availability of cars with debug functions
            const availabilityResponse = await fetch(`http://localhost:3000/api/cars/${carId}/availability`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ availability: false }),
            });

            if (availabilityResponse.ok) {
                alert('Customer information saved and car marked as unavailable.');
            } else {
                alert('Failed to update car availability.');
            }
        } else {
            alert('Failed to save customer information.');
        }
    };
    return (
        <div>
            <h1>Customer Information</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Phone:
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CustomerInformation;
