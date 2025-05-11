import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; //added a navigate import to make the buttons actually go somewhere
import { useLanguage } from '../context/LanguageContext';
import './HomePage.css';

const HomePage = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate(); // same here, initializes the navigate
    const { language } = useLanguage();

    const translations = {
        en: {
            welcome: 'Welcome to Car Rental Services!',
        },
        de: {
            welcome: 'Willkommen bei der Autovermietung!',
        },
    };

    const t = translations[language];

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/cars');
                const data = await response.json();

                const topCars = data.sort((a, b) => b.year - a.year).slice(0, 3);
                setCars(topCars);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };



        fetchCars();
    }, []);


    const handleBookNow = (carId) => {
        navigate(`/book/${carId}`); // pretty much just copied code from carsearch page to here to go to the sameplace with the id "captured"
    };

    return (
        <Container>
            <h1 className="my-4">{t.welcome}</h1>
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
                {cars.map((car) => (
                    <Col md={4} key={car._id} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{car.make} {car.model}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Year: {car.year}</Card.Subtitle>
                                <Card.Text>
                                    Rental Price: ${car.pricePerDay}/day<br />
                                    Availability: {car.availability ? 'Available' : 'Not Available'}
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={() => handleBookNow(car._id)} // handles the booking
                                    disabled={!car.availability} // should disasble the button if unavailable
                                >
                                    Click to book now!
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default HomePage;
