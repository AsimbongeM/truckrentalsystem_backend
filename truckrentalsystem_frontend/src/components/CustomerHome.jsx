import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

const CustomerHome = () => {
    const navigate = useNavigate();

    const handleViewProfile = () => {
        navigate('/customer-profile');
    };

    const handleBrowseTrucks = () => {
        navigate('/rent-trucks');
    };

    const handleManageRentals = () => {
        navigate('/rental-history');
    };

    const handleAccountSettings = () => {
        navigate('/account-settings');
    };

    return (
        <Container className="customer-home mt-4">
            <div className="header-section text-center mb-4">
                <h1>Welcome to Your Dashboard</h1>
                <p>Manage your account and explore our truck rental options</p>
            </div>
            <Row className="g-4">
                <Col md={6} lg={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>View Profile</Card.Title>
                            <Card.Text>
                                Update your personal information and view your account details.
                            </Card.Text>
                            <Button variant="primary" onClick={handleViewProfile}>
                                Go to Profile
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Browse Trucks</Card.Title>
                            <Card.Text>
                                Explore our range of trucks available for rent.
                            </Card.Text>
                            <Button variant="primary" onClick={handleBrowseTrucks}>
                                Browse Trucks
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Manage Rentals</Card.Title>
                            <Card.Text>
                                View and manage your current and past rentals.
                            </Card.Text>
                            <Button variant="primary" onClick={handleManageRentals}>
                                View Rentals
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={3}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Account Settings</Card.Title>
                            <Card.Text>
                                Update your account settings and preferences.
                            </Card.Text>
                            <Button variant="primary" onClick={handleAccountSettings}>
                                Settings
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomerHome;
