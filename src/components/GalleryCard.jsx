import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Tag, ArrowRight, Images, Maximize2 } from 'lucide-react';
import gsap from 'gsap';

const CATEGORY_COLORS = {
  weddings:              { bg: 'bg-pink-50/90',   border: 'border-pink-200',   text: 'text-pink-600' },
  'corporate-events':   { bg: 'bg-blue-50/90',   border: 'border-blue-200',   text: 'text-blue-600' },
  'music-shows':        { bg: 'bg-purple-50/90', border: 'border-purple-200', text: 'text-purple-600' },
  'dj-nights':          { bg: 'bg-cyan-50/90',   border: 'border-cyan-200',   text: 'text-cyan-600' },
  'birthday-celebrations': { bg: 'bg-yellow-50/90', border: 'border-yellow-200', text: 'text-yellow-600' },
  'college-events':     { bg: 'bg-green-50/90',  border: 'border-green-200',  text: 'text-green-600' },
  'cultural-events':    { bg: 'bg-orange-50/90', border: 'border-orange-200', text: 'text-orange-600' },
};

export default function GalleryCard({ event }) {
  const cardRef = useRef(null);
  const cat = CATEGORY_COLORS[event.category] || { bg: 'bg-bg-card', border: 'border-border-color', text: 'text-accent-gold' };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const photoCount = (event.photos?.length || 0) + (event.btsPhotos?.length || 0);


  return (
    <div
      ref={cardRef}
      className="group relative bg-bg-card/45 backdrop-blur-md border border-border-color/60 rounded-[28px] overflow-hidden
                 glass-card-gold-hover flex flex-col select-none origin-center"
    >
      {/* Banner */}
      <div className="relative h-56 overflow-hidden bg-black">
        <img
          src={event.banner}
          alt={event.name}
          className="w-full h-full object-cover transition-all duration-700 scale-100 brightness-75 group-hover:scale-105 group-hover:brightness-50"
          loading="lazy"
        />

        {/* Category pill */}
        <span className={`absolute top-4 left-4 text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border backdrop-blur-md ${cat.bg} ${cat.border} ${cat.text}`}>
          {event.categoryLabel}
        </span>

        {/* Photo count badge */}
        {photoCount > 0 && (
          <span className="absolute top-4 right-4 text-[9px] font-extrabold text-white flex items-center gap-1.5 bg-black/60 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
            <Images className="w-3.5 h-3.5 text-accent-gold" /> {photoCount}
          </span>
        )}

        {/* Hover overlay CTA */}
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100">
          <Link
            to={`/gallery/${event.id}`}
            className="bg-gradient-to-r from-accent-primary to-accent-rose hover:from-accent-rose hover:to-accent-secondary border-none text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-accent-primary/20 hover:scale-105 transition-all cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" /> View Showcase
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow gap-4">
        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-[10px] text-text-muted uppercase font-bold tracking-wider">
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
        <h3 className="font-display text-lg font-extrabold text-black transition-colors leading-tight line-clamp-2 tracking-tight">
          {event.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-text-muted font-light leading-relaxed line-clamp-3 flex-grow">
          {event.description}
        </p>

        {/* CTA link */}
        <div className="pt-3.5 border-t border-border-color/20">
          <Link
            to={`/gallery/${event.id}`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-gold  transition-colors cursor-pointer"
          >
            Explore Full Showcase <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
