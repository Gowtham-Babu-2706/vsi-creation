import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Images, Sparkles } from 'lucide-react';
import { GALLERY_EVENTS } from '../utils/galleryData';
import GalleryCard from '../components/GalleryCard';
import { api } from '../utils/api';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

const CATEGORIES = [
  { id: 'all',                   label: 'All Events' },
  { id: 'weddings',              label: '💍 Weddings' },
  { id: 'corporate-events',     label: '🏢 Corporate Events' },
  { id: 'music-shows',          label: '🎵 Music Shows' },
  { id: 'dj-nights',            label: '🎧 DJ Nights' },
  { id: 'birthday-celebrations',label: '🎂 Birthday Celebrations' },
  { id: 'college-events',       label: '🎓 College Events' },
  { id: 'cultural-events',      label: '🎭 Cultural Events' },
];

export default function GalleryPage() {
  useDocumentMetadata('Media Gallery & Portfolios', 'Browse photos and behind-the-scenes captures from our high-fidelity stage productions, concerts, weddings, and corporate events.');
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const data = await api.getGallery();
        if (data && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(GALLERY_EVENTS);
        }
      } catch (err) {
        console.error('Failed to fetch gallery events, using fallback:', err);
        setEvents(GALLERY_EVENTS);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filtered = events.filter((ev) => {
    const matchSearch =
      ev.name.toLowerCase().includes(search.toLowerCase()) ||
      ev.location.toLowerCase().includes(search.toLowerCase()) ||
      ev.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || ev.category === category;
    return matchSearch && matchCat;
  });



  return (
    <div className="bg-bg-main text-text-main min-h-screen pt-24 pb-16 relative">
      {/* Ambient lighting */}
      <div className="absolute top-10 left-[5%] w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[50vh] right-[8%] w-[450px] h-[450px] bg-accent-gold/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">

        {/* ── Page header ─────────────────────────── */}
        <div className="text-center md:text-left space-y-3 max-w-2xl">
          <span className="gal-eyebrow text-xs text-accent-gold font-bold uppercase tracking-[4px] glow-gold flex items-center justify-center md:justify-start gap-1.5">
            <Sparkles className="w-4 h-4 text-accent-gold" />
            Visual Archive
          </span>
          <h1 className="gal-title text-4xl md:text-5xl font-extrabold text-black tracking-tight font-display">
            <>Event Gallery</>
          </h1>
          <p className="gal-desc text-sm md:text-base text-text-muted leading-relaxed font-light">
            A curated showcase of every spectacle VSI Creations has engineered — from royal weddings and arena concerts to intimate cultural galas.
          </p>
        </div>

        {/* ── Filter toolbar ───────────────────────── */}
        <div className="gal-filter-box bg-bg-surface/55 backdrop-blur-md border border-white/5 rounded-[28px] p-6 md:p-8 shadow-xl shadow-black/30 space-y-5">
          {/* Search + sort row */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search event name, venue or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-bg-card/45 border border-border-color/80 text-xs text-white pl-12 pr-4 py-3.5 rounded-xl focus:border-accent-primary outline-none transition-all placeholder:text-slate-655 focus:bg-bg-main/80 hover:border-accent-primary/25"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto ml-auto">
              <SlidersHorizontal className="w-4 h-4 text-accent-gold shrink-0 hidden md:block" />
              <span className="text-xs text-text-muted font-bold uppercase tracking-widest">
                {filtered.length} event{filtered.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-border-color/30">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                  category === cat.id
                    ? 'cat-active'
                    : 'bg-bg-card border-border-color/85 hover:border-accent-primary text-text-muted hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grid ─────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-bg-card/30 border border-border-color rounded-3xl h-[420px] animate-pulse flex flex-col">
                <div className="h-56 bg-bg-surface rounded-t-3xl" />
                <div className="p-6 space-y-3 flex-grow">
                  <div className="h-3 bg-bg-surface rounded-md w-1/3" />
                  <div className="h-5 bg-bg-surface rounded-md w-3/4" />
                  <div className="h-3 bg-bg-surface rounded-md w-full" />
                  <div className="h-3 bg-bg-surface rounded-md w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((ev) => (
              <div key={ev.id} className="gal-card-anim">
                <GalleryCard event={ev} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-bg-surface/55 backdrop-blur-md border border-white/5 rounded-[32px] space-y-4 shadow-xl shadow-black/25">
            <Images className="w-12 h-12 text-accent-primary mx-auto animate-pulse" />
            <h3 className="text-lg font-bold text-white tracking-tight">No Events Found</h3>
            <p className="text-xs text-text-muted max-w-sm mx-auto font-light">
              No gallery records match your search or category filter. Try clearing the search or switching categories.
            </p>
            <button
              onClick={() => { setSearch(''); setCategory('all'); }}
              className="px-6 py-2.5 bg-bg-card/70 hover:bg-accent-primary border border-border-color hover:border-accent-primary text-xs font-bold text-white rounded-xl uppercase tracking-wider transition-all cursor-pointer btn-glow"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
