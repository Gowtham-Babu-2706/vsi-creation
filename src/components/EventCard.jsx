import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Tag } from 'lucide-react';

export default function EventCard({ event }) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateStr) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  // Determine if event is upcoming or past
  const isUpcoming = new Date(event.date) >= new Date();

  return (
    <div
      className="relative bg-bg-card border border-border-color rounded-2xl overflow-hidden
        flex flex-col justify-between
        transition-all duration-300 group
        hover:border-accent-primary/50 hover:-translate-y-2
        hover:shadow-2xl hover:shadow-accent-primary/15"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Banner Image ── */}
      <div className="h-52 overflow-hidden relative select-none bg-bg-surface">
        <img
          src={event.banner || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'}
          alt={event.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-108 brightness-75' : 'scale-100 brightness-90'
          }`}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 via-transparent to-transparent" />

        {/* Status badge */}
        <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border
          ${isUpcoming
            ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
            : 'bg-bg-main/70 border-border-color text-text-muted'
          }`}>
          {isUpcoming ? '🟢 Upcoming' : '✓ Past'}
        </span>

        {/* Category badge */}
        <span className="absolute top-3 left-3 badge-pill">
          <Tag className="w-3 h-3" />
          {event.category || 'Event'}
        </span>

        {/* Hover CTA overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Link
            to={`/events/${event.id}`}
            className="bg-accent-primary hover:bg-accent-secondary text-white px-5 py-2.5 rounded-xl
              font-semibold text-xs uppercase tracking-wider flex items-center gap-2
              shadow-lg shadow-accent-primary/40 transition-all hover:scale-105 cursor-pointer"
          >
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="p-5 space-y-3 flex-grow">
        {/* Meta row */}
        <div className="flex flex-wrap gap-3 text-[11px] text-text-muted font-medium">
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
        <h3 className="font-display text-lg text-text-main group-hover:text-accent-secondary transition-colors leading-snug line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
          {event.description}
        </p>
      </div>

      {/* ── Card Footer ── */}
      <div className="px-5 pb-5 pt-2 border-t border-border-color/40">
        <Link
          to={`/events/${event.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-accent-secondary
            hover:text-accent-gold transition-colors group/link uppercase tracking-wider cursor-pointer"
        >
          Explore Event
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
