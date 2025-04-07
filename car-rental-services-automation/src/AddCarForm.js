import React, { useState, useEffect } from 'react';

const ManageVehicles = () => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [pricePerDay, setPricePerDay] = useState('');
    const [availability, setAvailability] = useState(true);
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState('');


    const fetchCars = async () => {
        const response = await fetch('http://localhost:5000/api/cars');
        const data = await response.json();
        setCars(data);
    };

    useEffect(() => {
        fetchCars();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:5000/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ make, model, year, pricePerDay, availability }),
        });

        if (response.ok) {
            alert('Car added successfully!');
            setMake('');
            setModel('');
            setYear('');
            setPricePerDay('');
            setAvailability(true);
            fetchCars();
        } else {
            const errorText = await response.text();
            console.error('Failed to add car:', errorText);
            alert(`Failed to add car: ${errorText}`);
        }
    };

    const handleDelete = async () => {
        if (!selectedCar) {
            alert('Please select a car to delete');
            return;
        }

        const response = await fetch(`http://localhost:5000/api/cars/${selectedCar}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Car deleted successfully!');
            setSelectedCar('');
            fetchCars(); 
        } else {
            const errorText = await response.text();
            console.error('Failed to delete car:', errorText);
            alert(`Failed to delete car: ${errorText}`);
        }
    };

    return (
        <div>
            <h1>Manage Vehicles</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Make:
                    <input
                        type="text"
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Model:
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Year:
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Price Per Day:
                    <input
                        type="number"
                        value={pricePerDay}
                        onChange={(e) => setPricePerDay(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Availability:
                    <input
                        type="checkbox"
                        checked={availability}
                        onChange={(e) => setAvailability(e.target.checked)}
                    />
                </label>
                <br />
                <button type="submit">Add Car</button>
            </form>
            <h2>Delete a Vehicle</h2>
            <label>
                Select Car:
                <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)}>
                    <option value="">--Select a car--</option>
                    {cars.map((car) => (
                        <option key={car._id} value={car._id}>
                            {car.make} {car.model} ({car.year})
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <button onClick={handleDelete}>Delete Car</button>
        </div>
    );
};

export default ManageVehicles;
