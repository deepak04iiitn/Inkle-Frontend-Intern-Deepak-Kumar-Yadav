import axios from 'axios';

const BASE_URL = 'https://685013d7e7c42cfd17974a33.mockapi.io';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTaxes = async () => {
  try {
    const response = await api.get('/taxes');
    return response.data;
  } catch (error) {
    console.error('Error fetching taxes:', error);
    throw error;
  }
};

export const getTaxById = async (id) => {
  try {
    const response = await api.get(`/taxes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tax:', error);
    throw error;
  }
};

export const updateTax = async (id, data) => {
  try {
    const response = await api.put(`/taxes/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating tax:', error);
    throw error;
  }
};

export const getCountries = async () => {
  try {
    const response = await api.get('/countries');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export default api;

