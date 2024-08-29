import React, { useState } from 'react';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import RentTruck from './RentTruck';
import RentalHistory from './RentalHistory';

const CustomerManagement = () => {
  const [selectedCustomerID, setSelectedCustomerID] = useState(null);
  const [isRenting, setIsRenting] = useState(false);

  const handleFormSubmit = () => {
    setSelectedCustomerID(null);
  };

  const handleRentSubmit = () => {
    setIsRenting(false);
  };

  return (
    <div>
      <CustomerList
        onEdit={setSelectedCustomerID}
        onRent={(id) => {
          setSelectedCustomerID(id);
          setIsRenting(true);
        }}
      />
      <button onClick={() => setSelectedCustomerID(null)}>Add New Customer</button>
      {selectedCustomerID && !isRenting && (
        <CustomerForm customerID={selectedCustomerID} onFormSubmit={handleFormSubmit} />
      )}
      {isRenting && (
        <RentTruck customerID={selectedCustomerID} onRentSubmit={handleRentSubmit} />
      )}
      {selectedCustomerID && (
        <RentalHistory customerID={selectedCustomerID} />
      )}
    </div>
  );
};

export default CustomerManagement;
