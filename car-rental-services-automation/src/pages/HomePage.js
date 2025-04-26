import React from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import './HomePage.css';

const HomePage = () => {
  return (
    <Container>
      <h1 className="my-4">Available Vehicles</h1>
      <Form>
        <Form.Group controlId="categoryFilter">
          <Form.Label>Filter by Category</Form.Label>
          <Form.Control as="select">
            <option>All</option>
            <option>SUVs</option>
            <option>Sedans</option>
            <option>Electric</option>
            <option>Luxury</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Row className="my-4">
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Vehicle 1</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Make and Model</Card.Subtitle>
              <Card.Text>
                Year: 2021<br />
                Rental Price: $50/day<br />
                Availability: Available<br />
                Thumbnail: [Image Placeholder]
              </Card.Text>
              <Button variant="primary">View Details</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Vehicle 2</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Make and Model</Card.Subtitle>
              <Card.Text>
                Year: 2020<br />
                Rental Price: $60/day<br />
                Availability: Not Available<br />
                Thumbnail: [Image Placeholder]
              </Card.Text>
              <Button variant="primary">View Details</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Vehicle 3</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Make and Model</Card.Subtitle>
              <Card.Text>
                Year: 2019<br />
                Rental Price: $70/day<br />
                Availability: Available<br />
                Thumbnail: [Image Placeholder]
              </Card.Text>
              <Button variant="primary">View Details</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;