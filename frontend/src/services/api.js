import axios from 'axios';

const BASE_URL = 'https://685013d7e7c42cfd17974a33.mockapi.io';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

export const getTaxes = async () => {
  try {
    const response = await api.get('/taxes');
    return response.data;
  } catch (error) {
    console.error('Error fetching taxes:', error);
    
    if(error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      throw new Error('Unable to connect to the server. Please check your internet connection or verify that the API endpoint is accessible.');
    }
    
    if(error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Request timed out. The server is taking too long to respond. Please try again.');
    }
    
    if(error.response) {
      throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
    }
    
    if(error.request) {
      throw new Error('No response from server. Please check if the API endpoint is correct and accessible.');
    }
    
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

