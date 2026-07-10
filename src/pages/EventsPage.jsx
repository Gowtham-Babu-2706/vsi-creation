import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Tag, SlidersHorizontal, Sparkles, Grid, List, ArrowRight, MapPin } from 'lucide-react';
import { api } from '../utils/api';
import EventCard from '../components/EventCard';
import { useGSAP, SplitText } from '../hooks/useGSAP';
import gsap from 'gsap';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export default function EventsPage() {
  useDocumentMetadata('Upcoming Events & Experiences', 'Stay updated on spectacular live experiences, concerts, summits, and festivals organized by VSI Creations. Reserve your spot today.');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all'); // all, upcoming, past
  const [viewMode, setViewMode] = useState('grid'); // grid, list

  useEffect(() => {
    // Load events from Backend API
    const loadEvents = async () => {
      try {
        const data = await api.getEvents();
        setEvents(data);
      } catch (err) {
        console.error('Failed to load events', err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategoryFilter('all');
    setDateFilter('all');
  };

  // Filter events based on search query, category, and date comparison
  const filteredEvents = events.filter(event => {
    // Search match
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || 
                          event.location.toLowerCase().includes(search.toLowerCase()) ||
                          event.description.toLowerCase().includes(search.toLowerCase());
    
    // Category match
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;

    // Date match
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let matchesDate = true;
    if (dateFilter === 'upcoming') {
      matchesDate = eventDate >= today;
    } else if (dateFilter === 'past') {
      matchesDate = eventDate < today;
    }

    return matchesSearch && matchesCategory && matchesDate;
  });

  useGSAP(() => {
    // Header entrance sequence
    const tl = gsap.timeline();
    tl.fromTo('.events-eyebrow', { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .fromTo('.events-title .char-span',
        { opacity: 0, y: 35, rotateX: -40 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.75, stagger: 0.02, ease: 'power4.out' },
        '-=0.4'
      )
      .fromTo('.events-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5')
      .fromTo('.events-filter-box', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3');
  }, []);

  // Animate cards whenever filteredEvents list changes
  useEffect(() => {
    if (loading) return;
    gsap.fromTo('.event-card-anim',
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out' }
    );
  }, [loading, filteredEvents.length, viewMode]);

  return (
    <div className="bg-bg-main text-text-main min-h-screen pt-24 pb-16 relative">
      {/* Premium Spotlights */}
      <div className="absolute top-[5vh] left-[5%] w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute top-[40vh] right-[10%] w-[450px] h-[450px] bg-accent-gold/5 rounded-full blur-[130px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center md:text-left max-w-2xl space-y-3">
          <span className="events-eyebrow text-xs text-accent-gold font-bold uppercase tracking-[4px] glow-gold flex items-center justify-center md:justify-start gap-1.5">
            <Sparkles className="w-4 h-4 text-accent-gold" /> Staging the Spectacle
          </span>
          <h1 className="events-title text-4xl md:text-5xl font-extrabold text-black tracking-tight font-display">
            <SplitText>Upcoming Experiences</SplitText>
          </h1>
          <p className="events-desc text-sm md:text-base text-text-muted leading-relaxed font-body font-light">
            Discover our curated lineup of high-fidelity music festivals, corporate galas, and bespoke private events engineered for visual storytelling.
          </p>
        </div>

        {/* Filter Toolbar Box */}
        <div className="events-filter-box bg-bg-surface/55 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-[28px] shadow-xl shadow-black/30 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-4 top-3.5 w-6 h-6 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search event title, description or venue..." 
                value={search}
                onChange={handleSearchChange}
                className="w-full bg-bg-card/45 border border-border-color/80 text-lg text-black pl-12 pr-4 py-3.5 rounded-xl focus:border-accent-primary outline-none transition-all placeholder:text-slate-605 focus:bg-bg-main/80 hover:border-accent-primary/30"
              />
            </div>

            {/* Date and View Mode selectors */}
            <div className="flex flex-col sm:flex-row items-center justify-between md:justify-end gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <SlidersHorizontal className="w-4 h-4 text-accent-gold shrink-0 hidden sm:block" />
                <select 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full sm:w-44 bg-bg-card/45 border border-border-color/80 text-xs text-text-muted px-4 py-3.5 rounded-xl focus:border-accent-primary outline-none transition-all cursor-pointer font-bold hover:border-accent-primary/30"
                >
                  <option value="all">📅 All Dates</option>
                  <option value="upcoming">📅 Upcoming Events</option>
                  <option value="past">📅 Past Recaps</option>
                </select>
              </div>

              {/* Grid / List View Toggle */}
              <div className="flex bg-bg-card/45 border border-border-color/80 rounded-xl p-1 shrink-0 self-end sm:self-auto hover:border-accent-primary/20 transition-all">
                <button onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg cursor-pointer transition-all ${viewMode === 'list' ? 'bg-accent-primary text-text-muted shadow-md' : 'text-text-muted hover:text-text-muted'}`} title="List View">
                  <List className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg cursor-pointer transition-all ${ viewMode === 'grid' ? 'bg-accent-primary text-text-muted shadow-md': 'text-text-muted hover:text-text-muted'}`} title="Grid View">
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Catalog Grid Area */}
        {loading ? (
          /* Loading Skeleton Grids */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-bg-card/30 border border-border-color rounded-3xl h-[420px] animate-pulse space-y-6 flex flex-col justify-between p-6">
                <div className="space-y-4">
                  <div className="h-44 bg-bg-surface rounded-2xl w-full"></div>
                  <div className="h-4 bg-bg-surface rounded-md w-1/3"></div>
                  <div className="h-6 bg-bg-surface rounded-md w-3/4"></div>
                  <div className="h-4 bg-bg-surface rounded-md w-full"></div>
                </div>
                <div className="h-8 bg-bg-surface rounded-md w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          viewMode === 'grid' ? (
            /* Render Event Cards in Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div key={event.id} className="event-card-anim">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            /* Render Event Cards in List View */
            <div className="flex flex-col gap-6">
              {filteredEvents.map((event) => {
                const isUpcoming = new Date(event.date) >= new Date();
                const formatDate = (dateStr) => {
                  const options = { day: 'numeric', month: 'short', year: 'numeric' };
                  return new Date(dateStr).toLocaleDateString('en-US', options);
                };
                return (
                  <div
                    key={event.id}
                  className="event-card-anim relative bg-bg-card/45 backdrop-blur-md border border-white/5 rounded-[24px] overflow-hidden
                    flex flex-col md:flex-row gap-6 p-5 glass-card-hover group"
                >
                  {/* Banner Image */}
                  <div className="w-full md:w-64 h-44 shrink-0 overflow-hidden relative rounded-[20px] bg-bg-surface">
                    <img
                      src={event.banner || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'}
                      alt={event.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      loading="lazy"
                      />
                    {/* Status Badge */}
                    <span className={`absolute top-3 right-3 text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border backdrop-blur-md flex items-center gap-1.5
                      ${isUpcoming
                        ? 'bg-emerald-950/65 border-emerald-500/35 text-emerald-400'
                        : 'bg-bg-main/80 border-border-color/80 text-text-muted'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isUpcoming ? 'bg-emerald-400 animate-pulse' : 'bg-text-muted'}`}></span>
                      {isUpcoming ? 'Upcoming' : 'Past'}
                    </span>
                  </div>

                  {/* Info Details */}
                  <div className="flex flex-col justify-between flex-grow">
                    <div className="space-y-3.5">
                      <div className="flex flex-wrap gap-3 items-center">
                        <span className="badge-pill">
                          <Tag className="w-3 h-3" />
                          {event.category || 'Event'}
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] text-text-muted uppercase font-bold tracking-wider">
                          <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                          {formatDate(event.date)}
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] text-text-muted uppercase font-bold tracking-wider">
                          <MapPin className="w-3.5 h-3.5 text-accent-rose" />
                          {event.location}
                        </span>
                      </div>

                      <h3 className="font-display text-lg text-black font-extrabold  transition-colors leading-snug tracking-tight">
                        {event.title}
                      </h3>
                      <p className="text-xs text-text-muted leading-relaxed line-clamp-2 font-light">
                        {event.description}
                      </p>
                    </div>

                    <div className="pt-3.5 flex items-center justify-between border-t border-border-color/20 mt-4">
                      <Link
                        to={`/events/${event.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-primary
                          hover:text-accent-gold transition-colors group/link uppercase tracking-wider cursor-pointer"
                      >
                        Explore Event
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )
        ) : (
          /* Empty Search Result */
          <div className="text-center py-20 bg-bg-surface/55 backdrop-blur-md border border-white/5 rounded-[32px] space-y-4 animate-fade-in shadow-xl shadow-black/20">
            <Calendar className="w-12 h-12 text-accent-primary mx-auto animate-pulse" />
            <h3 className="text-lg font-bold text-text-muted tracking-tight">No Experiences Found</h3>
            <p className="text-xs text-text-muted max-w-sm mx-auto font-light">No events matching your search or filters could be verified. Clear your keywords or try another category.</p>
            <button 
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-bg-card hover:bg-accent-primary hover:border-accent-primary border border-border-color text-xs font-bold text-text-muted rounded-xl uppercase tracking-wider transition-all cursor-pointer btn-glow"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
