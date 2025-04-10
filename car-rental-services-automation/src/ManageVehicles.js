import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const ManageVehicles = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [availability, setAvailability] = useState(true);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState('');

  const fetchCars = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/cars`);
    const data = await response.json();
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/cars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      alert(`Failed to add car: ${errorText}`);
    }
  };

  const handleDelete = async () => {
    if (!selectedCar) return alert('Please select a car to delete');

    const response = await fetch(`${process.env.REACT_APP_API_URL}/cars/${selectedCar}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Car deleted successfully!');
      setSelectedCar('');
      fetchCars();
    } else {
      const errorText = await response.text();
      alert(`Failed to delete car: ${errorText}`);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Manage Vehicles</h1>
      <Row>
        <Col md={6}>
          <Card className="p-3 mb-4">
            <Card.Title>Add a Vehicle</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Make</Form.Label>
                <Form.Control type="text" value={make} onChange={(e) => setMake(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Model</Form.Label>
                <Form.Control type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Year</Form.Label>
                <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price Per Day</Form.Label>
                <Form.Control type="number" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} required />
              </Form.Group>
              <Form.Check 
                type="checkbox"
                label="Available"
                checked={availability}
                onChange={(e) => setAvailability(e.target.checked)}
              />
              <Button className="mt-3" variant="primary" type="submit">Add Car</Button>
            </Form>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 mb-4">
            <Card.Title>Delete a Vehicle</Card.Title>
            <Form.Group className="mb-3">
              <Form.Label>Select Car</Form.Label>
              <Form.Select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)}>
                <option value="">--Select a car--</option>
                {cars.map((car) => (
                  <option key={car._id} value={car._id}>
                    {car.make} {car.model} ({car.year})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="danger" onClick={handleDelete}>Delete Car</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageVehicles;
