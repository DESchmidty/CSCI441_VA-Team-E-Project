import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/cars`);
        const data = await response.json();
        setCars(data);
      } catch (err) {
        console.error("Failed to fetch cars:", err);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter(car => {
    if (category === 'All') return true;
    return car.category === category; // Optional: if you implement categories later
  });

  return (
    <Container>
      <h1 className="my-4">Available Vehicles</h1>
      <Form>
        <Form.Group controlId="categoryFilter">
          <Form.Label>Filter by Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>SUVs</option>
            <option>Sedans</option>
            <option>Electric</option>
            <option>Luxury</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Row className="my-4">
        {filteredCars.map((car) => (
          <Col md={4} key={car._id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{car.make} {car.model}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Year: {car.year}</Card.Subtitle>
                <Card.Text>
                  Rental Price: ${car.pricePerDay}/day<br />
                  Availability: {car.availability ? 'Available' : 'Not Available'}
                </Card.Text>
                <Button variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
