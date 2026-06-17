import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import EventForm from '../components/EventForm';
import { Calendar, Users, Plus, Edit2, Trash2, ShieldCheck, Mail, Phone, MapPin, Database } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('events'); // events, registrations
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [eventsData, regsData] = await Promise.all([
        api.getEvents(),
        api.getBookings()
      ]);
      setEvents(eventsData);
      setRegistrations(regsData);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    }
  };

  const handleCreateSubmit = async (newEventData) => {
    try {
      await api.createEvent(newEventData);
      setIsCreating(false);
      loadData();
      alert('Event added successfully! It is now live on the Events catalog page.');
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

  const handleDeleteRegistration = async (regId) => {
    if (window.confirm('Are you sure you want to remove this attendee record?')) {
      try {
        await api.deleteBooking(regId);
        loadData();
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

  return (
    <div className="bg-bg-main text-text-main min-h-screen pt-24 pb-16 relative">
      {/* Visual spotlights */}
      <div className="absolute top-[10vh] left-[20%] w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[10vh] right-[10%] w-[350px] h-[350px] bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-bg-surface border border-border-color p-8 rounded-3xl gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/10 rounded-full blur-2xl"></div>
          <div className="text-center md:text-left space-y-2">
            <span className="text-[10px] text-accent-gold font-bold uppercase tracking-[4px] glow-gold flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent-primary" /> VSI Control Center
            </span>
            <h1 className="text-3xl font-black text-white">Production Operations Hub</h1>
            <p className="text-xs text-text-muted">Manage scheduled event listings, timelines, and keep track of guest registrations.</p>
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
              onClick={() => { api.logout(); window.location.href = '/'; }}
              className="px-5 py-4 bg-red-950/40 border border-red-500/20 hover:border-red-500 text-red-500 hover:text-white rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Dashboard Tabs & Action bar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-border-color/60 pb-4">
          <div className="flex bg-bg-surface border border-border-color p-1.5 rounded-2xl w-full md:w-auto self-start">
            <button
              onClick={() => { setActiveTab('events'); setIsCreating(false); setIsEditing(false); }}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer w-1/2 md:w-auto ${
                activeTab === 'events' 
                  ? 'bg-accent-gold text-bg-main shadow-md font-black' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" /> Manage Events
            </button>
            <button
              onClick={() => { setActiveTab('registrations'); setIsCreating(false); setIsEditing(false); }}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer w-1/2 md:w-auto ${
                activeTab === 'registrations' 
                  ? 'bg-accent-gold text-bg-main shadow-md font-black' 
                  : 'text-text-muted hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" /> User Registrations
            </button>
          </div>

          {activeTab === 'events' && !isCreating && !isEditing && (
            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-accent-primary to-[#700016] text-white font-bold rounded-xl border border-accent-gold/20 hover:border-accent-gold shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/45 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider cursor-pointer w-full md:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" /> Add New Event
            </button>
          )}
        </div>

        {/* Form Container (When Creating or Editing) */}
        {(isCreating || isEditing) && (
          <div className="bg-bg-surface border border-border-color p-8 rounded-[32px] shadow-2xl animate-fade-in space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-border-color pb-3">
              {isCreating ? 'Configure New Staging Event' : `Modify Event Details: ${selectedEvent?.title}`}
            </h2>
            <EventForm 
              initialData={isEditing ? selectedEvent : null}
              onSubmit={isCreating ? handleCreateSubmit : handleEditSubmit}
              onCancel={() => { setIsCreating(false); setIsEditing(false); setSelectedEvent(null); }}
            />
          </div>
        )}

        {/* Catalog List tab */}
        {activeTab === 'events' && !isCreating && !isEditing && (
          <div className="bg-bg-surface border border-border-color rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-bg-card/40 border-b border-border-color text-xs uppercase tracking-wider font-bold text-text-muted select-none">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Execution Date</th>
                    <th className="px-6 py-4">Staging Location</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color/40 text-xs">
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-bg-card/25 transition-colors">
                      <td className="px-6 py-5 font-bold text-white flex items-center gap-3">
                        <img src={event.banner} alt="Thumbnail" className="w-12 h-8 object-cover rounded-lg border border-border-color/80" />
                        {event.title}
                      </td>
                      <td className="px-6 py-5">
                        <span className="bg-bg-card text-accent-gold border border-border-color px-2.5 py-1 rounded-lg uppercase tracking-wider font-semibold text-[10px]">
                          {event.category}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-semibold text-text-main">{event.date}</td>
                      <td className="px-6 py-5 text-text-muted">{event.location}</td>
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
                  {events.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-text-muted font-bold select-none">
                        No events active. Click "Add New Event" to seed the system database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* User Registrations tab */}
        {activeTab === 'registrations' && (
          <div className="bg-bg-surface border border-border-color rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto font-sans">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-bg-card/40 border-b border-border-color text-xs uppercase tracking-wider font-bold text-text-muted select-none">
                  <tr>
                    <th className="px-6 py-4">Attendee</th>
                    <th className="px-6 py-4">Target Event</th>
                    <th className="px-6 py-4">Contact Info</th>
                    <th className="px-6 py-4">Origin Details</th>
                    <th className="px-6 py-4">People</th>
                    <th className="px-6 py-4 text-center font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color/40 text-xs">
                  {registrations.map((reg) => (
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
                        <button
                          onClick={() => handleDeleteRegistration(reg.id)}
                          className="p-2 bg-bg-card border border-border-color hover:bg-accent-primary hover:border-accent-primary text-white rounded-lg transition-all cursor-pointer"
                          title="Remove Registration"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {registrations.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-text-muted font-bold select-none">
                        No registrations logged in local storage.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
