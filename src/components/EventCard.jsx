import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Tag } from 'lucide-react';
import gsap from 'gsap';

export default function EventCard({ event }) {
  const cardRef = useRef(null);

  const formatDate = (dateStr) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  // Determine if event is upcoming or past
  const isUpcoming = new Date(event.date) >= new Date();



  return (
    <div
      ref={cardRef}
      className="relative bg-bg-card/40 backdrop-blur-md border border-border-color/60 rounded-[24px] overflow-hidden
        flex flex-col justify-between
        glass-card-hover group select-none origin-center"
    >
      {/* ── Banner Image ── */}
      <div className="h-52 overflow-hidden relative select-none bg-bg-surface">
        <img
          src={event.banner}
          alt={event.title}
          className="w-full h-full object-cover transition-all duration-700 scale-100 brightness-90 group-hover:scale-105 group-hover:brightness-75"
          loading="lazy"
        />


        {/* Status badge */}
        <span className={`absolute top-4 right-4 text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border backdrop-blur-md flex items-center gap-1.5
          ${isUpcoming
            ? 'bg-emerald-950/60 border-emerald-500/35 text-emerald-400'
            : 'bg-bg-main/80 border-border-color/80 text-text-muted'
          }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isUpcoming ? 'bg-emerald-400 animate-pulse' : 'bg-text-muted'}`}></span>
          {isUpcoming ? 'Upcoming' : 'Past'}
        </span>

        {/* Category badge */}
        <span className="absolute top-4 left-4 badge-pill">
          <Tag className="w-3 h-3" />
          {event.category || 'Event'}
        </span>

        {/* Hover CTA overlay */}
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
          <Link
            to={`/events/${event.id}`}
            className="bg-accent-primary hover:bg-accent-secondary text-white px-5 py-2.5 rounded-xl
              font-bold text-xs uppercase tracking-wider flex items-center gap-2
              shadow-lg shadow-accent-primary/20 hover:shadow-accent-secondary/35 transition-all hover:scale-105 cursor-pointer"
          >
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="p-6 space-y-3.5 flex-grow">
        {/* Meta row */}
        <div className="flex flex-wrap gap-3.5 text-[10px] text-text-muted uppercase font-bold tracking-wider">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-accent-gold" />
            {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-1.5 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-accent-rose" />
            {event.location}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg text-black font-extrabold group-hover:text-accent-primary transition-colors leading-snug line-clamp-2 tracking-tight">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-text-muted leading-relaxed line-clamp-3 font-light">
          {event.description}
        </p>
      </div>

      {/* ── Card Footer ── */}
      <div className="px-6 pb-6 pt-3 border-t border-border-color/30">
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
  );
}
