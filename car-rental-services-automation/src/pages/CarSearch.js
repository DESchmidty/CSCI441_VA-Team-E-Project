import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const CarSearch = () => {
    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { language } = useLanguage();

    const translations = {
        en: {
            search: 'Search for Cars',
        },
        de: {
            search: 'Autos suchen',
        },
    };

    const t = translations[language];

    useEffect(() => {
        fetch('http://localhost:3000/api/cars')
            .then(res => res.json())
            .then(data => setCars(data));
    }, []);

    const handleBookClick = (carId) => {
        navigate(`/book/${carId}`);

        //should refresh the cars after booking
        fetch('http://localhost:3000/api/cars')
            .then(res => res.json())
            .then(data => setCars(data));
    };

    return (
        <Container>
            <h1 className="my-4">{t.search}</h1>
            <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search cars by make or model..."
                className="form-control mb-4"
            />
            <Row>
                {cars
                    .filter(car =>
                        (car.make + ' ' + car.model).toLowerCase().includes(search.toLowerCase())
                    )
                    .map(car => (
                        <Col md={4} key={car._id} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{car.make} {car.model}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Year: {car.year}</Card.Subtitle>
                                    <Card.Text>
                                        Rental Price: ${car.pricePerDay}/day<br />
                                        {car.availability ? 'Available' : 'Not Available'}
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleBookClick(car._id)} 
                                        disabled={!car.availability}
                                    >
                                        Click to book
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
            </Row>
        </Container>
    );
};

export default CarSearch;
