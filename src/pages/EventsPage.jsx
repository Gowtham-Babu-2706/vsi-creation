import React, { useState, useEffect } from 'react';
import {
  Sparkles, Calendar, MapPin, Phone, Mail, Trophy, Star, Crown,
  ChevronDown, ChevronUp, ArrowRight, Users, ExternalLink, Check
} from 'lucide-react';
import { api } from '../utils/api';
import EventCard from '../components/EventCard';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

/* ─── Static CYRA Awards Event (no database required) ─── */
const CYRA_EVENT = {
  id: 'cyra-awards-2026',
  title: 'CYRA AWARDS 2026',
  subtitle: "Tamil Nadu's Biggest Influencers Thiruvizha",
  date: '2026-08-16',
  location: 'Chennai, Tamil Nadu',
  contact: { phone: '9150651872', email: 'vsicreations.41@gmail.com' },
  about:
    'CYRA Awards is a prestigious platform dedicated to recognizing, celebrating, and honouring Influencers, Content Creators, YouTubers, Artists, Entertainers, Entrepreneurs, Educators and Digital Personalities who inspire and create impact through the power of social media.',
  formUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSeISAtJjv-c-nyNpLS6UQm91wK8evftJ6re-4VJLQW0lApW_A/viewform?usp=send_form',
  payment: { upi: '9043500595' },
  tiers: [
    {
      name: 'Platinum Star Award',
      price: '₹7,000',
      gradFrom: '#94a3b8',
      gradTo: '#e2e8f0',
      borderColor: '#cbd5e1',
      icon: '💎',
      perks: [
        'Premium front-row seating',
        'Personalised trophy + certificate',
        'Full-event professional promotion',
        'Social media spotlight feature',
        'Exclusive backstage access',
        'Priority media coverage',
      ],
    },
    {
      name: 'Diamond Star Award',
      price: '₹5,000',
      gradFrom: '#67e8f9',
      gradTo: '#a5f3fc',
      borderColor: '#22d3ee',
      icon: '🏆',
      perks: [
        'Reserved premium seating',
        'Award trophy + certificate',
        'Social media promotion',
        'Media coverage feature',
        'Event programme listing',
      ],
    },
    {
      name: 'Golden Star Award',
      price: '₹3,000',
      gradFrom: '#fde68a',
      gradTo: '#fbbf24',
      borderColor: '#f59e0b',
      icon: '⭐',
      perks: [
        'Standard event seating',
        'Award trophy + certificate',
        'Event programme listing',
        'Basic social media mention',
      ],
    },
  ],
  categories: [
    '⭐ Best Influencer of the Year',
    '🎬 Best Content Creator',
    '📱 Best Reel Creator',
    '🎭 Best Actor Influencer',
    '🎤 Best Singer Influencer',
    '💃 Best Dancer Influencer',
    '😂 Best Comedy Creator',
    '🎙️ Best Entertainer of the Year',
    '💕 Best Couple Creator of the Year',
    '👩‍👧 Best Mother & Child Creator of the Year',
    '🌍 Social Impact Award',
    '👑 Digital Icon Award',
    '🏆 Creator of the Year',
    '🎓 Pride of Montessori Training School',
    '🎬 Pride of Actor / Actress',
    '👫 Pride of Couple Influencer / Celebrity',
    '👨‍👩‍👧 Pride of Family Entertainer',
    '📹 Pride of Content Creator',
    '🔍 Pride of Scoop Creator',
    '🔥 Pride of Trending',
    '🌐 Pride of World Record Holder',
    '🎯 Pride of Multitasker',
  ],
};

/* ─── Countdown Timer ─── */
function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
      {[
        { label: 'Days', val: timeLeft.days },
        { label: 'Hours', val: timeLeft.hours },
        { label: 'Minutes', val: timeLeft.minutes },
        { label: 'Seconds', val: timeLeft.seconds },
      ].map(({ label, val }) => (
        <div
          key={label}
          className="flex flex-col items-center bg-white/90 backdrop-blur border border-border-color/40 rounded-2xl px-4 py-3 min-w-[66px] shadow-sm"
        >
          <span className="text-2xl md:text-3xl font-extrabold font-display text-accent-primary tabular-nums">
            {String(val).padStart(2, '0')}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted mt-0.5">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Main EventsPage ─── */
export default function EventsPage() {
  useDocumentMetadata(
    'Upcoming Events & Experiences',
    'Stay updated on spectacular live experiences, concerts, summits, and festivals organized by VSI Creations. Reserve your spot today.'
  );

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
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
    <div className="bg-bg-main text-text-main min-h-screen pt-24 pb-20 relative">
      {/* Background spotlights */}
      <div className="absolute top-[5vh] left-[5%] w-96 h-96 bg-accent-primary/8 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[40vh] right-[10%] w-[450px] h-[450px] bg-yellow-300/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[80vh] left-[30%] w-80 h-80 bg-accent-rose/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-20">

        {/* ── Page Header ── */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs text-accent-primary font-bold uppercase tracking-[4px] flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Staging the Spectacle
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight font-display">
            Upcoming Experiences
          </h1>
          <p className="text-sm md:text-base text-text-muted leading-relaxed font-light">
            Discover our curated lineup of high-fidelity music festivals, corporate galas, and bespoke private events engineered for visual storytelling.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════
            CYRA AWARDS 2026 — FEATURED UPCOMING EVENT
        ══════════════════════════════════════════════════════ */}
        <div className="relative rounded-[32px] overflow-hidden border border-accent-primary/20 shadow-2xl shadow-accent-primary/10">

          {/* ── Hero Banner ── */}
          <div className="relative h-72 md:h-96 bg-cover bg-center" style={{ backgroundImage: `url(https://res.cloudinary.com/dfjsh2zel/image/upload/f_auto/q_auto/cyrawebsitebanner_lli1x6.png)` }}>
            {/* Star particles */}
            {[...Array(18)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/25 animate-pulse"
                style={{
                  width: `${(i % 3) + 2}px`,
                  height: `${(i % 3) + 2}px`,
                  top: `${(i * 17 + 7) % 95}%`,
                  left: `${(i * 23 + 5) % 95}%`,
                  animationDelay: `${(i * 0.3) % 3}s`,
                  animationDuration: `${2 + (i % 3)}s`,
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

            {/* Upcoming badge */}
            <div className="absolute top-5 left-5 flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-md rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest">
                Upcoming Event
              </span>
            </div>

            {/* Date badge */}
            <div className="absolute top-5 right-5 bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-4 py-2 text-center">
              <p className="text-white text-[10px] font-bold uppercase tracking-widest opacity-70">Event Date</p>
              <p className="text-white font-extrabold text-base font-display">16 Aug 2026</p>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-amber-300 text-xs font-bold uppercase tracking-[4px] mb-2">
                🌟 VSI Creations Presents
              </p>
              <h2 className="text-white font-display font-black text-3xl md:text-5xl tracking-tight leading-tight drop-shadow-lg">
                CYRA AWARDS 2026
              </h2>
              <p className="text-white/70 text-sm md:text-base mt-1 font-light">
                Tamil Nadu's Biggest Influencers Thiruvizha
              </p>
            </div>
          </div>

          {/* ── Event Body ── */}
          <div className="bg-white/98 backdrop-blur">

            {/* Quick Info Bar */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 px-6 md:px-10 py-5 border-b border-border-color/40 bg-bg-surface/50">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-accent-primary" />
                <span className="font-semibold text-black">16 August 2026</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-accent-rose" />
                <span className="font-semibold text-black">Chennai, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-accent-primary" />
                <a href={`mailto:${CYRA_EVENT.contact.email}`} className="font-semibold text-black hover:text-accent-primary transition-colors">
                  {CYRA_EVENT.contact.email}
                </a>
              </div>
            </div>

            {/* About + Countdown */}
            <div className="px-6 md:px-10 py-8 grid md:grid-cols-2 gap-10 items-start">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent-primary" />
                  <h3 className="font-display font-bold text-xl text-black">About CYRA Awards</h3>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">{CYRA_EVENT.about}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="badge-pill"><Users className="w-3 h-3" /> Influencers</span>
                  <span className="badge-pill"><Star className="w-3 h-3" /> Creators</span>
                  <span className="badge-pill"><Crown className="w-3 h-3" /> Icons</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-5 bg-bg-surface/60 rounded-2xl p-6 border border-border-color/40">
                <p className="text-xs font-bold uppercase tracking-[3px] text-accent-primary flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Event Starts In
                </p>
                <Countdown targetDate={CYRA_EVENT.date} />
                <a
                  href={CYRA_EVENT.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 w-full flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-secondary text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-accent-primary/25 hover:shadow-accent-secondary/30 hover:-translate-y-0.5 text-sm tracking-wide"
                >
                  Register Now <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>


            {/* Award Categories (collapsible) */}
            <div className="px-6 md:px-10 pb-10">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="w-full flex items-center justify-between bg-bg-surface border border-border-color/50 rounded-2xl px-6 py-4 hover:border-accent-primary/40 transition-colors group"
              >
                <span className="font-display font-bold text-black flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent-primary" />
                  Award Categories ({CYRA_EVENT.categories.length})
                </span>
                {showCategories
                  ? <ChevronUp className="w-5 h-5 text-text-muted group-hover:text-accent-primary transition-colors" />
                  : <ChevronDown className="w-5 h-5 text-text-muted group-hover:text-accent-primary transition-colors" />
                }
              </button>

              {showCategories && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {CYRA_EVENT.categories.map((cat) => (
                    <div
                      key={cat}
                      className="flex items-center gap-2 bg-bg-surface/80 border border-border-color/40 rounded-xl px-4 py-2.5 text-xs font-medium text-text-muted hover:border-accent-primary/30 hover:text-black transition-all"
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Footer Strip */}
            <div className="px-6 md:px-10 pb-8">
              <div
                className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
                style={{ background: 'linear-gradient(135deg, #4a0011 0%, #7f1d1d 40%, #78350f 100%)' }}
              >
                <div>
                  <p className="text-amber-300 text-xs font-bold uppercase tracking-[3px] mb-1">Don't Miss Out!</p>
                  <h4 className="text-white font-display font-extrabold text-xl md:text-2xl">
                    Secure Your Spot at CYRA Awards 2026
                  </h4>
                  <p className="text-white/60 text-xs mt-1">
                    16 August 2026 · Chennai · Limited Seats Available
                  </p>
                </div>
                <a
                  href={CYRA_EVENT.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center gap-2 bg-white hover:bg-amber-50 text-accent-primary font-extrabold py-3.5 px-8 rounded-2xl transition-all shadow-xl hover:-translate-y-0.5 text-sm tracking-wide"
                >
                  Register Now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ── Other Events from Backend ── */}
        <div className="space-y-8">
          <div className="text-center md:text-left max-w-2xl space-y-2">
            <span className="text-xs text-accent-primary font-bold uppercase tracking-[4px] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> More Events
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight font-display">
              All Events
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-bg-card/30 border border-border-color rounded-3xl h-[420px] animate-pulse flex flex-col justify-between p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="h-44 bg-bg-surface rounded-2xl w-full" />
                    <div className="h-4 bg-bg-surface rounded-md w-1/3" />
                    <div className="h-6 bg-bg-surface rounded-md w-3/4" />
                    <div className="h-4 bg-bg-surface rounded-md w-full" />
                  </div>
                  <div className="h-8 bg-bg-surface rounded-md w-1/2" />
                </div>
              ))}
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id} className="event-card-anim">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-text-muted text-sm font-light">
              <Sparkles className="w-8 h-8 mx-auto mb-3 text-accent-primary/40" />
              More events coming soon. Stay tuned!
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
