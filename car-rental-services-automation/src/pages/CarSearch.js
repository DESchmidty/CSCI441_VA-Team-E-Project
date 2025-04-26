import React, { useEffect, useState } from 'react';

const CarSearch = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/cars')
      .then(res => res.json())
      .then(data => setCars(data));
  }, []);

  return (
    <div>
      <h1>Car Search</h1>
      <input 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        placeholder="Search cars..." 
      />
      <ul>
        {cars
          .filter(car => 
            (car.make + ' ' + car.model).toLowerCase().includes(search.toLowerCase())
          )
          .map(car => (
            <li key={car._id}>
              {car.make} {car.model} ({car.year})
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CarSearch;
