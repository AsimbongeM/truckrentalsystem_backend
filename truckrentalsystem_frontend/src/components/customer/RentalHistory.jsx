import React, { useState, useEffect } from 'react';
import { getRentTrucks } from '../../../../../truckrentalsystem_final/truckrentalsystem_frontend/src/services/RentTructService.js';
import { getAllCustomers } from '../../../../../truckrentalsystem_final/truckrentalsystem_frontend/src/services/CustomerService.js';

const RentalHistory = () => {
  const [rentals, setRentals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filteredRentals, setFilteredRentals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rentalsPerPage = 6;

  useEffect(() => {
    fetchRentals();
    fetchCustomers();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await getRentTrucks();
      setRentals(response.data);
    } catch (error) {
      console.error("Error fetching rentals:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await getAllCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterRentals(e.target.value, selectedCustomer);
  };

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
    filterRentals(searchTerm, e.target.value);
  };

  const filterRentals = (searchTerm, customerId) => {
    let filtered = rentals;

    if (searchTerm) {
      filtered = filtered.filter(rental =>
          rental.truck.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rental.truck.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (customerId) {
      filtered = filtered.filter(rental => rental.customer.customerId === customerId);
    }

    setFilteredRentals(filtered);
  };

  const indexOfLastRental = currentPage * rentalsPerPage;
  const indexOfFirstRental = indexOfLastRental - rentalsPerPage;
  const currentRentals = filteredRentals.slice(indexOfFirstRental, indexOfLastRental);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
      <div className="container mt-5">
        <h1 className="mb-4">Rental History</h1>
        <div className="row">
          <div className="col-md-4">
            <input
                type="text"
                className="form-control"
                placeholder="Search by truck model or license plate"
                value={searchTerm}
                onChange={handleSearchChange}
            />
          </div>
          <div className="col-md-4">
            <select
                className="form-control"
                value={selectedCustomer}
                onChange={handleCustomerChange}
            >
              <option value="">Select Customer</option>
              {customers.map(customer => (
                  <option key={customer.customerId} value={customer.customerId}>
                    {customer.name}
                  </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <ul className="list-group">
            {currentRentals.length > 0 ? (
                currentRentals.map(rental => (
                    <li key={rental.id} className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <div>
                          <strong>Customer:</strong> {rental.customer.name}<br />
                          <strong>Truck:</strong> {rental.truck.model} - {rental.truck.licensePlate}<br />
                          <strong>Rental Date:</strong> {new Date(rental.rentalDate).toLocaleDateString()}<br />
                          <strong>Return Date:</strong> {new Date(rental.returnDate).toLocaleDateString()}<br />
                          <strong>Status:</strong> {rental.rentalStatus}
                        </div>
                      </div>
                    </li>
                ))
            ) : (
                <li className="list-group-item">No rentals found.</li>
            )}
          </ul>

          {filteredRentals.length > rentalsPerPage && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  {[...Array(Math.ceil(filteredRentals.length / rentalsPerPage)).keys()].map(number => (
                      <li key={number + 1} className="page-item">
                        <button
                            onClick={() => paginate(number + 1)}
                            className={`page-link ${currentPage === number + 1 ? 'active' : ''}`}
                        >
                          {number + 1}
                        </button>
                      </li>
                  ))}
                </ul>
              </nav>
          )}
        </div>
      </div>
  );
};

export default RentalHistory;
