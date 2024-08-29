import React, { useEffect, useState } from 'react';
import { getRentalsByCustomerId, cancelRental } from '../../services/RentTructService.js';
import UpdateRental from './UpdateRental';

const RentalHistory = ({ customerID }) => {
  const [rentals, setRentals] = useState([]);
  const [selectedRental, setSelectedRental] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchRentals();
  }, [customerID]);

  const fetchRentals = () => {
    getRentalsByCustomerId(customerID)
      .then(response => setRentals(response.data))
      .catch(error => console.error('Error fetching rental history:', error));
  };

  const handleCancel = (rentTruckNumber) => {
    cancelRental(rentTruckNumber)
      .then(() => setRentals(rentals.filter(r => r.rentTruckNumber !== rentTruckNumber)))
      .catch(error => console.error('Error canceling rental:', error));
  };

  const handleUpdateClick = (rental) => {
    setSelectedRental(rental);
    setIsUpdating(true);
  };

  const handleUpdateComplete = () => {
    setSelectedRental(null);
    setIsUpdating(false);
    fetchRentals();
  };

  return (
    <div>
      <h2>Rental History</h2>
      <ul>
        {rentals.map(rental => (
          <li key={rental.rentTruckNumber}>
            Truck: {rental.truck.model} ({rental.truck.licensePlate})<br />
            Pickup Location: {rental.pickupLocation}<br />
            Dropoff Location: {rental.dropoffLocation}<br />
            Pickup Time: {new Date(rental.pickupTime).toLocaleString()}<br />
            <button onClick={() => handleUpdateClick(rental)}>Update</button>
            <button onClick={() => handleCancel(rental.rentTruckNumber)}>Cancel</button>
          </li>
        ))}
      </ul>
      {isUpdating && selectedRental && (
        <UpdateRental rental={selectedRental} onUpdate={handleUpdateComplete} />
      )}
    </div>
  );
};

export default RentalHistory;
