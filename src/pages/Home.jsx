import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, Zap, MapPin, Calendar, Star,
  ChevronRight, CalendarDays, Sparkles, Users, Award, Clock
} from 'lucide-react';
import { api } from '../utils/api';

/* ── Static Data ── */
const PORTFOLIO_ITEMS = [
  {
    id: 'music-festivals',
    title: 'Music Festivals & DJ Sets',
    desc: 'Immersive electronic stage rigs, high-intensity laser lineups, and massive structural audio design.',
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000',
    tag: '🎵 Concerts'
  },
  {
    id: 'gala-awards',
    title: 'Gala Awards & Red Carpets',
    desc: 'Cinematic grand ballroom configurations, custom stage backdrops, and elite presentation management.',
    img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1000',
    tag: '🏆 Corporate'
  },
  {
    id: 'bespoke-celebrations',
    title: 'Bespoke Premium Celebrations',
    desc: 'Neon-infused milestone transformations, luxury weddings, and conceptual themes for the extraordinary.',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000',
    tag: '💎 Private'
  }
];

const GALLERY_ITEMS = [
  { src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800', title: 'Live DJ Stages' },
  { src: 'https://images.unsplash.com/photo-1489641493513-ba4ee84ccea9?w=800', title: 'Gala Accolades' },
  { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', title: 'Laser Illumination' },
  { src: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800', title: 'Crowd Capture' }
];

// UPCOMING_EVENTS is now loaded dynamically from the backend API

const SERVICES = [
  {
    id: 'event-management',
    num: '01',
    icon: '💼',
    title: 'Event Management',
    desc: 'End-to-end planning, execution, and coordination for premium corporate, brand and educational events.'
  },
  {
    id: 'college-educational',
    num: '02',
    icon: '🎓',
    title: 'College & Educational Events',
    desc: 'High-energy cultural fests, academic symposiums, tech expos, convocations, and student events.'
  },
  {
    id: 'cultural-programs',
    num: '03',
    icon: '🎭',
    title: 'Cultural Programs',
    desc: 'Grand traditional dance, music, stage plays, and community heritage festivals with specialized acoustics.'
  },
  {
    id: 'wedding-planning',
    num: '04',
    icon: '💍',
    title: 'Wedding Planning & Management',
    desc: 'Immersive, luxurious wedding designs, destination logistics, and seamless on-site day coordination.'
  },
  {
    id: 'birthday-celebrations',
    num: '05',
    icon: '🎉',
    title: 'Birthday & Private Celebrations',
    desc: 'Custom-tailored themes, milestone birthday celebrations, anniversaries, and high-styling private dinners.'
  },
  {
    id: 'event-logistics',
    num: '06',
    icon: '🚚',
    title: 'Event Coordination & Logistics',
    desc: 'Precise crew management, vendor scheduling, permit filings, crowd management and security tracking.'
  },
  {
    id: 'media-production',
    num: '07',
    icon: '📹',
    title: 'Media Production',
    desc: 'High-fidelity event photography, cinematic drone assets, commercials, and professional live-action video.'
  },
  {
    id: 'creative-services',
    num: '08',
    icon: '🎨',
    title: 'Creative Services',
    desc: 'Event branding, stage LED motion graphics, social creatives, logos, brochures, and dynamic animations.'
  },
  {
    id: 'digital-marketing',
    num: '09',
    icon: '📣',
    title: 'Digital Marketing',
    desc: 'Strategic social media management, Google PPC campaigns, content copy, SEO, and ticket promotion.'
  },
  {
    id: 'event-production',
    num: '10',
    icon: '🎪',
    title: 'Event Production',
    desc: 'Heavy stage design, pixel-pitch LED wall solutions, concert-grade audio setup, and premium trussing rigs.'
  },
  {
    id: 'talent-entertainment',
    num: '11',
    icon: '🌟',
    title: 'Talent & Entertainment',
    desc: 'Direct booking liaison for celebrity appearances, live acoustic bands, professional hosts, and DJs.'
  },
  {
    id: 'equipment-rental',
    num: '12',
    icon: '⚙️',
    title: 'Equipment Rental',
    desc: 'Rent professional line-array sound systems, LED screens, projectors, and stage lights on demand.'
  }
];

const REVIEWS = [
  {
    stars: 5,
    text: 'Exceptional engineering across the sound design stage. The film delivery speed was impressive.',
    client: 'Music Festival Director',
    avatar: '🎵'
  },
  {
    stars: 5,
    text: 'Highly professional execution crew. Took our event media project requirements and elevated them effortlessly.',
    client: 'Corporate Communications Lead',
    avatar: '🏆'
  }
];

/* ── Helpers ── */
const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function parseDateParts(dateStr) {
  // dateStr is YYYY-MM-DD from backend
  const parts = dateStr ? dateStr.split('-') : [];
  if (parts.length === 3) {
    const day = parts[2];                         // "24"
    const month = MONTH_ABBR[parseInt(parts[1], 10) - 1]; // "Jul"
    return { day, month };
  }
  return { day: '--', month: '---' };
}

const CATEGORY_BADGES = {
  concert: '🎵 DJ & Stage Setup',
  gala:    '🏆 Corporate Gala',
  private: '💎 Bespoke Private',
  showcase: '🚀 Product Launch',
};

/* ── Component ── */
export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', domain: '', message: '' });
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const all = await api.getEvents();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const upcoming = all
          .filter(e => new Date(e.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3); // show max 3 upcoming on home
        setUpcomingEvents(upcoming);
      } catch (err) {
        console.error('Failed to load upcoming events:', err);
      } finally {
        setEventsLoading(false);
      }
    };
    fetchUpcoming();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your project brief for "${formData.domain || 'Event Production'}" has been sent. We'll connect via ${formData.email} shortly.`);
    setFormData({ name: '', email: '', phone: '', domain: '', message: '' });
  };

  return (
    <div className="bg-bg-main text-text-main relative overflow-hidden">

      {/* ── Global Ambient Glows ── */}
      <div className="fixed top-[10vh] right-[8%]  w-[500px] h-[500px] bg-accent-primary/8 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed top-[60vh] left-[5%]   w-[400px] h-[400px] bg-accent-rose/5   rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-[130vh] right-[15%] w-[450px] h-[450px] bg-accent-gold/4  rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section
        className="min-h-screen relative flex items-center px-6 md:px-[8%] pt-28 pb-16 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(9,8,15,0.55), #09080f 92%), url("https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1800")`
        }}
      >
        {/* Radial spotlights */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(124,58,237,0.2),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(236,72,153,0.08),transparent_60%)] pointer-events-none" />

        <div className="relative max-w-5xl z-10 space-y-7">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-accent-secondary uppercase tracking-[4px]">
              <Sparkles className="w-3.5 h-3.5 text-accent-primary animate-pulse" />
              Crafting Experiences · Building Brands
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-text-main leading-[1.02]">
            <span className='lobster'>Creating Memories.</span><br />
            <span className="text-shine-grad"><span className='lobster'>Capturing Milestones.</span></span>
          </h1>

          {/* Sub */}
          <p className="text-text-muted text-base md:text-xl max-w-2xl leading-relaxed font-light">
            High-end event management, premium multi-camera cinema coverage, and production excellence engineered to preserve life's grandest spectacles.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-6 py-2">
            {[
              { icon: CalendarDays, value: '150+', label: 'Events Managed' },
              { icon: Users,        value: '50k+', label: 'Guests Served'  },
              { icon: Award,        value: '100%', label: 'Client Satisfaction' }
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm">
                <Icon className="w-4 h-4 text-accent-gold" />
                <span className="font-display text-text-main text-base">{value}</span>
                <span className="text-text-muted text-xs">{label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary
                text-white font-semibold rounded-xl border border-white/10
                hover:shadow-xl hover:shadow-accent-primary/35 hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
            >
              Explore Portfolio <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-border-color
                text-text-main hover:text-accent-secondary hover:border-accent-primary/50 font-semibold rounded-xl
                backdrop-blur-md hover:bg-white/8 transition-all text-sm cursor-pointer"
            >
              Book Your Event
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-muted/50 animate-bounce">
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-accent-primary/60 mx-auto" />
          <span className="text-[9px] uppercase tracking-[3px]">Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT / STATS
      ══════════════════════════════════════════ */}
      <section id="about" className="py-24 px-6 md:px-[8%]">
        <div className="bg-gradient-to-br from-bg-surface to-bg-card border border-border-color rounded-3xl p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs text-accent-secondary font-semibold uppercase tracking-[4px]">Who We Are</span>
            <h2 className="font-display text-3xl md:text-4xl text-text-main leading-tight">
              We turn large-scale concepts into flawless, elite realities.
            </h2>
            <p className="text-text-muted text-sm md:text-base leading-relaxed">
              VSI Creations operates as a premium, multi-disciplinary entertainment and production house. From pristine gala award ceremonies to explosive multi-stage music festivals and luxury wedding visual stories — our crew coordinates aesthetics, sound design, high-end illumination, and world-class cinematography with absolute elite execution.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-accent-secondary font-semibold hover:text-accent-gold transition-colors"
            >
              View Our Services <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {[
              { val: '150+', label: 'Events Managed',       icon: CalendarDays },
              { val: '100%', label: 'Client Satisfaction',  icon: Star         },
              { val: '10+',  label: 'Years of Excellence',  icon: Award        },
              { val: '50k+', label: 'Guests Delighted',     icon: Users        }
            ].map(({ val, label, icon: Icon }) => (
              <div key={label} className="bg-bg-main/50 border border-border-color p-6 rounded-2xl text-center hover:border-accent-primary/50 transition-colors group">
                <Icon className="w-5 h-5 text-accent-secondary mx-auto mb-2 group-hover:text-accent-gold transition-colors" />
                <span className="font-display text-3xl text-accent-gold block">{val}</span>
                <span className="text-[11px] text-text-muted font-medium uppercase tracking-wide block mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PORTFOLIO
      ══════════════════════════════════════════ */}
      <section id="portfolio" className="py-24 px-6 md:px-[8%] border-t border-border-color/40">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
          <div>
            <span className="text-xs text-accent-secondary font-semibold uppercase tracking-[4px]">Our Portfolio</span>
            <h2 className="font-display text-3xl md:text-4xl text-text-main mt-2">Featured Highlights</h2>
          </div>
          <Link to="/gallery" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-secondary transition-colors font-medium">
            View Full Gallery <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {PORTFOLIO_ITEMS.map(project => (
            <Link
              key={project.id}
              to={`/portfolio/${project.id}`}
              className="bg-bg-card border border-border-color rounded-2xl overflow-hidden
                hover:border-accent-primary/45 hover:-translate-y-2
                hover:shadow-2xl hover:shadow-accent-primary/12 transition-all duration-300 group flex flex-col"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 to-transparent" />
                <span className="absolute top-3 left-3 badge-pill">{project.tag}</span>
                <div className="absolute top-3 right-3 bg-bg-main/80 backdrop-blur-md p-2 rounded-full border border-border-color text-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-display text-lg text-text-main group-hover:text-accent-secondary transition-colors">{project.title}</h3>
                <p className="text-sm text-text-muted mt-2 leading-relaxed flex-grow">{project.desc}</p>
                <div className="flex items-center gap-1 text-xs text-accent-secondary font-semibold uppercase tracking-wider mt-5">
                  View Project <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GALLERY PREVIEW
      ══════════════════════════════════════════ */}
      <section id="gallery" className="py-24 px-6 md:px-[8%] border-t border-border-color/40 bg-bg-surface/20">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
          <div>
            <span className="text-xs text-accent-secondary font-semibold uppercase tracking-[4px]">Snapshots</span>
            <h2 className="font-display text-3xl md:text-4xl text-text-main mt-2">Media Gallery</h2>
          </div>
          <Link to="/gallery" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-secondary transition-colors font-medium">
            Full Gallery <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_ITEMS.map((item, idx) => (
            <Link
              key={idx}
              to="/gallery"
              className={`rounded-2xl overflow-hidden border border-border-color relative group cursor-pointer
                ${idx === 0 ? 'md:col-span-2 md:row-span-2 h-56 md:h-auto' : 'h-44'}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-main/80 via-accent-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                <span className="font-display text-sm text-text-main">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          UPCOMING EVENTS
      ══════════════════════════════════════════ */}
      <section id="upcoming-events" className="py-24 px-6 md:px-[8%] border-t border-border-color/40">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
          <div>
            <span className="text-xs text-accent-secondary font-semibold uppercase tracking-[4px]">Schedule</span>
            <h2 className="font-display text-3xl md:text-4xl text-text-main mt-2">Upcoming Experiences</h2>
          </div>
          <Link to="/events" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-secondary transition-colors font-medium">
            All Events <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          {eventsLoading ? (
            /* Skeleton loaders while events are fetching */
            [1, 2, 3].map(n => (
              <div key={n} className="bg-bg-card border border-border-color border-l-4 border-l-accent-primary/30 rounded-2xl p-5 md:p-7 animate-pulse flex gap-6 items-center">
                <div className="w-14 h-14 bg-bg-surface rounded-xl shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-bg-surface rounded w-2/3" />
                  <div className="h-3 bg-bg-surface rounded w-1/2" />
                </div>
                <div className="w-28 h-9 bg-bg-surface rounded-xl shrink-0" />
              </div>
            ))
          ) : upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => {
              const { day, month } = parseDateParts(event.date);
              const badge = CATEGORY_BADGES[event.category] || `📅 ${event.category}`;
              return (
                <div
                  key={event.id}
                  className="bg-bg-card border border-border-color border-l-4 border-l-accent-primary rounded-2xl p-5 md:p-7
                    grid grid-cols-1 md:grid-cols-12 items-center gap-5
                    hover:border-l-accent-secondary hover:shadow-xl hover:shadow-accent-primary/8
                    hover:scale-[1.005] transition-all group"
                >
                  {/* Date block */}
                  <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-3 md:gap-0">
                    <span className="font-display text-4xl text-accent-gold leading-none">{day}</span>
                    <span className="text-xs text-text-muted font-semibold uppercase tracking-wider md:mt-1">{month}</span>
                  </div>

                  {/* Info */}
                  <div className="md:col-span-7 space-y-2">
                    <h3 className="font-display text-lg text-text-main group-hover:text-accent-secondary transition-colors">{event.title}</h3>
                    <p className="text-xs md:text-sm text-text-muted">{event.description}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="badge-pill">{badge}</span>
                      {event.price != null && (
                        <span className="text-[11px] font-bold text-accent-gold bg-accent-gold/10 border border-accent-gold/30 px-2.5 py-0.5 rounded-full">
                          ₹{event.price.toFixed(2)} / seat
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA — links to event detail with ?register=true to auto-open modal */}
                  <div className="md:col-span-3 md:text-right">
                    <Link
                      to={`/events/${event.id}?register=true`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider
                        bg-accent-primary/15 border border-accent-primary/35 text-accent-secondary rounded-xl
                        hover:bg-accent-primary hover:border-accent-primary hover:text-white transition-all cursor-pointer"
                    >
                      <CalendarDays className="w-3.5 h-3.5" />
                      Reserve Spot
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-bg-surface border border-border-color rounded-2xl">
              <Clock className="w-8 h-8 text-accent-primary mx-auto mb-3 animate-pulse" />
              <p className="text-sm text-text-muted">No upcoming events scheduled. Check back soon.</p>
              <Link to="/events" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent-secondary hover:text-accent-gold transition-colors">
                View All Events <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section id="services" className="py-24 px-6 md:px-[8%] border-t border-border-color/40 bg-bg-surface/15">
        <div className="mb-12">
          <span className="text-xs text-accent-secondary font-semibold uppercase tracking-[4px]">Capabilities</span>
          <h2 className="font-display text-3xl md:text-4xl text-text-main mt-2">Production Ecosystem</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {SERVICES.map(service => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="bg-bg-card border border-border-color rounded-2xl p-8 flex flex-col justify-between
                hover:border-accent-primary/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-primary/12
                transition-all group text-left"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{service.icon}</span>
                  <span className="font-display text-4xl text-border-color group-hover:text-accent-primary/20 transition-colors">{service.num}</span>
                </div>
                <h3 className="font-display text-xl text-text-main group-hover:text-accent-secondary transition-colors">{service.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{service.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-accent-secondary font-semibold uppercase tracking-wider mt-7">
                Learn More <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          REVIEWS
      ══════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-[8%] border-t border-border-color/40">
        <div className="mb-12">
          <span className="text-xs text-accent-secondary font-semibold uppercase tracking-[4px]">Testimonials</span>
          <h2 className="font-display text-3xl md:text-4xl text-text-main mt-2">Client Reviews</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {REVIEWS.map((review, idx) => (
            <div key={idx} className="bg-bg-card border border-border-color rounded-2xl p-8 space-y-4 relative overflow-hidden group hover:border-accent-primary/40 transition-colors">
              <div className="absolute -top-4 -right-4 text-8xl opacity-[0.04] select-none">{review.avatar}</div>
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(review.stars)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                ))}
              </div>
              <p className="text-base text-text-main italic leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xl">{review.avatar}</span>
                <span className="text-xs text-text-muted uppercase font-semibold tracking-wider">{review.client}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT FORM
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-24 px-6 md:px-[8%] border-t border-border-color/40 bg-bg-surface/10">
        <div className="max-w-3xl mx-auto bg-bg-surface border border-border-color rounded-3xl p-8 md:p-14 relative overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/8 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-rose/6 rounded-full blur-[60px] pointer-events-none" />

          <div className="text-center max-w-xl mx-auto mb-10 space-y-2 relative z-10">
            <span className="text-xs text-accent-secondary font-semibold uppercase tracking-[4px]">Inquire Now</span>
            <h2 className="font-display text-3xl md:text-4xl text-text-main">Start Your Project</h2>
            <p className="text-sm text-text-muted">Fill out the form below to secure VSI engineering and camera assets for your event.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text" name="name" placeholder="Your Name"
                value={formData.name} onChange={handleInputChange} required
                className="w-full bg-bg-main border border-border-color text-sm text-text-main px-5 py-4 rounded-xl transition-all placeholder-text-muted/60"
              />
              <input
                type="email" name="email" placeholder="Email Address"
                value={formData.email} onChange={handleInputChange} required
                className="w-full bg-bg-main border border-border-color text-sm text-text-main px-5 py-4 rounded-xl transition-all placeholder-text-muted/60"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="tel" name="phone" placeholder="Phone Number"
                value={formData.phone} onChange={handleInputChange}
                className="w-full bg-bg-main border border-border-color text-sm text-text-main px-5 py-4 rounded-xl transition-all placeholder-text-muted/60"
              />
              <input
                type="text" name="domain" placeholder="Event Type (e.g., Gala, DJ Festival)"
                value={formData.domain} onChange={handleInputChange}
                className="w-full bg-bg-main border border-border-color text-sm text-text-main px-5 py-4 rounded-xl transition-all placeholder-text-muted/60"
              />
            </div>
            <textarea
              rows="5" name="message" placeholder="Tell us about your event vision and requirements…"
              value={formData.message} onChange={handleInputChange} required
              className="w-full bg-bg-main border border-border-color text-sm text-text-main px-5 py-4 rounded-xl transition-all placeholder-text-muted/60 resize-none"
            />
            <button
              type="submit"
              id="contact-submit"
              className="w-full py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold rounded-xl
                hover:shadow-xl hover:shadow-accent-primary/40 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider cursor-pointer"
            >
              Send Project Brief ✉️
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
