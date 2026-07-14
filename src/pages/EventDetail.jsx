import React, { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, Calendar, MapPin, Ticket, Play,
  FileText, Info, Film, Clock, ChevronRight
} from 'lucide-react';
import { api } from '../utils/api';
import RegistrationModal from '../components/RegistrationModal';
import { useGSAP, SplitText } from '../hooks/useGSAP';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
gsap.registerPlugin(ScrollTrigger);

export default function EventDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [event,          setEvent]          = useState(null);
  const [loading,        setLoading]        = useState(true);
  const [isModalOpen,    setIsModalOpen]    = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useDocumentMetadata(
    event ? event.title : 'Event Details',
    event ? `Reserve spots for ${event.title} on ${event.date}. Details on ticket price, location, categories, and custom experiences.` : ''
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadEvent = async () => {
      try {
        const data = await api.getEventById(id);
        setEvent(data);
        // Auto-open registration modal if redirected from Home page "Reserve Spot"
        if (searchParams.get('register') === 'true') {
          setIsModalOpen(true);
        }
      } catch (err) {
        console.error('Failed to load event details', err);
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id, searchParams]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

  const isUpcoming = event ? new Date(event.date) >= new Date() : false;

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-main text-white flex flex-col justify-center items-center py-20 px-8 select-none gap-4">
        <div className="w-10 h-10 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-text-muted font-semibold uppercase tracking-widest">Loading event…</span>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-bg-main text-white flex flex-col justify-center items-center py-20 px-8 gap-4">
        <div className="text-6xl">📭</div>
        <h2 className="font-display text-2xl text-accent-secondary">Event Not Found</h2>
        <p className="text-sm text-text-muted">No event matches this ID in our database.</p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 bg-accent-primary hover:bg-accent-secondary text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-bg-main text-text-main min-h-screen relative overflow-hidden">

      {/* ── Ambient glows ── */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/8 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-accent-rose/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* ── Hero Banner ── */}
      <div
        className="relative h-[65vh] min-h-[420px] flex items-end overflow-hidden"
      >
        <div
          className="ed-hero-img absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${event.banner || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800'})` }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-main/40 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-8 pb-12 z-10 space-y-5">
          {/* Back link */}
          <Link
            to="/events"
            className="ed-back-link inline-flex items-center gap-2 text-text-muted hover:text-accent-secondary text-xs font-bold uppercase tracking-widest transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Events
          </Link>

          {/* Status + Category */}
          <div className="ed-badges flex flex-wrap items-center gap-3">
            <span className="badge-pill backdrop-blur-md">
              {event.category || 'Special Edition'}
            </span>
            <span className={`text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border backdrop-blur-md
              ${isUpcoming
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-bg-card/85 border-border-color text-text-muted'
              }`}>
              {isUpcoming ? '🟢 Upcoming Event' : '✓ Past Event'}
            </span>
          </div>

          {/* Event Title */}
          <h1 className="ed-title font-display text-4xl md:text-6xl text-text-main leading-tight max-w-4xl font-extrabold tracking-tight">
            {event.title}
          </h1>

          {/* Meta */}
          <div className="ed-meta flex flex-wrap gap-6 text-sm text-text-muted">
            <span className="flex items-center gap-2 font-medium">
              <Calendar className="w-4 h-4 text-accent-gold" />
              {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-2 font-medium">
              <MapPin className="w-4 h-4 text-accent-rose" />
              {event.location}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10 pb-20">

        {/* ── Left (2-col): Overview + Video + Timeline ── */}
        <div className="lg:col-span-2 space-y-10">

          {/* Overview */}
          <section className="ed-section bg-bg-surface/55 backdrop-blur-md border border-white/5 rounded-[32px] p-8 space-y-4 shadow-xl shadow-black/30">
            <h2 className="font-display text-xl text-black flex items-center gap-2.5 pb-4 border-b border-border-color/30 font-extrabold tracking-tight">
              <FileText className="w-5 h-5 text-accent-primary" />
              Event Overview
            </h2>
            <p className="text-sm md:text-base text-text-muted font-light leading-relaxed">
              {event.fullDescription || event.description}
            </p>
          </section>

          {/* Video */}
          {event.videoUrl && (
            <section className="space-y-4">
              <h2 className="font-display text-xl text-white flex items-center gap-2.5 pb-4 border-b border-border-color/30 font-extrabold tracking-tight">
                <Film className="w-5 h-5 text-accent-primary" />
                Production Highlight
              </h2>
              <div className="aspect-video rounded-[32px] overflow-hidden border border-white/5 bg-bg-surface relative group shadow-2xl shadow-black/40">
                {!isVideoPlaying ? (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 cursor-pointer select-none"
                    onClick={() => setIsVideoPlaying(true)}
                  >
                    <img
                      src={event.videoThumbnail || event.banner}
                      alt="Video preview"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-main/60 to-transparent" />
                    <div className="bg-gradient-to-r from-accent-primary to-accent-rose hover:from-accent-rose hover:to-accent-secondary p-5.5 rounded-full text-white shadow-2xl shadow-accent-primary/45 z-20 group-hover:scale-110 active:scale-95 transition-all">
                      <Play className="w-7 h-7 fill-white text-white ml-0.5" />
                    </div>
                    <span className="text-[10px] text-accent-gold uppercase tracking-[3px] font-extrabold mt-5 z-20 drop-shadow">
                      Play Highlight Reel
                    </span>
                  </div>
                ) : (
                  <video src={event.videoUrl} controls autoPlay className="w-full h-full object-cover" />
                )}
              </div>
            </section>
          )}

          {/* Schedule Timeline */}
          {event.schedule && event.schedule.length > 0 && (
            <section className="bg-bg-surface/55 backdrop-blur-md border border-white/5 rounded-[32px] p-8 shadow-xl shadow-black/30">
              <h2 className="font-display text-xl text-white flex items-center gap-2.5 pb-4 mb-6 border-b border-border-color/30 font-extrabold tracking-tight">
                <Clock className="w-5 h-5 text-accent-primary" />
                Event Timeline
              </h2>
              <div className="space-y-6 relative before:absolute before:left-[18px] before:top-2.5 before:bottom-2.5 before:w-[2px] before:bg-gradient-to-b before:from-accent-primary before:via-accent-rose/50 before:to-transparent">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-5 relative animate-fade-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="w-9 h-9 bg-accent-primary/10 border-2 border-accent-primary rounded-full flex items-center justify-center text-xs font-extrabold text-white z-10 shrink-0 shadow-[0_0_12px_rgba(225,29,72,0.3)]">
                      {idx + 1}
                    </div>
                    <div className="pt-1">
                      <span className="text-xs text-accent-gold font-extrabold uppercase tracking-wider block">{item.time}</span>
                      <h4 className="text-sm font-bold text-white mt-1 block">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ── Right (1-col): Info + Registration CTA ── */}
        <div className="space-y-6">

          {/* Venue & Guidelines */}
          <div className="bg-bg-surface/55 backdrop-blur-md border border-white/5 rounded-[28px] p-6 space-y-5 shadow-xl shadow-black/30">
            <h3 className="font-display text-base text-white flex items-center gap-2.5 pb-3 border-b border-border-color/20 font-extrabold tracking-tight">
              <Info className="w-5 h-5 text-accent-primary" />
              Venue & Details
            </h3>

            {event.venueDetails && (
              <div className="space-y-1">
                <span className="text-[10px] text-text-muted font-extrabold uppercase tracking-wider block">Location Details</span>
                <p className="text-xs text-text-muted font-light leading-relaxed">{event.venueDetails}</p>
              </div>
            )}

            {event.participationInfo && (
              <div className="space-y-1 pt-4 border-t border-border-color/25">
                <span className="text-[10px] text-text-muted font-extrabold uppercase tracking-wider block">Participation</span>
                <p className="text-xs text-text-muted font-light leading-relaxed">{event.participationInfo}</p>
              </div>
            )}
          </div>

          {/* Registration CTA */}
          <div className="relative bg-gradient-to-br from-accent-primary/10 to-bg-surface/70 backdrop-blur-md border border-accent-primary/25 rounded-[30px] p-6 overflow-hidden shadow-2xl shadow-accent-primary/10">
            {/* Decorative glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-primary/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent-rose/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-accent-gold animate-pulse" />
                <h3 className="font-display text-base text-white font-extrabold tracking-tight">Secure Your Spot</h3>
              </div>

              {/* Price display */}
              {event.price != null && event.price > 0 ? (
                <div className="flex items-center justify-between bg-bg-main/40 border border-accent-gold/25 rounded-xl px-4 py-3">
                  <span className="text-xs text-text-muted font-medium">Price per seat</span>
                  <span className="text-accent-gold font-black text-lg">₹{event.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              ) : (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 text-xs text-emerald-400 font-bold text-center">
                  🎟 Free Entry Event
                </div>
              )}

              <p className="text-xs text-text-muted leading-relaxed font-light">
                Reserve your entry to this exclusive VSI experience. Limited seats available — don't miss out.
              </p>

              <button
                id="register-event-btn"
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-accent-primary to-accent-rose hover:from-accent-rose hover:to-accent-secondary text-white font-bold rounded-xl btn-glow
                  hover:shadow-lg hover:shadow-accent-primary/20 hover:-translate-y-0.5 transition-all
                  flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-widest"
              >
                Register Now <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-text-muted text-center font-light">
                {event.price > 0 ? 'Secure Razorpay payment · Limited availability' : 'Free registration · Limited availability'}
              </p>
            </div>
          </div>

          {/* Quick nav back */}
          <Link
            to="/events"
            className="flex items-center justify-center gap-2 py-3.5 px-5 bg-bg-card/50 backdrop-blur-md border border-white/5
              hover:border-accent-primary/35 rounded-xl text-xs font-bold text-text-muted hover:text-white
              transition-all cursor-pointer uppercase tracking-widest shadow-md hover:shadow-white/5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Browse All Events
          </Link>
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventName={event.title}
        eventId={event.id}
        eventPrice={event.price ?? 0}
      />
    </div>
  );
}
