import axios from 'axios';
import { getAuthToken } from './authService';

const API_URL = 'http://localhost:3000';

const getFacilityList = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${API_URL}/facilities`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const createFacility = async (facilityData) => {
  const token = getAuthToken();
  const response = await axios.post(`${API_URL}/facilities`, facilityData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const editFacility = async (facilityData) => {
    const token = getAuthToken();
    const response = await axios.put(`${API_URL}/facilities`, facilityData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const deleteFacility = async (facilityId) => {
  const token = getAuthToken();
  const response = await axios.delete(`${API_URL}/facilities/${facilityId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export { getFacilityList, createFacility, editFacility, deleteFacility };