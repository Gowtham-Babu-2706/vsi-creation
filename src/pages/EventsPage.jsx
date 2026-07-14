import React, { useState, useEffect, useRef } from 'react';
import {  Sparkles} from 'lucide-react';
import { api } from '../utils/api';
import EventCard from '../components/EventCard';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export default function EventsPage() {
  useDocumentMetadata('Upcoming Events & Experiences', 'Stay updated on spectacular live experiences, concerts, summits, and festivals organized by VSI Creations. Reserve your spot today.');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
            Upcoming Experiences
          </h1>
          <p className="events-desc text-sm md:text-base text-text-muted leading-relaxed font-body font-light">
            Discover our curated lineup of high-fidelity music festivals, corporate galas, and bespoke private events engineered for visual storytelling.
          </p>
        </div>

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
        ) :(
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id} className="event-card-anim">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
