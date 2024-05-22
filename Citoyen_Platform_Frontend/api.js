import axios from 'axios';

const API_URL = 'http://192.168.11.102:3900';

export const register = (userData) => {
  return axios.post(`${API_URL}/auth/signup`, userData);
};

export const login = (userData) => {
  return axios.post(`${API_URL}/auth/login`, userData);
};

export const addLocation = (locationData) => {
  return axios.post(`${API_URL}/reclamation`, locationData);
};

export const getLocations = () => {
  return axios.get(`${API_URL}/reclamation`);
};

export const logout = () => {
  return axios.post(`${API_URL}/auth/logout`);
};
