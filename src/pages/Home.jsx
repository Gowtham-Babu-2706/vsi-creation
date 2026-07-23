import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, Zap, MapPin, Calendar, Star,
  ChevronRight, CalendarDays, Sparkles, Users, Award, Clock,
  Briefcase, Trophy, Music, Medal, HeartHandshake, Megaphone,
  Rocket, Building2, Heart, Lightbulb, Camera, HelpCircle
} from 'lucide-react';
import { api } from '../utils/api';
import { SERVICES } from '../utils/servicesData';
import { useGSAP, useMagnetic, SplitText } from '../hooks/useGSAP';
import gsap from 'gsap';
import TestimonialSection from '../components/TestimonialSection';
import ContactPage from './ContactPage';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

const LucideIcons = {
  Briefcase, Trophy, Star, Music, Medal, HeartHandshake, Megaphone,
  Rocket, Building2, Heart, Lightbulb, Camera, HelpCircle
};

/* ── Static Data ── */
const PORTFOLIO_ITEMS = [
  {
    id: 'awards-functions',
    title: 'Awards Functions',
    desc: 'End-to-end planning and execution of award ceremonies with premium stage production, lighting, audiovisual systems, and seamless event coordination.',
    img:'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/kamala.png',
    tag: '🏆 Awards Function'
  },
  {
    id: 'sports-events',
    title: 'Sports Events',
    desc: 'Professional management of sports tournaments, marathons, leagues, and stadium events with complete production and logistics support.',
    img: 'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/VSI/images.jpg',
    tag: '🏅 Sports Event'
  },
  {
    id: 'music-festivals',
    title: 'Music Concerts',
    desc: 'Large-scale music festivals featuring world-class stage production, immersive lighting, premium sound systems, and audience engagement.',
    img: 'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/Music+Concert/3.jpg',
    tag: '🎵 Music Festival'
  },
  {
    id: 'concert-shows',
    title: 'Arena Concert',
    desc: 'High-energy concert production with custom staging, advanced lighting, live sound engineering, and crowd management.',
    img: 'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/Music+Concert/2.png',
    tag: '🎤 Concert Shows'
  },
  {
    id: 'celebrity-management',
    title: 'Celebrity Management',
    desc: 'Complete celebrity engagement services, artist coordination, hospitality, logistics, and on-ground management.',
    img: 'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/Celebrity+management/1.png',
    tag: '⭐ Celebrity Management'
  },
  {
    id: 'csr-projects',
    title: ' CSR Projects',
    desc: 'Strategic planning and execution of Corporate Social Responsibility programs that create meaningful community impact.',
    img: 'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/CSRprojects/2.jpg',
    tag: '🌱 CSR Projects'
  },
  {
    id: 'corporate-projects',
    title: 'Corporate Events & Summits',
    desc: 'Professional conferences, product launches, annual meetings, leadership summits, and corporate event production.',
    img: 'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/CE%26S/1.jpg',
    tag: '💼 Corporate'
  },
  {
    id: 'awareness-projects',
    title: 'Social Awareness Campaigns',
    desc: 'Creative campaigns and public engagement initiatives designed to promote social causes and drive positive community action.',
    img: 'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/SAC/4.jpg',
    tag: '📢 Awareness'
  }
];

const GALLERY_ITEMS = [
  {
    src: 'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/upload1.mp4',
    title: 'Production Showcase I',
    isVideo: true
  },

  {
    src: 'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/upload2.mp4',
    title: 'Production Showcase II',
    isVideo: true
  }
  ,
  {
    src:"https://res.cloudinary.com/dkhjubpyh/image/upload/ar_4:3,c_auto/WhatsApp_Image_2026-06-15_at_11.48.47_AM_1_c6sai6.jpg",
    title:'showcase',
    isVideo:false
  }
    ,
  {
    src:"https://res.cloudinary.com/dkhjubpyh/image/upload/ar_4:3,c_auto/WhatsApp_Image_2026-06-15_at_11.48.47_AM_2_bg6cz8.jpg",
    title:'showcase 11',
    isVideo:false
  }
];

const CAROUSEL_SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600',
    title: 'Prestigious Awards Functions',
    category: 'Awards Function'
  },
  {
    img: 'https://res.cloudinary.com/dfjsh2zel/image/upload/hero_section_background_image_for_202606291753_icypn0.jpg',
    title: 'High-Octane Sports Events',
    category: 'Sports Event'
  },
  {
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600',
    title: 'Spectacular Music Festivals',
    category: 'Music Festival'
  },
  {
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600',
    title: 'Grand Arena Concert Shows',
    category: 'Concert Shows'
  },
  {
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600',
    title: 'Exclusive Celebrity Management',
    category: 'Celebrity Management'
  },
  {
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600',
    title: 'Impactful CSR Initiatives & Projects',
    category: 'CSR Projects'
  },
  {
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600',
    title: 'Keynote Summits & Corporate Projects',
    category: 'Corporate Projects'
  },
  {
    img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1600',
    title: 'Empowering Social Awareness Projects',
    category: 'Awareness Projects'
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
  useDocumentMetadata('Premium Event Design & Production', 'VSI Creations – High-end event management, multi-camera cinema coverage, and production management for concerts, galas, corporate shows, and premium weddings.');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', domain: '', message: '' });
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  const cta1Ref = useRef(null);
  const cta2Ref = useRef(null);
  const submitBtnRef = useRef(null);
  
  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselTrackRef = useRef(null);
  const carouselPaused = useRef(false);

  useMagnetic(cta1Ref, 0.2);
  useMagnetic(cta2Ref, 0.2);
  useMagnetic(submitBtnRef, 0.15);

  // Auto-advance carousel every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselPaused.current) return;
      setCarouselIndex(prev => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate slide transition (now handled by CSS opacity/scale transitions)
  // carouselTrackRef no longer needed for GSAP translateX

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

  useGSAP(() => {
    // Floating ambient orbs animation
    gsap.to('.ambient-orb-1', { y: 25, x: 15, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.ambient-orb-2', { y: -30, x: -20, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.ambient-orb-3', { y: 20, x: -10, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // Hero entrance timeline
    const tl = gsap.timeline();
    tl.fromTo('.hero-eyebrow', { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .fromTo('.hero-title .char-span', 
        { opacity: 0, y: 40, rotateX: -60, filter: 'blur(4px)' },
        { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.02, ease: 'power4.out' },
        '-=0.4'
      )
      .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
      .fromTo('.hero-stat-pill', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)' }, '-=0.4')
      .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
      .fromTo('.hero-scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 0.5 });

    // Hero carousel entrance
    gsap.fromTo('.hero-carousel',
      { opacity: 0, x: 60, scale: 0.95 },
      {
        opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.6
      }
    );

    // About grid countup and entry
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        once: true
      }
    });
    aboutTl.fromTo('.about-text-content > *',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    ).fromTo('.about-stat-card',
      { opacity: 0, scale: 0.93 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.1)' },
      '-=0.5'
    );

    // Dynamic number counter animation for stats
    document.querySelectorAll('.stat-number').forEach(el => {
      const targetVal = parseInt(el.getAttribute('data-target'), 10);
      const isPercent = el.textContent.includes('%');
      const isPlus = el.textContent.includes('+');
      const isK = el.textContent.includes('k');
      
      const countObj = { val: 0 };
      gsap.to(countObj, {
        val: targetVal,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        },
        onUpdate: () => {
          let suffix = '';
          if (isPercent) suffix = '%';
          if (isPlus) suffix = '+';
          if (isK) suffix = 'k+';
          el.textContent = Math.floor(countObj.val) + suffix;
        }
      });
    });

    // Portfolio Cards scrolltrigger entry
    gsap.fromTo('.portfolio-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#portfolio',
          start: 'top 75%',
          once: true
        }
      }
    );

    // Gallery Masonry items fade & zoom in
    gsap.fromTo('.gallery-item-home',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#gallery',
          start: 'top 75%',
          once: true
        }
      }
    );

    // Upcoming Experiences stagger entry
    gsap.fromTo('.upcoming-event-row',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#upcoming-events',
          start: 'top 75%',
          once: true
        }
      }
    );

    // Services grid entries
    gsap.fromTo('.service-card-home',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#services',
          start: 'top 75%',
          once: true
        }
      }
    );

    // Testimonials reviews stagger entry
    gsap.fromTo('.review-card-home',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#reviews-section',
          start: 'top 75%',
          once: true
        }
      }
    );

    // Contact form card entry
    gsap.fromTo('.contact-card-home',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 75%',
          once: true
        }
      }
    );
  }, []);

  return (
    <div className="bg-bg-main text-text-main relative overflow-hidden">

      {/* ── Global Ambient Glows (subtle on white) ── */}
      <div className="ambient-orb-1 fixed top-[10vh] right-[8%]  w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="ambient-orb-2 fixed top-[60vh] left-[5%]   w-[400px] h-[400px] bg-accent-rose/5   rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="ambient-orb-3 fixed top-[130vh] right-[15%] w-[450px] h-[450px] bg-accent-primary/3 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* ══════════════════════════════════════════
          HERO — Full-screen Background Carousel
      ══════════════════════════════════════════ */}
      <section
        className="hero-carousel relative min-h-screen flex items-center overflow-hidden"
        onMouseEnter={() => (carouselPaused.current = true)}
        onMouseLeave={() => (carouselPaused.current = false)}
      >
        {/* ── Background Slides ── */}
        <div 
          className="absolute inset-0 flex transition-transform duration-1000 ease-in-out z-0"
          style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
        >
          {CAROUSEL_SLIDES.map((slide, i) => (
            <div
              key={i}
              className="w-full h-full flex-shrink-0 relative"
            >
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading={i < 2 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* ── Gradient overlays for readability ── */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/50 z-[1]" />

        {/* ── Slide category badge (top-right) ── */}
        <div className="absolute top-28 right-6 md:right-[8%] z-20">
          <span className="hero-slide-badge inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 shadow-lg transition-all duration-500">
            <Sparkles className="w-3 h-3 text-accent-primary" />
            {CAROUSEL_SLIDES[carouselIndex]?.category}
          </span>
        </div>

        {/* ── Text Content ── */}
        <div className="relative z-10 w-full px-6 md:px-[8%] pt-28 pb-24 flex items-center justify-center text-center">
          <div className="max-w-4xl space-y-7 mx-auto flex flex-col items-center">
            {/* Eyebrow */}
            <div className="hero-eyebrow flex items-center gap-2 justify-center">
              <span className="flex items-center gap-1.5 text-xs font-bold text-accent-primary uppercase tracking-[4px]">
                <Sparkles className="w-3.5 h-3.5 text-accent-primary animate-pulse" />
                Crafting Experiences · Building Brands
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-title font-display text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight font-extrabold drop-shadow-lg text-center">
              <SplitText className="block">Creating Memories.</SplitText><br />
              <SplitText className="text-accent-primary block mt-1">Capturing Milestones.</SplitText>
            </h1>

            {/* Sub */}
            <p className="hero-desc text-white/75 text-base md:text-xl max-w-2xl leading-relaxed font-light drop-shadow-md text-center mx-auto">
              High-end event management, premium multi-camera cinema coverage, and production excellence engineered to preserve life's grandest spectacles.
            </p>

            {/* Current slide title */}
            <div className="hero-slide-title text-white/50 text-xs font-bold uppercase tracking-[3px] flex items-center gap-3 justify-center transition-all duration-500">
              <div className="w-8 h-px bg-accent-primary" />
              {CAROUSEL_SLIDES[carouselIndex]?.title}
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-3 py-1 justify-center">
              {[
                { icon: CalendarDays, value: '150+', label: 'Events Managed' },
                { icon: Users,        value: '50k+', label: 'Guests Served'  },
                { icon: Award,        value: '100%', label: 'Client Satisfaction' }
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="hero-stat-pill flex items-center gap-3 border border-white/15 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm">
                  <Icon className="w-4 h-4 text-accent-primary" />
                  <span className="font-display text-white text-sm font-extrabold">{value}</span>
                  <span className="text-white/60 text-[10px] uppercase font-bold tracking-wider">{label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2 justify-center">
              <a
                ref={cta1Ref}
                href="#portfolio"
                className="hero-cta inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-secondary hover:to-accent-primary
                  text-white font-bold rounded-xl btn-glow
                  hover:shadow-xl hover:shadow-accent-primary/40 transition-all text-xs uppercase tracking-widest cursor-pointer"
              >
                Explore Portfolio <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                ref={cta2Ref}
                to='/contact'
                className="hero-cta inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20
                  text-white hover:text-accent-primary hover:border-accent-primary/50 font-bold rounded-xl
                  hover:bg-white/15 transition-all text-xs uppercase tracking-widest cursor-pointer hover:shadow-lg"
              >
                Book Your Event
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT / STATS ─── */}
      <section id="about" className="py-24 px-6 md:px-[8%]">
        <div className="bg-white border border-border-color rounded-[32px] p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-xl shadow-black/5">
          <div className="about-text-content lg:col-span-7 space-y-6">
            <span className="text-xs text-accent-primary font-extrabold uppercase tracking-[4px]">Who We Are</span>
            <h2 className="font-display text-3xl md:text-4xl text-text-main leading-tight font-extrabold tracking-tight">
              We turn large-scale concepts into flawless realities.
            </h2>
            <p className="text-text-muted text-sm md:text-base leading-relaxed font-light">
              VSI Creations operates as a premium, multi-disciplinary entertainment and production house. From pristine gala award ceremonies to explosive multi-stage music festivals and luxury wedding visual stories — our crew coordinates aesthetics, sound design, high-end illumination, and world-class cinematography with absolute elite execution.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-accent-primary hover:text-accent-secondary transition-colors uppercase tracking-wider"
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
              <div key={label} className="about-stat-card bg-bg-surface p-6 rounded-[20px] text-center group border border-border-color hover:border-accent-primary/30 transition-all hover:shadow-md">
                <Icon className="w-5 h-5 text-accent-primary mx-auto mb-2 group-hover:text-accent-secondary transition-colors" />
                <span className="stat-number font-display text-3xl text-accent-primary font-extrabold block" data-target={parseInt(val, 10)}>{val}</span>
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PORTFOLIO
      ══════════════════════════════════════════ */}
      <section id="portfolio" className="py-24 px-6 md:px-[8%] relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent" />
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
          <div>
            <span className="text-xs text-accent-secondary font-extrabold uppercase tracking-[4px]">Our Portfolio</span>
            <h2 className="font-display text-3xl md:text-4xl text-text-main font-extrabold mt-2">Featured Highlights</h2>
          </div>
          <Link to="/gallery" className="inline-flex items-center gap-2 text-xs font-bold text-text-muted hover:text-accent-secondary transition-colors uppercase tracking-wider">
            View Full Gallery <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {PORTFOLIO_ITEMS.map(project => (
            <Link
              key={project.id}
              to={`/portfolio/${project.id}`}
              className="portfolio-card bg-white border border-border-color rounded-[28px] overflow-hidden
                flex flex-col group hover:shadow-xl hover:shadow-accent-primary/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Tag badge — styled as a link chip; click navigates via parent <Link> */}
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 badge-pill backdrop-blur-md
                  group-hover:bg-accent-primary group-hover:text-white group-hover:border-accent-primary/40
                  transition-all duration-300 cursor-pointer shadow-sm">
                  {project.tag}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-full border border-border-color text-accent-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow space-y-3">
                <h3 className="font-display text-lg text-text-main group-hover:text-accent-primary transition-colors font-extrabold tracking-tight">{project.title}</h3>
                <p className="text-xs text-text-muted font-light leading-relaxed flex-grow">{project.desc}</p>
                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-accent-primary hover:text-accent-secondary uppercase tracking-wider">
                    View Project <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── ══════════════════════════════════════════
          GALLERY PREVIEW
      ══════════════════════════════════════════ */}
      <section id="gallery" className="py-24 px-6 md:px-[8%] relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent" />
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
          <div>
            <span className="text-xs text-accent-secondary font-extrabold uppercase tracking-[4px]">Snapshots</span>
            <h2 className="font-display text-3xl md:text-4xl text-text-main font-extrabold mt-2">Media Gallery</h2>
          </div>
          <Link to="/gallery" className="inline-flex items-center gap-2 text-xs font-bold text-text-muted hover:text-accent-secondary transition-colors uppercase tracking-wider">
            Full Gallery <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          {GALLERY_ITEMS.map((item, idx) => (
            <Link
              key={idx}
              to="/gallery"
              className="gallery-item-home rounded-[24px] overflow-hidden border border-border-color relative group cursor-pointer shadow-md transition-all duration-500 hover:scale-[1.02] hover:border-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/5 col-span-1 h-80 md:h-[450px]"
            >
              {item.isVideo ? (
                <video
                  src={item.src}
                  className="w-full h-full column-span-1 p-10 object-contain transition-transform duration-700 group-hover:scale-105"
                  muted
                  loop
                  playsInline
                  autoPlay
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full p-5 object-contain transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                <span className="font-display text-sm text-white font-extrabold tracking-wide">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── ══════════════════════════════════════════
          UPCOMING EVENTS
      ══════════════════════════════════════════ */}
      <section id="upcoming-events" className="py-24 px-6 md:px-[8%] relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
          <div>
            <span className="text-xs text-accent-secondary font-extrabold uppercase tracking-[4px]">Schedule</span>
            <h2 className="font-display text-3xl md:text-4xl text-text-main font-extrabold mt-2">Upcoming Experiences</h2>
          </div>
          <Link to="/events" className="inline-flex items-center gap-2 text-xs font-bold text-text-muted hover:text-accent-secondary transition-colors uppercase tracking-wider">
            All Events <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-5">
          {eventsLoading ? (
            /* Skeleton loaders while events are fetching */
            [1, 2, 3].map(n => (
              <div key={n} className="bg-bg-surface border border-border-color border-l-4 border-l-accent-primary/30 rounded-2xl p-5 md:p-7 animate-pulse flex gap-6 items-center">
                <div className="w-14 h-14 bg-border-color rounded-xl shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-border-color rounded w-2/3" />
                  <div className="h-3 bg-border-color rounded w-1/2" />
                </div>
                <div className="w-28 h-9 bg-border-color rounded-xl shrink-0" />
              </div>
            ))
          ) : upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => {
              const { day, month } = parseDateParts(event.date);
              const badge = CATEGORY_BADGES[event.category] || `📅 ${event.category}`;
              return (
                <div
                  key={event.id}
                  className="upcoming-event-row bg-white border border-border-color border-l-4 border-l-accent-primary rounded-[24px] p-6 md:p-7
                    grid grid-cols-1 md:grid-cols-12 items-center gap-6
                    hover:border-l-accent-rose hover:shadow-xl hover:shadow-accent-primary/5
                    hover:scale-[1.01] transition-all duration-300 group"
                >
                  {/* Date block */}
                  <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-3 md:gap-0">
                    <span className="font-display text-4xl text-accent-primary font-extrabold leading-none">{day}</span>
                    <span className="text-xs text-text-muted font-bold uppercase tracking-wider md:mt-1.5">{month}</span>
                  </div>

                  {/* Info */}
                  <div className="md:col-span-7 space-y-2.5">
                    <h3 className="font-display text-lg text-text-main group-hover:text-accent-primary transition-colors font-extrabold leading-snug tracking-tight">{event.title}</h3>
                    <p className="text-xs text-text-muted font-light leading-relaxed">{event.description}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="badge-pill">{badge}</span>
                    </div>
                  </div>

                  {/* CTA — links to event detail with ?register=true to auto-open modal */}
                  <div className="md:col-span-3 md:text-right">
                    <Link
                      to={`/events/${event.id}?register=true`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-widest
                        bg-accent-primary text-white rounded-xl btn-glow
                        hover:bg-accent-secondary transition-all cursor-pointer shadow-md"
                    >
                      <CalendarDays className="w-4 h-4" />
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
              <Link to="/events" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent-secondary hover:text-accent-primary transition-colors">
                View All Events <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section id="services" className="py-24 px-6 md:px-[8%] bg-bg-surface relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />
        <div className="mb-12">
          <span className="text-xs text-accent-secondary font-extrabold uppercase tracking-[4px]">Capabilities</span>
          <h2 className="font-display text-3xl md:text-4xl text-text-main font-extrabold mt-2">Production Ecosystem</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {SERVICES.map(service => {
            const IconComponent = LucideIcons[service.icon] || LucideIcons.HelpCircle;
            return (
              <div
                key={service.id}
                to={`/services/${service.id}`}
                className="service-card-home bg-white border border-border-color rounded-[28px] p-8 flex flex-col justify-between
                  glass-card-hover text-left group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-accent-primary/10 border border-accent-primary/25 rounded-xl text-accent-primary">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-display text-4xl text-border-color group-hover:text-accent-primary/20 transition-colors font-extrabold">{service.num}</span>
                  </div>
                  <h3 className="font-display text-lg text-text-muted group-hover:text-text-main transition-colors font-extrabold tracking-tight">{service.title}</h3>
                  <p className="text-xs text-text-muted font-light leading-relaxed">{service.tagline}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-accent-primary font-bold uppercase tracking-widest mt-7">
                  Learn More <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Testimonials from Clients ── */}
      <TestimonialSection />

      {/* ── ══════════════════════════════════════════
          CONTACT FORM
      ══════════════════════════════════════════ */}
      <ContactPage/>
    </div>
  );
}
