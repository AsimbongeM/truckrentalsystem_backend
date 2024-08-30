import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRentTruckById, updateRentTruck } from '../../services/RentTructService.js'; // Adjust the path based on your project structure
import { getAllTrucks } from '../../services/TruckService.js';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const UpdateRental = () => {
  const { rentTruckNumber } = useParams();
  const [rental, setRental] = useState(null);
  const [trucks, setTrucks] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [rentalStatus, setRentalStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRentalDetails();
    fetchTrucks();
  }, [rentTruckNumber]);

  const fetchRentalDetails = async () => {
    try {
      const response = await getRentTruckById(rentTruckNumber);
      const rentalData = response.data;
      setRental(rentalData);
      setSelectedTruck(rentalData.truckNumber); // Assuming truckNumber is the identifier
      setReturnDate(rentalData.returnDate);
      setRentalStatus(rentalData.rentalStatus);
    } catch (error) {
      console.error('Error fetching rental details:', error);
    }
  };

  const fetchTrucks = async () => {
    try {
      const response = await getAllTrucks();
      setTrucks(response.data);
    } catch (error) {
      console.error('Error fetching trucks:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateRentTruck(rentTruckNumber, {
        truckNumber: selectedTruck,
        returnDate,
        rentalStatus,
      });
      navigate('/rental-history'); // Redirect to rental history page after update
    } catch (error) {
      console.error('Error updating rental:', error);
    }
  };

  if (!rental) return <div>Loading...</div>;

  return (
      <Container className="mt-4">
        <h1>Update Rental</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formTruck">
            <Form.Label column sm={2}>Truck</Form.Label>
            <Col sm={10}>
              <Form.Select
                  value={selectedTruck}
                  onChange={(e) => setSelectedTruck(e.target.value)}
              >
                <option value="">Select Truck</option>
                {trucks.map(truck => (
                    <option key={truck.vin} value={truck.vin}>
                      {truck.model} - {truck.licensePlate}
                    </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formReturnDate">
            <Form.Label column sm={2}>Return Date</Form.Label>
            <Col sm={10}>
              <Form.Control
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formRentalStatus">
            <Form.Label column sm={2}>Status</Form.Label>
            <Col sm={10}>
              <Form.Control
                  type="text"
                  value={rentalStatus}
                  onChange={(e) => setRentalStatus(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Rental
          </Button>
        </Form>
      </Container>
  );
};

export default UpdateRental;