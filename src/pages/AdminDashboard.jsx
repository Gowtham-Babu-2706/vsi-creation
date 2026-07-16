import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import EventForm from '../components/EventForm';
import ServiceForm from '../components/ServiceForm';
import GalleryForm from '../components/GalleryForm';
import { 
  Calendar, Users, Plus, Edit2, Trash2, ShieldCheck, Mail, Phone, MapPin, 
  Database, Search, Filter, IndianRupee, Eye, ClipboardList, Info, X,
  Wrench, Images, Sparkles
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('events'); // events, registrations, services, gallery
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [services, setServices] = useState([]);
  const [galleryEvents, setGalleryEvents] = useState([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedGalleryEvent, setSelectedGalleryEvent] = useState(null);
  
  // Advanced features state
  const [eventSearch, setEventSearch] = useState('');
  const [regSearch, setRegSearch] = useState('');
  const [serviceSearch, setServiceSearch] = useState('');
  const [gallerySearch, setGallerySearch] = useState('');
  const [regEventFilter, setRegEventFilter] = useState('all');
  const [selectedRegistration, setSelectedRegistration] = useState(null); // For detail drawer
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [eventsData, regsData, servicesData, galleryData] = await Promise.all([
        api.getEvents(),
        api.getBookings(),
        api.getServices(),
        api.getGallery()
      ]);
      setEvents(eventsData || []);
      setRegistrations(regsData || []);
      setServices(servicesData || []);
      setGalleryEvents(galleryData || []);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  // ─── Event Handlers ───
  const handleCreateSubmit = async (newEventData) => {
    try {
      await api.createEvent(newEventData);
      setIsCreating(false);
      loadData();
      alert('Event added successfully! It is now live on the catalog.');
    } catch (err) {
      alert('Failed to add event: ' + err.message);
    }
  };

  const handleEditSubmit = async (updatedEventData) => {
    try {
      await api.updateEvent(updatedEventData);
      setIsEditing(false);
      setSelectedEvent(null);
      loadData();
      alert('Event details updated successfully!');
    } catch (err) {
      alert('Failed to update event: ' + err.message);
    }
  };

  const handleDeleteEvent = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action is permanent.`)) {
      try {
        await api.deleteEvent(id);
        loadData();
        alert('Event deleted successfully.');
      } catch (err) {
        alert('Failed to delete event: ' + err.message);
      }
    }
  };

  // ─── Service Handlers ───
  const handleCreateService = async (serviceData) => {
    try {
      await api.createService(serviceData);
      setIsCreating(false);
      loadData();
      alert('Service capability added successfully!');
    } catch (err) {
      alert('Failed to add service capability: ' + err.message);
    }
  };

  const handleEditService = async (serviceData) => {
    try {
      await api.updateService(serviceData.id, serviceData);
      setIsEditing(false);
      setSelectedService(null);
      loadData();
      alert('Service capability updated successfully!');
    } catch (err) {
      alert('Failed to update service: ' + err.message);
    }
  };

  const handleDeleteService = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete service capability "${title}"?`)) {
      try {
        await api.deleteService(id);
        loadData();
        alert('Service capability deleted successfully.');
      } catch (err) {
        alert('Failed to delete service: ' + err.message);
      }
    }
  };

  // ─── Gallery Handlers ───
  const handleCreateGallery = async (galleryData) => {
    try {
      await api.createGalleryEvent(galleryData);
      setIsCreating(false);
      loadData();
      alert('Gallery event published successfully!');
    } catch (err) {
      alert('Failed to publish gallery event: ' + err.message);
    }
  };

  const handleEditGallery = async (galleryData) => {
    try {
      await api.updateGalleryEvent(galleryData.id, galleryData);
      setIsEditing(false);
      setSelectedGalleryEvent(null);
      loadData();
      alert('Gallery event updated successfully!');
    } catch (err) {
      alert('Failed to update gallery event: ' + err.message);
    }
  };

  const handleDeleteGallery = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete gallery event "${name}"?`)) {
      try {
        await api.deleteGalleryEvent(id);
        loadData();
        alert('Gallery event removed successfully.');
      } catch (err) {
        alert('Failed to delete gallery event: ' + err.message);
      }
    }
  };

  // ─── Booking Handlers ───
  const handleDeleteRegistration = async (regId) => {
    if (window.confirm('Are you sure you want to remove this attendee record?')) {
      try {
        await api.deleteBooking(regId);
        loadData();
        if (selectedRegistration?.id === regId) {
          setSelectedRegistration(null);
        }
      } catch (err) {
        alert('Failed to delete registration record: ' + err.message);
      }
    }
  };

  const formatTimestamp = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // ─── Analytics Computations ───
  const computeAnalytics = () => {
    const totalEvents = events.length;
    const totalBookings = registrations.reduce((sum, reg) => sum + Number(reg.participants || 1), 0);
    
    // Revenue calculation
    const totalRevenue = registrations.reduce((sum, reg) => {
      const matchingEvent = events.find(e => e.id === reg.eventId);
      const price = matchingEvent ? Number(matchingEvent.price || 0) : 0;
      return sum + (price * Number(reg.participants || 1));
    }, 0);

    const averageGroupSize = registrations.length > 0 
      ? (totalBookings / registrations.length).toFixed(1) 
      : '0.0';

    const totalServices = services.length;
    const totalGallery = galleryEvents.length;

    return { totalEvents, totalBookings, totalRevenue, averageGroupSize, totalServices, totalGallery };
  };

  const analytics = computeAnalytics();

  // ─── Search & Filter Handlers ───
  const filteredEvents = events.filter(event => {
    const query = eventSearch.toLowerCase();
    return (
      event.title?.toLowerCase().includes(query) ||
      event.category?.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query)
    );
  });

  const filteredRegistrations = registrations.filter(reg => {
    const query = regSearch.toLowerCase();
    const matchesSearch = (
      reg.fullName?.toLowerCase().includes(query) ||
      reg.email?.toLowerCase().includes(query) ||
      reg.phone?.toLowerCase().includes(query) ||
      reg.city?.toLowerCase().includes(query) ||
      reg.eventName?.toLowerCase().includes(query)
    );

    const matchesEvent = regEventFilter === 'all' || reg.eventId === regEventFilter;

    return matchesSearch && matchesEvent;
  });

  const filteredServices = services.filter(service => {
    const query = serviceSearch.toLowerCase();
    return (
      service.title?.toLowerCase().includes(query) ||
      service.tagline?.toLowerCase().includes(query) ||
      service.description?.toLowerCase().includes(query)
    );
  });

  const filteredGalleryEvents = galleryEvents.filter(event => {
    const query = gallerySearch.toLowerCase();
    return (
      event.name?.toLowerCase().includes(query) ||
      event.category?.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query) ||
      event.description?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-bg-main text-text-main min-h-screen pt-24 pb-16 relative font-body">
      {/* Visual spotlights */}
      <div className="absolute top-[10vh] left-[20%] w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[10vh] right-[10%] w-[350px] h-[350px] bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-bg-surface border border-border-color p-8 rounded-3xl gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="text-center md:text-left space-y-2">
            <span className="text-[10px] text-accent-gold font-bold uppercase tracking-[4px] glow-gold flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent-primary" /> VSI Operations Hub
            </span>
            <h1 className="text-3xl font-black text-white tracking-tight">Production Operations Dashboard</h1>
            <p className="text-xs text-text-muted">Manage scheduled event listings, dynamic capabilities, media archives, and attendee registrations.</p>
          </div>
          {/* Operational Status & Session Controls */}
          <div className="flex items-center gap-4">
            <div className="bg-bg-card border border-border-color px-6 py-4 rounded-2xl flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></div>
              <div className="text-left">
                <span className="text-[10px] text-text-muted uppercase font-bold block">Status</span>
                <span className="text-xs text-white font-bold block">Systems Online</span>
              </div>
            </div>
            <button
              onClick={() => { api.logout(); navigate('/login'); }}
              className="px-5 py-4 bg-red-950/40 border border-red-500/20 hover:border-red-500 text-red-500 hover:text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer select-none"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Analytics Hub (Visual Metric Cards) */}
        {!isCreating && !isEditing && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric Card 1: Revenue */}
            <div className="bg-bg-surface border border-border-color p-6 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Total Estimated Revenue</span>
                <h3 className="text-2xl font-black text-emerald-400">₹{analytics.totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-400/20 rounded-xl text-emerald-400">
                <IndianRupee className="w-6 h-6" />
              </div>
            </div>

            {/* Metric Card 2: Events */}
            <div className="bg-bg-surface border border-border-color p-6 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Live Catalog Events</span>
                <h3 className="text-2xl font-black text-accent-rose">{analytics.totalEvents}</h3>
              </div>
              <div className="p-3 bg-pink-500/10 border border-pink-400/20 rounded-xl text-accent-rose">
                <Calendar className="w-6 h-6" />
              </div>
            </div>

            {/* Metric Card 3: Services */}
            <div className="bg-bg-surface border border-border-color p-6 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Active Services</span>
                <h3 className="text-2xl font-black text-accent-gold">{analytics.totalServices}</h3>
              </div>
              <div className="p-3 bg-amber-500/10 border border-amber-400/20 rounded-xl text-accent-gold">
                <Wrench className="w-6 h-6" />
              </div>
            </div>

            {/* Metric Card 4: Gallery */}
            <div className="bg-bg-surface border border-border-color p-6 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden">
              <div className="space-y-1">
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Gallery Showcases</span>
                <h3 className="text-2xl font-black text-accent-primary">{analytics.totalGallery}</h3>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-400/20 rounded-xl text-accent-primary">
                <Images className="w-6 h-6" />
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Tabs & Action bar */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 border-b border-border-color/60 pb-4">
          <div className="flex bg-bg-surface border border-border-color p-1.5 rounded-2xl w-full lg:w-auto self-start flex-wrap gap-1">
            <button
              onClick={() => { setActiveTab('events'); setIsCreating(false); setIsEditing(false); }}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'events' 
                  ? 'bg-accent-gold text-bg-main shadow-md font-black' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" /> Manage Events
            </button>
            <button
              onClick={() => { setActiveTab('registrations'); setIsCreating(false); setIsEditing(false); }}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'registrations' 
                  ? 'bg-accent-gold text-bg-main shadow-md font-black' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" /> User Registrations
            </button>
            <button
              onClick={() => { setActiveTab('services'); setIsCreating(false); setIsEditing(false); }}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'services' 
                  ? 'bg-accent-gold text-bg-main shadow-md font-black' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              <Wrench className="w-4 h-4" /> Manage Services
            </button>
            <button
              onClick={() => { setActiveTab('gallery'); setIsCreating(false); setIsEditing(false); }}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'gallery' 
                  ? 'bg-accent-gold text-bg-main shadow-md font-black' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              <Images className="w-4 h-4" /> Manage Gallery
            </button>
          </div>

          {/* Tab Specific Actions & Advanced Filters */}
          {!isCreating && !isEditing && (
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              
              {/* Events search bar */}
              {activeTab === 'events' && (
                <>
                  <div className="relative flex-grow sm:w-64">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Search events..."
                      value={eventSearch}
                      onChange={(e) => setEventSearch(e.target.value)}
                      className="w-full bg-bg-surface border border-border-color pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-text-muted focus:border-accent-gold outline-none transition-all"
                    />
                  </div>
                  <button
                    onClick={() => setIsCreating(true)}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-accent-primary to-[#700016] text-white font-bold rounded-xl border border-accent-gold/20 hover:border-accent-gold shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/45 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider cursor-pointer select-none"
                  >
                    <Plus className="w-4 h-4 mr-1.5" /> Add Event
                  </button>
                </>
              )}

              {/* Registrations filters */}
              {activeTab === 'registrations' && (
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <div className="relative flex-grow sm:w-60">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Search attendee name, phone..."
                      value={regSearch}
                      onChange={(e) => setRegSearch(e.target.value)}
                      className="w-full bg-bg-surface border border-border-color pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-text-muted focus:border-accent-gold outline-none transition-all"
                    />
                  </div>
                  <div className="relative sm:w-52">
                    <Filter className="absolute left-3.5 top-3 w-4 h-4 text-text-muted pointer-events-none" />
                    <select
                      value={regEventFilter}
                      onChange={(e) => setRegEventFilter(e.target.value)}
                      className="w-full bg-bg-surface border border-border-color pl-10 pr-8 py-2.5 rounded-xl text-xs text-white focus:border-accent-gold outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="all">All Events</option>
                      {events.map(ev => (
                        <option key={ev.id} value={ev.id}>{ev.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Services search & actions */}
              {activeTab === 'services' && (
                <>
                  <div className="relative flex-grow sm:w-64">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      className="w-full bg-bg-surface border border-border-color pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-text-muted focus:border-accent-gold outline-none transition-all"
                    />
                  </div>
                  <button
                    onClick={() => setIsCreating(true)}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-accent-primary to-[#700016] text-white font-bold rounded-xl border border-accent-gold/20 hover:border-accent-gold shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/45 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider cursor-pointer select-none"
                  >
                    <Plus className="w-4 h-4 mr-1.5" /> Add Service
                  </button>
                </>
              )}

              {/* Gallery search & actions */}
              {activeTab === 'gallery' && (
                <>
                  <div className="relative flex-grow sm:w-64">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Search gallery..."
                      value={gallerySearch}
                      onChange={(e) => setGallerySearch(e.target.value)}
                      className="w-full bg-bg-surface border border-border-color pl-10 pr-4 py-2.5 rounded-xl text-xs text-white placeholder-text-muted focus:border-accent-gold outline-none transition-all"
                    />
                  </div>
                  <button
                    onClick={() => setIsCreating(true)}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-accent-primary to-[#700016] text-white font-bold rounded-xl border border-accent-gold/20 hover:border-accent-gold shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/45 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider cursor-pointer select-none"
                  >
                    <Plus className="w-4 h-4 mr-1.5" /> Add Showcase
                  </button>
                </>
              )}

            </div>
          )}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col justify-center items-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs text-text-muted font-semibold uppercase tracking-widest animate-pulse">Syncing Hub Registry...</span>
          </div>
        )}

        {/* Form Container (When Creating or Editing) */}
        {!loading && (isCreating || isEditing) && (
          <div className="bg-bg-surface border border-border-color p-8 rounded-[32px] shadow-2xl animate-fade-in space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-border-color pb-3">
              {activeTab === 'events' && (isCreating ? 'Configure New Staging Event' : `Modify Event Details: ${selectedEvent?.title}`)}
              {activeTab === 'services' && (isCreating ? 'Configure New Service Capability' : `Modify Service Details: ${selectedService?.title}`)}
              {activeTab === 'gallery' && (isCreating ? 'Publish New Gallery Showcase' : `Modify Gallery Showcase: ${selectedGalleryEvent?.name}`)}
            </h2>
            
            {activeTab === 'events' && (
              <EventForm 
                initialData={isEditing ? selectedEvent : null}
                onSubmit={isCreating ? handleCreateSubmit : handleEditSubmit}
                onCancel={() => { setIsCreating(false); setIsEditing(false); setSelectedEvent(null); }}
              />
            )}

            {activeTab === 'services' && (
              <ServiceForm 
                initialData={isEditing ? selectedService : null}
                onSubmit={isCreating ? handleCreateService : handleEditService}
                onCancel={() => { setIsCreating(false); setIsEditing(false); setSelectedService(null); }}
              />
            )}

            {activeTab === 'gallery' && (
              <GalleryForm 
                initialData={isEditing ? selectedGalleryEvent : null}
                onSubmit={isCreating ? handleCreateGallery : handleEditGallery}
                onCancel={() => { setIsCreating(false); setIsEditing(false); setSelectedGalleryEvent(null); }}
              />
            )}
          </div>
        )}

        {/* Catalog List Tab */}
        {!loading && activeTab === 'events' && !isCreating && !isEditing && (
          <div className="bg-bg-surface border border-border-color rounded-3xl overflow-hidden shadow-xl animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-bg-card/40 border-b border-border-color text-xs uppercase tracking-wider font-bold text-text-muted select-none">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Execution Date</th>
                    <th className="px-6 py-4">Staging Location</th>
                    <th className="px-6 py-4">Ticket Cost</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color/40 text-xs">
                  {filteredEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-bg-card/25 transition-colors">
                      <td className="px-6 py-5 font-bold text-white flex items-center gap-3">
                        <img src={event.banner || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=120'} alt="Thumbnail" className="w-12 h-8 object-cover rounded-lg border border-border-color/80" />
                        {event.title}
                      </td>
                      <td className="px-6 py-5">
                        <span className="bg-bg-card text-accent-gold border border-border-color px-2.5 py-1 rounded-lg uppercase tracking-wider font-semibold text-[10px]">
                          {event.category}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-semibold text-text-main">{event.date}</td>
                      <td className="px-6 py-5 text-text-muted">{event.location}</td>
                      <td className="px-6 py-5 font-bold text-emerald-400">
                        {event.price > 0 ? `₹${event.price.toFixed(2)}` : 'FREE'}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => { setSelectedEvent(event); setIsEditing(true); }}
                            className="p-2 bg-bg-card border border-border-color hover:border-accent-gold text-white rounded-lg transition-all cursor-pointer"
                            title="Edit Event"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id, event.title)}
                            className="p-2 bg-bg-card border border-border-color hover:bg-accent-primary hover:border-accent-primary text-white rounded-lg transition-all cursor-pointer"
                            title="Delete Event"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredEvents.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-text-muted font-bold select-none">
                        No events found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* User Registrations Tab */}
        {!loading && activeTab === 'registrations' && (
          <div className="bg-bg-surface border border-border-color rounded-3xl overflow-hidden shadow-xl animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-bg-card/40 border-b border-border-color text-xs uppercase tracking-wider font-bold text-text-muted select-none">
                  <tr>
                    <th className="px-6 py-4">Attendee</th>
                    <th className="px-6 py-4">Target Event</th>
                    <th className="px-6 py-4">Contact Info</th>
                    <th className="px-6 py-4">Staging Details</th>
                    <th className="px-6 py-4 text-center">Seats</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color/40 text-xs">
                  {filteredRegistrations.map((reg) => {
                    return (
                      <tr key={reg.id} className="hover:bg-bg-card/25 transition-colors">
                        <td className="px-6 py-5">
                          <div className="font-bold text-white">{reg.fullName}</div>
                          <div className="text-[10px] text-text-muted mt-0.5">Age: {reg.age} years</div>
                        </td>
                        <td className="px-6 py-5 font-bold text-accent-gold uppercase tracking-wide truncate max-w-xs">
                          {reg.eventName}
                        </td>
                        <td className="px-6 py-5 space-y-1">
                          <div className="flex items-center text-text-main">
                            <Mail className="w-3.5 h-3.5 text-accent-primary mr-1.5 shrink-0" />
                            {reg.email}
                          </div>
                          <div className="flex items-center text-text-muted">
                            <Phone className="w-3.5 h-3.5 text-accent-gold mr-1.5 shrink-0" />
                            {reg.phone}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center text-text-main">
                            <MapPin className="w-3.5 h-3.5 text-accent-gold mr-1.5 shrink-0" />
                            {reg.city}
                          </div>
                          <div className="text-[10px] text-text-muted mt-0.5">Logged: {formatTimestamp(reg.submittedAt)}</div>
                        </td>
                        <td className="px-6 py-5 font-bold text-white text-center">
                          <span className="bg-bg-card border border-border-color px-2.5 py-1 rounded-lg">
                            {reg.participants}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => setSelectedRegistration(reg)}
                              className="p-2 bg-bg-card border border-border-color hover:border-accent-gold text-white rounded-lg transition-all cursor-pointer"
                              title="View Registration Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteRegistration(reg.id)}
                              className="p-2 bg-bg-card border border-border-color hover:bg-accent-primary hover:border-accent-primary text-white rounded-lg transition-all cursor-pointer"
                              title="Remove Registration"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredRegistrations.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-text-muted font-bold select-none">
                        No attendee records found matching criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Manage Services Tab */}
        {!loading && activeTab === 'services' && !isCreating && !isEditing && (
          <div className="bg-bg-surface border border-border-color rounded-3xl overflow-hidden shadow-xl animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-bg-card/40 border-b border-border-color text-xs uppercase tracking-wider font-bold text-text-muted select-none">
                  <tr>
                    <th className="px-6 py-4">Service Title</th>
                    <th className="px-6 py-4">Index</th>
                    <th className="px-6 py-4">Tagline</th>
                    <th className="px-6 py-4">Icon Type</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color/40 text-xs">
                  {filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-bg-card/25 transition-colors">
                      <td className="px-6 py-5 font-bold text-white flex items-center gap-3">
                        <img src={service.banner || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=120'} alt="Thumbnail" className="w-12 h-8 object-cover rounded-lg border border-border-color/80" />
                        {service.title}
                      </td>
                      <td className="px-6 py-5 font-semibold text-text-main">{service.num || 'N/A'}</td>
                      <td className="px-6 py-5 text-text-muted truncate max-w-xs">{service.tagline}</td>
                      <td className="px-6 py-5">
                        <span className="bg-bg-card text-accent-gold border border-border-color px-2.5 py-1 rounded-lg uppercase tracking-wider font-semibold text-[10px]">
                          {service.icon}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => { setSelectedService(service); setIsEditing(true); }}
                            className="p-2 bg-bg-card border border-border-color hover:border-accent-gold text-white rounded-lg transition-all cursor-pointer"
                            title="Edit Service"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id, service.title)}
                            className="p-2 bg-bg-card border border-border-color hover:bg-accent-primary hover:border-accent-primary text-white rounded-lg transition-all cursor-pointer"
                            title="Delete Service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredServices.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-text-muted font-bold select-none">
                        No services found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Manage Gallery Tab */}
        {!loading && activeTab === 'gallery' && !isCreating && !isEditing && (
          <div className="bg-bg-surface border border-border-color rounded-3xl overflow-hidden shadow-xl animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-bg-card/40 border-b border-border-color text-xs uppercase tracking-wider font-bold text-text-muted select-none">
                  <tr>
                    <th className="px-6 py-4">Event Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Staging Location</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-center">Media Assets</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color/40 text-xs">
                  {filteredGalleryEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-bg-card/25 transition-colors">
                      <td className="px-6 py-5 font-bold text-white flex items-center gap-3">
                        <img src={event.banner || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=120'} alt="Thumbnail" className="w-12 h-8 object-cover rounded-lg border border-border-color/80" />
                        {event.name}
                      </td>
                      <td className="px-6 py-5">
                        <span className="bg-bg-card text-accent-gold border border-border-color px-2.5 py-1 rounded-lg uppercase tracking-wider font-semibold text-[10px]">
                          {event.categoryLabel || event.category}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-text-muted">{event.location}</td>
                      <td className="px-6 py-5 font-semibold text-text-main">{event.date}</td>
                      <td className="px-6 py-5 text-center text-text-muted">
                        Photos: {event.photos?.length || 0} | BTS: {event.btsPhotos?.length || 0}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => { setSelectedGalleryEvent(event); setIsEditing(true); }}
                            className="p-2 bg-bg-card border border-border-color hover:border-accent-gold text-white rounded-lg transition-all cursor-pointer"
                            title="Edit Gallery Event"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteGallery(event.id, event.name)}
                            className="p-2 bg-bg-card border border-border-color hover:bg-accent-primary hover:border-accent-primary text-white rounded-lg transition-all cursor-pointer"
                            title="Delete Gallery Event"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredGalleryEvents.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-text-muted font-bold select-none">
                        No gallery events found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Registration Details Drawer/Overlay (Versatile Feature) */}
      {selectedRegistration && (
        <div className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-bg-surface border border-border-color rounded-3xl w-full max-w-lg overflow-hidden relative shadow-2xl animate-fade-in">
            {/* Glow corners */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="border-b border-border-color/60 px-6 py-5 flex justify-between items-center relative z-10">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-accent-gold" /> Registration Profile
              </h2>
              <button 
                onClick={() => setSelectedRegistration(null)}
                className="p-1.5 hover:bg-bg-card border border-border-color/60 text-text-muted hover:text-white rounded-xl transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 relative z-10 text-xs">
              <div className="space-y-4">
                <div className="bg-bg-card border border-border-color p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] text-text-muted uppercase font-bold block">Event Selection</span>
                  <p className="text-sm font-black text-accent-gold uppercase tracking-wide">{selectedRegistration.eventName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-bg-card/50 border border-border-color p-4 rounded-xl space-y-1">
                    <span className="text-[10px] text-text-muted uppercase font-bold block">Full Name</span>
                    <p className="text-sm font-bold text-white">{selectedRegistration.fullName}</p>
                  </div>
                  <div className="bg-bg-card/50 border border-border-color p-4 rounded-xl space-y-1">
                    <span className="text-[10px] text-text-muted uppercase font-bold block">Age / Location</span>
                    <p className="text-sm font-bold text-white">{selectedRegistration.age} yrs · {selectedRegistration.city}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-bg-card/50 border border-border-color p-4 rounded-xl space-y-1">
                    <span className="text-[10px] text-text-muted uppercase font-bold block">Email</span>
                    <p className="text-white font-medium">{selectedRegistration.email}</p>
                  </div>
                  <div className="bg-bg-card/50 border border-border-color p-4 rounded-xl space-y-1">
                    <span className="text-[10px] text-text-muted uppercase font-bold block">Mobile Phone</span>
                    <p className="text-white font-medium">{selectedRegistration.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-bg-card/50 border border-border-color p-4 rounded-xl space-y-1">
                    <span className="text-[10px] text-text-muted uppercase font-bold block">Total Attendees</span>
                    <p className="text-sm font-black text-white">{selectedRegistration.participants} seats</p>
                  </div>
                  <div className="bg-bg-card/50 border border-border-color p-4 rounded-xl space-y-1">
                    <span className="text-[10px] text-text-muted uppercase font-bold block">Transaction Reference</span>
                    <p className="font-mono text-white select-all break-all">{selectedRegistration.transactionId || 'N/A'}</p>
                  </div>
                </div>

                {/* Custom coordinator notes */}
                <div className="bg-bg-card/50 border border-border-color p-4 rounded-2xl space-y-1">
                  <span className="text-[10px] text-text-muted uppercase font-bold block">Guest Coordinator Notes</span>
                  <p className="text-text-main italic whitespace-pre-wrap leading-relaxed">
                    {selectedRegistration.notes ? `"${selectedRegistration.notes}"` : 'No special notes or instructions provided by guest.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border-color/60 px-6 py-4 flex justify-end gap-2 bg-bg-card/20">
              <button
                onClick={() => handleDeleteRegistration(selectedRegistration.id)}
                className="px-5 py-2.5 bg-red-950/40 border border-red-500/20 hover:border-red-500 text-red-500 hover:text-white rounded-xl font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer"
              >
                Delete Profile
              </button>
              <button 
                onClick={() => setSelectedRegistration(null)}
                className="px-5 py-2.5 bg-accent-primary hover:bg-accent-secondary text-white font-bold rounded-xl text-[10px] uppercase tracking-wider transition-all cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
