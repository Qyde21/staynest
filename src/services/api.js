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
export const stkPush = async (data, token) => {
  const res = await fetch(`${API_URL}/api/mpesa/stk-push`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const getReviews = async (propertyId) => {
  const res = await fetch(`${API_URL}/api/reviews/${propertyId}`);
  return res.json();
};

export const createReview = async (data, token) => {
  const res = await fetch(`${API_URL}/api/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const getAdminStats = async (token) => {
  const res = await fetch(`${API_URL}/api/admin/stats`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};

export const getAdminUsers = async (token) => {
  const res = await fetch(`${API_URL}/api/admin/users`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};

export const getAdminBookings = async (token) => {
  const res = await fetch(`${API_URL}/api/admin/bookings`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};

export const getAdminProperties = async (token) => {
  const res = await fetch(`${API_URL}/api/admin/properties`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};

export const getAdminReviews = async (token) => {
  const res = await fetch(`${API_URL}/api/admin/reviews`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};

export const toggleProperty = async (id, token) => {
  const res = await fetch(`${API_URL}/api/admin/properties/${id}/toggle`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};

export const cancelAdminBooking = async (id, token) => {
  const res = await fetch(`${API_URL}/api/admin/bookings/${id}/cancel`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};

export const deleteAdminReview = async (id, token) => {
  const res = await fetch(`${API_URL}/api/admin/reviews/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};

export const deleteAdminUser = async (id, token) => {
  const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};
export const addAdminProperty = async (data, token) => {
  const res = await fetch(`${API_URL}/api/admin/properties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const getPropertyAvailability = async (propertyId) => {
  const res = await fetch(`${API_URL}/api/properties/${propertyId}/availability`);
  return res.json();
};
export const getHostStats = async (token) => {
  const res = await fetch(`${API_URL}/api/host/stats`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};

export const getHostProperties = async (token) => {
  const res = await fetch(`${API_URL}/api/host/properties`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};

export const getHostBookings = async (token) => {
  const res = await fetch(`${API_URL}/api/host/bookings`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};

export const addHostProperty = async (data, token) => {
  const res = await fetch(`${API_URL}/api/host/properties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const toggleHostProperty = async (id, token) => {
  const res = await fetch(`${API_URL}/api/host/properties/${id}/toggle`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return res.json();
};
export const uploadImage = async (file, token) => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  return res.json();
};