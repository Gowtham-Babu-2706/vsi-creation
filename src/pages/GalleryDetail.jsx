import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Calendar, MapPin, CheckCircle2,
  Images, Camera, Film, Star
} from 'lucide-react';
import { getGalleryEventById } from '../utils/galleryData';
import VideoPlayer from '../components/VideoPlayer';
import Lightbox from '../components/Lightbox';
import { api } from '../utils/api';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export default function GalleryDetail() {
  const { id } = useParams();
  const [event, setEvent]       = useState(null);
  const [loading, setLoading]   = useState(true);

  useDocumentMetadata(
    event ? `${event.name} Photos` : 'Gallery Event Showcase',
    event ? `View high-definition event snaps and behind-the-scenes production details for ${event.name} by VSI Creations.` : ''
  );

  // Lightbox state — tracks which image array and index
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex]   = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await api.getGalleryById(id);
        if (data) {
          setEvent(data);
        } else {
          setEvent(getGalleryEventById(id));
        }
      } catch (err) {
        console.error('Failed to fetch gallery event by id, using fallback:', err);
        setEvent(getGalleryEventById(id));
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const openLightbox = (images, idx) => {
    setLightboxImages(images);
    setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const allEventPhotos = event?.photos || [];
  const allBtsPhotos   = event?.btsPhotos || [];


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
      <div className="min-h-screen bg-bg-main text-black flex flex-col items-center justify-center gap-4 px-8 py-20">
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

  return (
    <div className="bg-bg-main text-text-main min-h-screen pb-16 relative">
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />      {/* ── Hero Banner ─────────────────────────── */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div
          className="gd-hero-img absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${event.banner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/50 to-black/30" />

        <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-6 md:px-8 pb-12 z-10">
          <Link to="/gallery" className="gd-back-link inline-flex items-center gap-2 text-accent-primary hover:text-black text-xs font-bold uppercase tracking-widest mb-6 transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back to Gallery
          </Link>

          <div className="space-y-3">
            <span className="gd-eyebrow text-[10px] font-bold uppercase tracking-widest text-accent-gold bg-accent-primary/20 border border-accent-primary/40 px-3.5 py-1.5 rounded-full inline-block">
              {event.categoryLabel}
            </span>
            <h1 className="gd-title text-3xl md:text-5xl font-extrabold text-black leading-tight tracking-tight font-display max-w-3xl">
              {event.name}
            </h1>
            <div className="gd-meta flex flex-wrap gap-5 text-xs text-text-muted font-bold uppercase tracking-wider mt-3">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-accent-gold" />{formatDate(event.date)}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-accent-rose" />{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">

        {/* Left column (2-span) */}
        <div className="lg:col-span-2 space-y-14">

          {/* Description */}
          <section className="gd-section bg-bg-surface/55 backdrop-blur-md border border-white/5 p-8 rounded-[32px] space-y-4 shadow-xl shadow-black/30">
            <h2 className="text-xl font-extrabold text-text-muted border-b border-border-color/20 pb-3 flex items-center gap-2 tracking-tight font-display">
              <Star className="w-5 h-5 text-accent-gold" /> Event Overview
            </h2>
            <p className="text-sm md:text-base text-text-muted font-light leading-relaxed">
              {event.fullDescription}
            </p>
          </section>

          {/* Highlights */}
          {event.highlights?.length > 0 && (
            <section className="bg-bg-surface/55 backdrop-blur-md border border-white/5 p-8 rounded-[32px] space-y-5 shadow-xl shadow-black/30">
              <h2 className="text-xl font-extrabold text-text-muted border-b border-border-color/20 pb-3 flex items-center gap-2 tracking-tight font-display">
                <CheckCircle2 className="w-5 h-5 text-accent-gold" /> Production Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {event.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 bg-bg-card/45 backdrop-blur-md border border-white/5 p-4 rounded-xl hover:border-accent-primary/25 transition-all">
                    <CheckCircle2 className="w-4 h-4 text-accent-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-text-muted leading-relaxed font-light">{h}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Event Photo Gallery */}
          {allEventPhotos.length > 0 && (
            <section className="space-y-5">
              <h2 className="text-xl font-extrabold text-text-muted border-b border-border-color/20 pb-3 flex items-center gap-2 tracking-tight font-display">
                <Images className="w-5 h-5 text-accent-primary" /> Event Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {allEventPhotos.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => openLightbox(allEventPhotos, i)}
                    className="h-44 md:h-52 rounded-[20px] overflow-hidden border border-white/5 group cursor-pointer relative shadow-lg hover:border-accent-primary/30 transition-all"
                  >
                    <img
                      src={img}
                      alt={`Event photo ${i + 1}`}
                      className="w-full h-full object-cover transition-all duration-550 group-hover:scale-110 group-hover:brightness-50"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/60 border border-accent-primary/30 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg">
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
              <h2 className="text-xl font-extrabold text-black border-b border-border-color/20 pb-3 flex items-center gap-2 tracking-tight font-display">
                <Film className="w-5 h-5 text-accent-primary" /> Production Video
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
              <h2 className="text-xl font-extrabold text-white border-b border-border-color/20 pb-3 flex items-center gap-2 tracking-tight font-display">
                <Camera className="w-5 h-5 text-accent-primary" /> Behind the Scenes
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {allBtsPhotos.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => openLightbox(allBtsPhotos, i)}
                    className="h-48 rounded-[20px] overflow-hidden border border-white/5 group cursor-pointer relative shadow-lg hover:border-accent-primary/30 transition-all"
                  >
                    <img
                      src={img}
                      alt={`BTS photo ${i + 1}`}
                      className="w-full h-full object-cover transition-all duration-550 group-hover:scale-110 group-hover:brightness-50"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/60 border border-accent-primary/30 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg">
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
          <div className="bg-bg-surface/55 backdrop-blur-md border border-white/5 p-8 rounded-[28px] space-y-6 shadow-xl shadow-black/30 sticky top-28">
            <div className="flex items-center justify-between border-b border-border-color/20 pb-4">
              <h3 className="text-base font-extrabold text-white tracking-tight">Event Details</h3>
              <span className="text-[10px] text-accent-gold font-extrabold uppercase tracking-widest bg-accent-primary/20 border border-accent-primary/40 px-2.5 py-1 rounded-full">
                Archived
              </span>
            </div>

            <dl className="space-y-4 text-xs">
              <div>
                <dt className="text-text-muted uppercase tracking-widest font-bold mb-1">Category</dt>
                <dd className="text-black font-semibold">{event.categoryLabel}</dd>
              </div>
              <div>
                <dt className="text-text-muted uppercase tracking-widest font-bold mb-1">Date</dt>
                <dd className="text-black font-semibold">{formatDate(event.date)}</dd>
              </div>
              <div>
                <dt className="text-text-muted uppercase tracking-widest font-bold mb-1">Venue</dt>
                <dd className="text-black font-semibold">{event.location}</dd>
              </div>
              <div>
                <dt className="text-text-muted uppercase tracking-widest font-bold mb-1">Photos Captured</dt>
                <dd className="text-black font-semibold">{allEventPhotos.length + allBtsPhotos.length} images</dd>
              </div>
            </dl>

            <div className="pt-4 border-t border-border-color/20 space-y-3">
              <Link
                to="/contact"
                className="w-full py-4 bg-gradient-to-r from-accent-primary to-accent-rose hover:from-accent-rose hover:to-accent-secondary text-white font-bold rounded-xl btn-glow shadow-lg shadow-accent-primary/25 hover:shadow-accent-secondary/35 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-widest flex items-center justify-center cursor-pointer"
              >
                Book Similar Event
              </Link>
              <Link
                to="/gallery"
                className="w-full py-3 bg-bg-card/50 backdrop-blur-md border border-white/5 hover:border-accent-primary/35 text-text-muted font-bold rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-white/5"
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
