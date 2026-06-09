const API_URL = process.env.REACT_APP_API_URL || 'https://staynest-api-green.vercel.app';

export const getProperties = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/api/properties${query ? `?${query}` : ''}`);
  return res.json();
};

export const getPropertyById = async (id) => {
  const res = await fetch(`${API_URL}/api/properties/${id}`);
  return res.json();
};

export const register = async (data) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const createBooking = async (data, token) => {
  const res = await fetch(`${API_URL}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getMyBookings = async (token) => {
  const res = await fetch(`${API_URL}/api/bookings/my`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};