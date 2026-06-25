import React, { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, Calendar, MapPin, Ticket, Play,
  FileText, Info, Film, Clock, ChevronRight
} from 'lucide-react';
import { api } from '../utils/api';
import RegistrationModal from '../components/RegistrationModal';

export default function EventDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [event,          setEvent]          = useState(null);
  const [loading,        setLoading]        = useState(true);
  const [isModalOpen,    setIsModalOpen]    = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

  const isUpcoming = new Date(event.date) >= new Date();

  return (
    <div className="bg-bg-main text-text-main min-h-screen relative overflow-hidden">

      {/* ── Ambient glows ── */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/8 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-accent-rose/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* ── Hero Banner ── */}
      <div
        className="relative h-[60vh] min-h-[380px] bg-cover bg-center flex items-end overflow-hidden"
        style={{ backgroundImage: `url(${event.banner || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800'})` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/60 to-bg-main/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-main/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-8 pb-12 z-10 space-y-4">
          {/* Back link */}
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent-secondary text-xs font-semibold uppercase tracking-wider transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Events
          </Link>

          {/* Status + Category */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge-pill">
              {event.category || 'Special Edition'}
            </span>
            <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border
              ${isUpcoming
                ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'
                : 'bg-bg-card/80 border-border-color text-text-muted'
              }`}>
              {isUpcoming ? '🟢 Upcoming Event' : '✓ Past Event'}
            </span>
          </div>

          {/* Event Title */}
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-text-main leading-tight max-w-4xl">
            {event.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-5 text-sm text-text-muted">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-accent-gold" />
              {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-accent-rose" />
              {event.location}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10 pb-20">

        {/* ── Left (2-col): Overview + Video + Timeline ── */}
        <div className="lg:col-span-2 space-y-8">

          {/* Overview */}
          <section className="bg-bg-surface border border-border-color rounded-2xl p-7 space-y-4">
            <h2 className="font-display text-xl text-text-main flex items-center gap-2 pb-3 border-b border-border-color/60">
              <FileText className="w-5 h-5 text-accent-secondary" />
              Event Overview
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              {event.fullDescription || event.description}
            </p>
          </section>

          {/* Video */}
          {event.videoUrl && (
            <section className="space-y-3">
              <h2 className="font-display text-xl text-text-main flex items-center gap-2 pb-3 border-b border-border-color/60">
                <Film className="w-5 h-5 text-accent-secondary" />
                Production Highlight
              </h2>
              <div className="aspect-video rounded-2xl overflow-hidden border border-border-color bg-bg-surface relative group shadow-2xl shadow-bg-main/60">
                {!isVideoPlaying ? (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 cursor-pointer select-none"
                    onClick={() => setIsVideoPlaying(true)}
                  >
                    <img
                      src={event.videoThumbnail || event.banner}
                      alt="Video preview"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-main/60 to-transparent" />
                    <div className="bg-accent-primary hover:bg-accent-secondary border border-white/20 p-5 rounded-full text-white shadow-2xl shadow-accent-primary/40 z-20 group-hover:scale-110 transition-all">
                      <Play className="w-7 h-7 fill-white text-white ml-0.5" />
                    </div>
                    <span className="text-[10px] text-accent-gold uppercase tracking-[3px] font-bold mt-4 z-20 drop-shadow">
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
            <section className="bg-bg-surface border border-border-color rounded-2xl p-7">
              <h2 className="font-display text-xl text-text-main flex items-center gap-2 pb-3 mb-6 border-b border-border-color/60">
                <Clock className="w-5 h-5 text-accent-secondary" />
                Event Timeline
              </h2>
              <div className="space-y-5 relative before:absolute before:left-[18px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-accent-primary before:via-accent-secondary/50 before:to-transparent">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-5 relative">
                    <div className="w-9 h-9 bg-accent-primary/20 border-2 border-accent-primary rounded-full flex items-center justify-center text-xs font-bold text-accent-secondary z-10 shrink-0">
                      {idx + 1}
                    </div>
                    <div className="pt-1">
                      <span className="text-xs text-accent-gold font-semibold block">{item.time}</span>
                      <h4 className="text-sm font-semibold text-text-main mt-0.5">{item.title}</h4>
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
          <div className="bg-bg-surface border border-border-color rounded-2xl p-6 space-y-5">
            <h3 className="font-display text-lg text-text-main flex items-center gap-2 pb-3 border-b border-border-color/60">
              <Info className="w-5 h-5 text-accent-secondary" />
              Venue & Details
            </h3>

            {event.venueDetails && (
              <div className="space-y-1">
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">Location Details</span>
                <p className="text-sm text-text-main leading-relaxed">{event.venueDetails}</p>
              </div>
            )}

            {event.participationInfo && (
              <div className="space-y-1 pt-4 border-t border-border-color/50">
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">Participation</span>
                <p className="text-sm text-text-main leading-relaxed">{event.participationInfo}</p>
              </div>
            )}
          </div>

          {/* Registration CTA */}
          <div className="relative bg-gradient-to-br from-accent-primary/20 to-bg-surface border border-accent-primary/30 rounded-2xl p-6 overflow-hidden shadow-xl shadow-accent-primary/10">
            {/* Decorative glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-primary/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent-rose/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-accent-gold" />
                <h3 className="font-display text-lg text-text-main">Secure Your Spot</h3>
              </div>

              {/* Price display */}
              {event.price != null && event.price > 0 ? (
                <div className="flex items-center justify-between bg-bg-main/40 border border-accent-gold/20 rounded-xl px-4 py-2.5">
                  <span className="text-xs text-text-muted">Price per seat</span>
                  <span className="text-accent-gold font-black text-lg">₹{event.price.toFixed(2)}</span>
                </div>
              ) : (
                <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl px-4 py-2.5 text-xs text-emerald-400 font-semibold text-center">
                  🎟 Free Entry Event
                </div>
              )}

              <p className="text-xs text-text-muted leading-relaxed">
                Reserve your entry to this exclusive VSI experience. Limited seats available — don't miss out.
              </p>

              <button
                id="register-event-btn"
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold rounded-xl
                  hover:shadow-lg hover:shadow-accent-primary/40 hover:-translate-y-0.5 transition-all
                  flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                Register Now <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-text-muted text-center">
                {event.price > 0 ? 'Secure Razorpay payment · Limited availability' : 'Free registration · Limited availability'}
              </p>
            </div>
          </div>

          {/* Quick nav back */}
          <Link
            to="/events"
            className="flex items-center justify-center gap-2 py-3 px-5 bg-bg-card border border-border-color
              hover:border-accent-primary/40 rounded-xl text-xs font-semibold text-text-muted hover:text-text-main
              transition-all cursor-pointer"
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
