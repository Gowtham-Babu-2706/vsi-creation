const API_BASE_URL = 'https://api.vsicreations.com/api';

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
  },

  // Services
  getServices: async () => {
    const res = await fetch(`${API_BASE_URL}/services`, {
      headers: getHeaders(false)
    });
    if (!res.ok) throw new Error('Failed to retrieve services catalog.');
    return res.json();
  },

  getServiceById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/services/${id}`, {
      headers: getHeaders(false)
    });
    if (!res.ok) throw new Error('Service details not found.');
    return res.json();
  },

  createService: async (serviceData) => {
    const res = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(serviceData)
    });
    if (!res.ok) throw new Error('Failed to configure new service.');
    return res.json();
  },

  updateService: async (id, serviceData) => {
    const res = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(serviceData)
    });
    if (!res.ok) throw new Error('Failed to modify service details.');
    return res.json();
  },

  deleteService: async (id) => {
    const res = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    if (!res.ok) throw new Error('Failed to delete service.');
    return true;
  },

  // Gallery
  getGallery: async () => {
    const res = await fetch(`${API_BASE_URL}/gallery`, {
      headers: getHeaders(false)
    });
    if (!res.ok) throw new Error('Failed to retrieve gallery events.');
    return res.json();
  },

  getGalleryById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      headers: getHeaders(false)
    });
    if (!res.ok) throw new Error('Gallery event details not found.');
    return res.json();
  },

  createGalleryEvent: async (galleryData) => {
    const res = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(galleryData)
    });
    if (!res.ok) throw new Error('Failed to publish new gallery event.');
    return res.json();
  },

  updateGalleryEvent: async (id, galleryData) => {
    const res = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(galleryData)
    });
    if (!res.ok) throw new Error('Failed to modify gallery event.');
    return res.json();
  },

  deleteGalleryEvent: async (id) => {
    const res = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    if (!res.ok) throw new Error('Failed to remove gallery event.');
    return true;
  },

  // Testimonials (Public)
  getTestimonials: async () => {
    const res = await fetch(`${API_BASE_URL}/testimonials`, {
      headers: getHeaders(false)
    });
    if (!res.ok) throw new Error('Failed to retrieve testimonials.');
    return res.json();
  },

  submitTestimonial: async (data) => {
    const res = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to submit testimonial.');
    return res.json();
  }
};
