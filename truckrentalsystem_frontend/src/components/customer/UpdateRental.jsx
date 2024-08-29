import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateRental = ({ rental, onUpdate }) => {
  const [pickupLocation, setPickupLocation] = useState(rental.pickupLocation || '');
  const [dropoffLocation, setDropoffLocation] = useState(rental.dropoffLocation || '');
  const [pickupTime, setPickupTime] = useState(rental.pickupTime || '');
  const [selectedTruck, setSelectedTruck] = useState(rental.truckId || '');
  const [availableTrucks, setAvailableTrucks] = useState([]);

  useEffect(() => {
    axios.get('/api/trucks/available')
      .then(response => setAvailableTrucks(response.data))
      .catch(error => console.error('Error fetching available trucks:', error));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedRental = {
      ...rental,
      pickupLocation,
      dropoffLocation,
      pickupTime,
      truckId: selectedTruck
    };

    axios.put(`/api/rentals/${rental.rentId}`, updatedRental)
      .then(() => onUpdate())
      .catch(error => console.error('Error updating rental:', error));
  };

  return (
    <div>
      <h2>Update Rental</h2>
      <form onSubmit={handleUpdate}>
        <label>Pickup Location:</label>
        <input type="text" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} required />

        <label>Dropoff Location:</label>
        <input type="text" value={dropoffLocation} onChange={(e) => setDropoffLocation(e.target.value)} required />

        <label>Pickup Time:</label>
        <input type="datetime-local" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />

        <label>Change Truck:</label>
        <select value={selectedTruck} onChange={(e) => setSelectedTruck(e.target.value)} required>
          <option value="">Select a truck</option>
          {availableTrucks.map(truck => (
            <option key={truck.truckID} value={truck.truckID}>
              {truck.model} - {truck.licensePlate}
            </option>
          ))}
        </select>

        <button type="submit">Update Rental</button>
      </form>
    </div>
  );
};

export default UpdateRental;
