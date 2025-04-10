import React, { useEffect, useState } from 'react';

const CarSearch = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/cars`);
        const data = await response.json();
        setCars(data);
      } catch (err) {
        console.error('Error fetching cars:', err);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) =>
    `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Car Search</h1>
      <input
        type="text"
        placeholder="Search by make or model"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '300px', padding: '8px', marginBottom: '20px' }}
      />
      <ul>
        {filteredCars.map((car) => (
          <li key={car._id}>
            {car.make} {car.model} ({car.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarSearch;
