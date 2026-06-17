import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Tag, ArrowRight, Images, Maximize2 } from 'lucide-react';

const CATEGORY_COLORS = {
  weddings:              { bg: 'bg-pink-950/60',   border: 'border-pink-600/40',   text: 'text-pink-300' },
  'corporate-events':   { bg: 'bg-blue-950/60',   border: 'border-blue-600/40',   text: 'text-blue-300' },
  'music-shows':        { bg: 'bg-purple-950/60', border: 'border-purple-600/40', text: 'text-purple-300' },
  'dj-nights':          { bg: 'bg-cyan-950/60',   border: 'border-cyan-600/40',   text: 'text-cyan-300' },
  'birthday-celebrations': { bg: 'bg-yellow-950/60', border: 'border-yellow-600/40', text: 'text-yellow-300' },
  'college-events':     { bg: 'bg-green-950/60',  border: 'border-green-600/40',  text: 'text-green-300' },
  'cultural-events':    { bg: 'bg-orange-950/60', border: 'border-orange-600/40', text: 'text-orange-300' },
};

export default function GalleryCard({ event }) {
  const [hovered, setHovered] = useState(false);
  const cat = CATEGORY_COLORS[event.category] || { bg: 'bg-bg-card', border: 'border-border-color', text: 'text-accent-gold' };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const photoCount = (event.photos?.length || 0) + (event.btsPhotos?.length || 0);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-bg-card/40 backdrop-blur-md border border-border-color rounded-3xl overflow-hidden
                 hover:border-accent-gold/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-primary/10
                 transition-all duration-300 flex flex-col"
    >
      {/* Banner */}
      <div className="relative h-56 overflow-hidden bg-black">
        <img
          src={event.banner}
          alt={event.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            hovered ? 'scale-110 brightness-50' : 'scale-100 brightness-75'
          }`}
        />

        {/* Category pill */}
        <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border backdrop-blur-md ${cat.bg} ${cat.border} ${cat.text}`}>
          {event.categoryLabel}
        </span>

        {/* Photo count badge */}
        {photoCount > 0 && (
          <span className="absolute top-4 right-4 text-[10px] font-bold text-white flex items-center gap-1 bg-black/60 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
            <Images className="w-3 h-3 text-accent-gold" /> {photoCount}
          </span>
        )}

        {/* Hover overlay CTA */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <Link
            to={`/gallery/${event.id}`}
            className="bg-accent-primary/90 hover:bg-accent-primary border border-accent-gold/40 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-xl shadow-accent-primary/40 hover:scale-105 transition-transform cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" /> View Showcase
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 md:p-7 flex flex-col flex-grow gap-3">
        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-[11px] text-text-muted font-semibold">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-accent-gold" />
            {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-1.5 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-accent-gold" />
            {event.location}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-extrabold text-white group-hover:text-accent-gold transition-colors leading-tight line-clamp-2">
          {event.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-text-muted leading-relaxed line-clamp-3 flex-grow">
          {event.description}
        </p>

        {/* CTA link */}
        <Link
          to={`/gallery/${event.id}`}
          className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent-gold hover:text-white transition-colors cursor-pointer"
        >
          Explore Full Showcase <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
