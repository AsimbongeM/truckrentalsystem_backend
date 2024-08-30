import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createRentTruck } from '../../../../../truckrentalsystem_final/truckrentalsystem_frontend/src/services/RentTructService.js';

const CustomerMakeRental = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { formData, price, truck } = state || {};

    const handleConfirmRental = async () => {
        try {
            const selectedPickUp = {}; // Populate based on formData
            const selectedDropOff = {}; // Populate based on formData

            const updatedRentData = {
                rentDate: formData.rentalDate,
                returnDate: formData.returnDate,
                totalCost: price,
                isPaymentMade: false,
                vin: truck,
                pickUp: selectedPickUp,
                dropOff: selectedDropOff,
            };

            await createRentTruck(updatedRentData);
            navigate('/rental-history'); // Redirect to rental history page on success
        } catch (error) {
            console.error('Error creating rental:', error);
        }
    };

    return (
        <div className="make-rental-container">
            <h1>Confirm Your Rental</h1>
            <p>Total Price: R{price}</p>
            <p>Rental Date: {formData.rentalDate}</p>
            <p>Return Date: {formData.returnDate}</p>
            {/* Add more details as needed */}
            <button onClick={handleConfirmRental}>Confirm Rental</button>
        </div>
    );
};

export default CustomerMakeRental;
