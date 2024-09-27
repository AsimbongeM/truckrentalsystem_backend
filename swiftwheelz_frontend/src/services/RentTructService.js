import axios from 'axios';
const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/rentTruck";

export const getRentTrucks = () => axios.get(`${REST_API_BASE_URL}/getAll`);
export const getRentTruckById = (rentTruckNumber) => axios.get(`${REST_API_BASE_URL}/read/${rentTruckNumber}`);
export const createRentTruck = (rentTruck) => axios.post(`${REST_API_BASE_URL}/create`, rentTruck);
export const deleteRentTruckById = (rentTruckNumber) => axios.delete(`${REST_API_BASE_URL}/delete/${rentTruckNumber}`);
export const updateRental = (rentId, rentTruck) => axios.put(`${REST_API_BASE_URL}/update/${rentId}`, rentTruck);

export const getRentalsByCustomerId = async (customerId) => axios.get(`${REST_API_BASE_URL}/getRentalsByCustomerId/${customerId}`);


export const markTruckAsReturned = (rentId) =>
    axios.patch(`${REST_API_BASE_URL}/markAsReturned/${rentId}`);

export const getAvailableTrucks = () => axios.get(`${REST_API_BASE_URL}/not returned`);
export const cancelRental =  (cancellation) => axios.post(`${REST_API_BASE_URL}/cancel/cancel`,cancellation );
