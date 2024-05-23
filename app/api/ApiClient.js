import axios from 'axios';

const baseURL = process.env.BASE_URL || 'http://localhost';


console.log('baseURL:', baseURL);

export const apiClient = axios.create({
  baseURL: `${baseURL}:4869`
});
