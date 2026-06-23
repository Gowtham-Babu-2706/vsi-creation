const API_BASE_URL = 'https://vsibackend.onrender.com/api';

const getHeaders = (secured = false) => {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (secured) {
    const token = localStorage.getItem('vsi_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const api = {
  // Authentication
  login: async (username, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Login failed. Please check your credentials.');
    }
    const data = await res.json();
    localStorage.setItem('vsi_token', data.token);
    localStorage.setItem('vsi_user', data.username);
    return data;
  },

  logout: () => {
    localStorage.removeItem('vsi_token');
    localStorage.removeItem('vsi_user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('vsi_token');
  },

  getUsername: () => {
    return localStorage.getItem('vsi_user') || '';
  },

  // Events (Public and Secured)
  getEvents: async () => {
    const res = await fetch(`${API_BASE_URL}/events`, {
      headers: getHeaders(false)
    });
    if (!res.ok) throw new Error('Failed to retrieve events catalog.');
    return res.json();
  },

  getEventById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      headers: getHeaders(false)
    });
    if (!res.ok) throw new Error('Event blueprint details not found.');
    return res.json();
  },

  createEvent: async (eventData) => {
    const res = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(eventData)
    });
    if (!res.ok) throw new Error('Failed to configure new event.');
    return res.json();
  },

  updateEvent: async (eventData) => {
    const res = await fetch(`${API_BASE_URL}/events/${eventData.id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(eventData)
    });
    if (!res.ok) throw new Error('Failed to modify event details.');
    return res.json();
  },

  deleteEvent: async (id) => {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    if (!res.ok) throw new Error('Failed to delete event listing.');
    return true;
  },

  // Bookings (Public & Secured)
  createBooking: async (bookingData) => {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(bookingData)
    });
    if (!res.ok) throw new Error('Failed to confirm registration pass.');
    return res.json();
  },

  createPaymentIntent: async (amount, currency = 'inr') => {
    const res = await fetch(`${API_BASE_URL}/payments/create-payment-intent`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ amount, currency })
    });
    if (!res.ok) throw new Error('Failed to initialize payment session.');
    return res.json();
  },

  getBookings: async () => {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      headers: getHeaders(true)
    });
    if (!res.ok) throw new Error('Failed to retrieve active guest list.');
    return res.json();
  },

  deleteBooking: async (id) => {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    if (!res.ok) throw new Error('Failed to remove registration record.');
    return true;
  }
};
