import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllTrucks, getTruckImageUrl } from "../services/TruckService.js";
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';

const CustomerHome = () => {
    const [trucks, setTrucks] = useState([]);
    const [filteredTrucks, setFilteredTrucks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [branchesData, setBranchesData] = useState([]); // Store branches data here
    const navigate = useNavigate();
    let searchTimeout;
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchTrucks = async () => {
            try {
                const response = await getAllTrucks();
                const trucksWithImages = response.data.map(truck => ({
                    ...truck,
                    image: getTruckImageUrl(truck.vin)
                }));
                setTrucks(trucksWithImages);
                setFilteredTrucks(trucksWithImages);
            } catch (error) {
                console.error('There was an error fetching the trucks!', error);
            }
        };
        fetchTrucks();
    }, []);

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Debounce the search function to improve performance
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        searchTimeout = setTimeout(() => filterTrucks(query), 300);
    };

    const filterTrucks = (query) => {
        const filtered = trucks.filter(truck =>
            truck.model.toLowerCase().includes(query) ||
            truck.licensePlate.toLowerCase().includes(query)
        );
        setFilteredTrucks(filtered);
    };

    const handleGetQuote = (truckId) => {
        navigate(`/get-quote/${truckId}`);
    };

    const handleViewRentalHistory = () => {
        navigate('/rental-history');
    };

    const handleCreateRental = () => {
        navigate('/get-quote/:truckId');
    };

    const handleSignOut = () => {
        navigate('/'); // Redirect to login page after signing out
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="customer-home">
            {/* Main Content */}
            <div className="text-center mb-5">
                <h1>Truck Rental Made Easy</h1>
                <p>Explore our diverse fleet of trucks and manage your rentals effortlessly</p>
            </div>

            {/* Search and Truck Listings */}
            <Container className="mt-4">
                <Form.Group className="mb-4">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search trucks by model or license plate"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <Button variant="outline-secondary">Search</Button>
                    </InputGroup>
                </Form.Group>
                <Row className="g-4">
                    {filteredTrucks.length ? (
                        filteredTrucks.map(truck => (
                            <Col md={4} lg={3} key={truck.vin}>
                                <Card className="d-flex flex-column h-100">
                                    <Card.Img variant="top" src={truck.image} alt={`Truck ${truck.model}`} />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{truck.model}</Card.Title>
                                        <Card.Text className="flex-grow-1">
                                            <strong>Type:</strong> {truck.truckType.typeName} <br />
                                            <strong>Capacity:</strong> {truck.truckType.capacity} tons <br />
                                            <strong>Transmission:</strong> {truck.truckType.transmission} <br />
                                            <strong>Fuel Consumption:</strong> {truck.truckType.fuelConsumption} km/l <br />
                                            <strong>Fuel Type:</strong> {truck.truckType.fuelType} <br />
                                            <strong>Mileage:</strong> {truck.currentMileage} km <br />
                                            <strong>Dimensions (l*w*h):</strong> {truck.truckType.dimensions}m <br />
                                            <strong>License Plate:</strong> {truck.licensePlate}
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => handleGetQuote(truck.vin)}>Get Quote</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No trucks available at the moment</p>
                    )}
                </Row>
            </Container>

            {/* Action Buttons */}
            <div className="text-center mt-5">
                <Button variant="secondary" onClick={handleViewRentalHistory}>View Rental History</Button>
                <Button variant="primary" className="ms-3" onClick={handleCreateRental}>Create Rental</Button>
            </div>
        </div>
    );
};

export default CustomerHome;
