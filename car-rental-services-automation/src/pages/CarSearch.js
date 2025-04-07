import React, { useEffect, useState } from 'react';
//working on a car search page, this should just get the cars but it doesn't seem to work
const CarSearch = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            const response = await fetch('http://localhost:5000/api/cars');
            const data = await response.json();
            setCars(data);
        };

        fetchCars();
    }, []);

    return (
        <div>
            <h1>Car Search</h1>
            <ul>
                {cars.map((car) => (
                    <li key={car._id}>
                        {car.make} {car.model} ({car.year})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarSearch;
