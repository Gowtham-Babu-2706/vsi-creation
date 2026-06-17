import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Calendar, MapPin, CheckCircle2,
  Images, Camera, Film, Star, Share2
} from 'lucide-react';
import { getGalleryEventById } from '../utils/galleryData';
import VideoPlayer from '../components/VideoPlayer';
import Lightbox from '../components/Lightbox';

export default function GalleryDetail() {
  const { id } = useParams();
  const [event, setEvent]       = useState(null);
  const [loading, setLoading]   = useState(true);

  // Lightbox state — tracks which image array and index
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex]   = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const data = getGalleryEventById(id);
    setEvent(data);
    setLoading(false);
  }, [id]);

  const openLightbox = (images, idx) => {
    setLightboxImages(images);
    setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-main flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-accent-gold border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-text-muted uppercase tracking-widest font-bold">Loading showcase…</span>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-bg-main text-white flex flex-col items-center justify-center gap-4 px-8 py-20">
        <h2 className="text-2xl font-black text-accent-primary uppercase tracking-wider">Event Not Found</h2>
        <p className="text-sm text-text-muted text-center max-w-sm">
          No gallery record matches this ID. The event may have been removed or the link is incorrect.
        </p>
        <Link to="/gallery" className="inline-flex items-center gap-2 bg-accent-gold text-bg-main font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all hover:bg-white cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> Back to Gallery
        </Link>
      </div>
    );
  }

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const allEventPhotos = event.photos || [];
  const allBtsPhotos   = event.btsPhotos || [];

  return (
    <div className="bg-bg-main text-text-main min-h-screen pb-16 relative">
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* ── Hero Banner ─────────────────────────────── */}
      <div
        className="relative h-[60vh] md:h-[70vh] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${event.banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/50 to-black/30" />

        <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-6 md:px-8 pb-12 z-10">
          <Link to="/gallery" className="inline-flex items-center gap-2 text-accent-gold hover:text-white text-xs font-bold uppercase tracking-wider mb-6 transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back to Gallery
          </Link>

          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent-gold bg-accent-primary/20 border border-accent-primary/40 px-3.5 py-1.5 rounded-full inline-block">
              {event.categoryLabel}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight max-w-3xl">
              {event.name}
            </h1>
            <div className="flex flex-wrap gap-5 text-sm text-text-muted font-semibold mt-2">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-accent-gold" />{formatDate(event.date)}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-accent-gold" />{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">

        {/* Left column (2-span) */}
        <div className="lg:col-span-2 space-y-14">

          {/* Description */}
          <section className="bg-bg-surface border border-border-color p-8 rounded-3xl space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-border-color pb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-accent-gold" /> Event Overview
            </h2>
            <p className="text-sm md:text-base text-text-muted leading-relaxed">
              {event.fullDescription}
            </p>
          </section>

          {/* Highlights */}
          {event.highlights?.length > 0 && (
            <section className="bg-bg-surface border border-border-color p-8 rounded-3xl space-y-5">
              <h2 className="text-xl font-bold text-white border-b border-border-color pb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent-gold" /> Production Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {event.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 bg-bg-card border border-border-color/60 p-4 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                    <span className="text-xs text-text-muted leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Event Photo Gallery */}
          {allEventPhotos.length > 0 && (
            <section className="space-y-5">
              <h2 className="text-xl font-bold text-white border-b border-border-color pb-3 flex items-center gap-2">
                <Images className="w-5 h-5 text-accent-gold" /> Event Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {allEventPhotos.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => openLightbox(allEventPhotos, i)}
                    className="h-44 md:h-52 rounded-2xl overflow-hidden border border-border-color group cursor-pointer relative"
                  >
                    <img
                      src={img}
                      alt={`Event photo ${i + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/60 border border-accent-gold/30 text-accent-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
                        View Full
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Video */}
          {event.videoUrl && (
            <section className="space-y-5">
              <h2 className="text-xl font-bold text-white border-b border-border-color pb-3 flex items-center gap-2">
                <Film className="w-5 h-5 text-accent-gold" /> Production Video
              </h2>
              <VideoPlayer
                videoUrl={event.videoUrl}
                videoType={event.videoType}
                thumbnail={event.banner}
                title={event.name}
              />
            </section>
          )}

          {/* Behind-the-scenes */}
          {allBtsPhotos.length > 0 && (
            <section className="space-y-5">
              <h2 className="text-xl font-bold text-white border-b border-border-color pb-3 flex items-center gap-2">
                <Camera className="w-5 h-5 text-accent-gold" /> Behind the Scenes
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {allBtsPhotos.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => openLightbox(allBtsPhotos, i)}
                    className="h-48 rounded-2xl overflow-hidden border border-border-color group cursor-pointer relative"
                  >
                    <img
                      src={img}
                      alt={`BTS photo ${i + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/60 border border-accent-gold/30 text-accent-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
                        View Full
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right column — Event info card */}
        <div className="space-y-8">
          <div className="bg-bg-surface border border-border-color p-8 rounded-3xl space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-border-color pb-4">
              <h3 className="text-base font-bold text-white">Event Details</h3>
              <span className="text-[10px] text-accent-gold font-bold uppercase tracking-widest bg-accent-primary/20 border border-accent-primary/40 px-2.5 py-1 rounded-full">
                Archived
              </span>
            </div>

            <dl className="space-y-4 text-xs">
              <div>
                <dt className="text-text-muted uppercase tracking-wider font-bold mb-1">Category</dt>
                <dd className="text-white font-semibold">{event.categoryLabel}</dd>
              </div>
              <div>
                <dt className="text-text-muted uppercase tracking-wider font-bold mb-1">Date</dt>
                <dd className="text-white font-semibold">{formatDate(event.date)}</dd>
              </div>
              <div>
                <dt className="text-text-muted uppercase tracking-wider font-bold mb-1">Venue</dt>
                <dd className="text-white font-semibold">{event.location}</dd>
              </div>
              <div>
                <dt className="text-text-muted uppercase tracking-wider font-bold mb-1">Photos Captured</dt>
                <dd className="text-white font-semibold">{allEventPhotos.length + allBtsPhotos.length} images</dd>
              </div>
            </dl>

            <div className="pt-4 border-t border-border-color space-y-3">
              <Link
                to="/contact"
                className="w-full py-3.5 bg-gradient-to-r from-accent-primary to-[#700016] text-white font-bold rounded-xl border border-accent-gold/20 hover:border-accent-gold shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider flex items-center justify-center cursor-pointer"
              >
                Book Similar Event
              </Link>
              <Link
                to="/gallery"
                className="w-full py-3 bg-bg-card border border-border-color hover:border-accent-primary text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> All Gallery Events
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox overlay */}
      <Lightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={closeLightbox}
        onChange={setLightboxIndex}
      />
    </div>
  );
}
