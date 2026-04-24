import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

export const addInstructor = async (instructorData) => {
  const response = await axios.post(`${API_URL}/api/instructors`, instructorData);
  return response.data;
};

export const getInstructors = async () => {
  const response = await axios.get(`${API_URL}/api/instructors`);
  return response.data;
};

export const addClass = async (classData) => {
  const response = await axios.post(`${API_URL}/api/classes`, classData);
  return response.data;
};

export const getClasses = async () => {
  const response = await axios.get(`${API_URL}/api/classes`);
  return response.data;
};

export const addPackage = async (packageData) => {
    const response = await axios.post(`${API_URL}/api/packages`, packageData);
    return response.data;
};

export const getPackages = async () => {
    const response = await axios.get(`${API_URL}/api/packages`);
    return response.data;
};

export const addCustomer = async (data) => {
    const response = await axios.post(`${API_URL}/api/customers`, data);
    return response.data;
};

export const getCustomers = async () => {
    const response = await axios.get(`${API_URL}/api/customers`);
    return response.data;
};