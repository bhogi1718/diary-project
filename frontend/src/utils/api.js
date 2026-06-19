import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const signup = (email, password) =>
  api.post('/auth/signup', { email, password });

export const login = (email, password) =>
  api.post('/auth/login', { email, password });

// Diary endpoints
export const createEntry = (title, encryptedContent) =>
  api.post('/diary', { title, encryptedContent });

export const getEntries = () =>
  api.get('/diary');

export const getEntry = (id) =>
  api.get(`/diary/${id}`);

export const updateEntry = (id, title, encryptedContent) =>
  api.put(`/diary/${id}`, { title, encryptedContent });

export const deleteEntry = (id) =>
  api.delete(`/diary/${id}`);

export default api;
