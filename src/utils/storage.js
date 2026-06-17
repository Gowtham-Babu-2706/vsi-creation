const DEFAULT_EVENTS = [
  {
    id: 'neon-beats',
    title: 'Neon Beats Arena Music Festival',
    date: '2026-07-24',
    location: 'Central Arena Metropolis',
    category: 'concert',
    description: 'Grand central arena structural sound coordination and live multi-axis lasers.',
    fullDescription: 'Experience the absolute pinnacle of high-intensity electronic staging. VSI Creations coordinates the full physical engineering setup, combining high-load aluminum structures, state-of-the-art linear acoustic systems, and high-frequency laser diode matrices synchronised dynamically to audio timelines. Perfect for audiophiles and luxury concert attendees alike.',
    banner: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000',
    videoThumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Demo mp4 video
    venueDetails: 'Central Arena Gate 4, Metropolis. Multi-level parking and VIP dropoff gates available.',
    participationInfo: 'Open to ages 18+. VIP pass includes access to stage-front lounges and acoustic control booths.',
    schedule: [
      { time: '14:00', title: 'Line-Array Calibration & Acoustic Mapping' },
      { time: '17:00', title: 'Laser Alignment & Pyro Check' },
      { time: '19:00', title: 'Gates Open & Opening VJ Sets' },
      { time: '21:00', title: 'Main Arena Electronic Symphony' }
    ]
  },
  {
    id: 'apex-gala',
    title: 'The Apex Annual Corporate Gala Awards',
    date: '2026-09-12',
    location: 'Grand Ballroom Plaza Hotel',
    category: 'gala',
    description: 'Luxury red-carpet configurations and live multi-camera broadcast capture.',
    fullDescription: 'A premium, high-luxury corporate gathering celebrating outstanding achievements. VSI Creations manages the entire visual blueprint of the ballroom: custom step-and-repeat layouts with photography matte diffusers, live multi-camera broadcast cranes, zero-delay wireless HDMI rigs, and detailed projection mapping highlighting award announcements.',
    banner: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1000',
    videoThumbnail: 'https://images.unsplash.com/photo-1489641493513-ba4ee84ccea9?w=600',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4', // Demo mp4 video
    venueDetails: 'Grand Ballroom, Plaza Hotel, Suite 100. Valet parking provided at the front portico.',
    participationInfo: 'Black tie dress code mandatory. Pre-registration code or corporate invitation token required.',
    schedule: [
      { time: '15:00', title: 'Broadcasting Crane Setup & Lighting Checks' },
      { time: '18:00', title: 'VIP Reception & Red Carpet Live Stream' },
      { time: '19:30', title: 'Keynote & Projection Mapping Intro' },
      { time: '21:30', title: 'Awards Ceremony & Broadcast Archive Save' }
    ]
  },
  {
    id: 'velvet-symphony',
    title: 'Velvet Symphony Milestone Celebration',
    date: '2026-11-05',
    location: 'Symphony Gardens Chateau',
    category: 'private',
    description: 'Immersive custom lighting displays, projection mapping installations, and fine dining staging.',
    fullDescription: 'A bespoke celebration for private milestones. We turn the historic facade of the Chateau into a custom projection canvas, accompanying it with suspended floral designs loaded with warm-ambient lighting fixtures, high-end cinema capture, and detailed multi-axis lasers.',
    banner: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000',
    videoThumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    venueDetails: 'Symphony Gardens Chateau, West Wing. Private shuttle transfers leave from Central Station every 30 mins.',
    participationInfo: 'By invite only. Registration requires entering valid invitation IDs in the notes field.',
    schedule: [
      { time: '16:00', title: 'Symphony Gardens Power-On & Atmospheric Fog Setup' },
      { time: '18:00', title: 'Chateau Exterior Projection Mapping Preview' },
      { time: '19:00', title: 'Orchestral Welcome & Banquet Seating' },
      { time: '21:30', title: 'Light Symphony & Firework Finale' }
    ]
  }
];

export const initializeStorage = () => {
  if (!localStorage.getItem('vsi_events')) {
    localStorage.setItem('vsi_events', JSON.stringify(DEFAULT_EVENTS));
  }
  if (!localStorage.getItem('vsi_registrations')) {
    localStorage.setItem('vsi_registrations', JSON.stringify([]));
  }
};

export const getEvents = () => {
  initializeStorage();
  try {
    return JSON.parse(localStorage.getItem('vsi_events'));
  } catch (e) {
    console.error('Error parsing events from storage', e);
    return DEFAULT_EVENTS;
  }
};

export const getEventById = (id) => {
  const events = getEvents();
  return events.find(event => event.id === id);
};

export const saveEvents = (events) => {
  localStorage.setItem('vsi_events', JSON.stringify(events));
};

export const addEvent = (event) => {
  const events = getEvents();
  const newEvent = {
    ...event,
    id: event.id || String(Date.now())
  };
  events.push(newEvent);
  saveEvents(events);
  return newEvent;
};

export const updateEvent = (updatedEvent) => {
  let events = getEvents();
  events = events.map(e => e.id === updatedEvent.id ? updatedEvent : e);
  saveEvents(events);
  return updatedEvent;
};

export const deleteEvent = (id) => {
  let events = getEvents();
  events = events.filter(e => e.id !== id);
  saveEvents(events);
  return true;
};

export const getRegistrations = () => {
  initializeStorage();
  try {
    return JSON.parse(localStorage.getItem('vsi_registrations'));
  } catch (e) {
    console.error('Error parsing registrations', e);
    return [];
  }
};

export const addRegistration = (registration) => {
  const registrations = getRegistrations();
  const newReg = {
    ...registration,
    id: String(Date.now()),
    submittedAt: new Date().toISOString()
  };
  registrations.push(newReg);
  localStorage.setItem('vsi_registrations', JSON.stringify(registrations));
  return newReg;
};
