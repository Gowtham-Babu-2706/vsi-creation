import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, CalendarDays } from 'lucide-react';
import { api } from './utils/api';
import vsiLogo from './assets/logo.png';
import { useGSAP, useMagnetic } from './hooks/useGSAP';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Lazy load route pages for performance & lightweight initial bundles
const Home = React.lazy(() => import('./pages/Home'));
const PortfolioDetail = React.lazy(() => import('./pages/PortfolioDetail'));
const EventsPage = React.lazy(() => import('./pages/EventsPage'));
const EventDetail = React.lazy(() => import('./pages/EventDetail'));
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail'));
const GalleryPage = React.lazy(() => import('./pages/GalleryPage'));
const GalleryDetail = React.lazy(() => import('./pages/GalleryDetail'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const Login = React.lazy(() => import('./pages/Login'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

const ProtectedRoute = ({ children }) => {
  return api.isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const LoadingFallback = () => (
  <div className="min-h-[60vh] bg-bg-main flex flex-col justify-center items-center gap-4">
    <div className="w-10 h-10 border-4 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
    <span className="text-xs text-text-muted font-bold uppercase tracking-widest animate-pulse">Loading experience...</span>
  </div>
);

const NAV_LINKS = [
  { label: 'Home',     to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Events',   to: '/events' },
  { label: 'Gallery',  to: '/gallery' },
];

function App() {
  const [showIntro, setShowIntro]       = useState(true);
  const [fadeOut, setFadeOut]           = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const headerRef = useRef(null);
  const bookBtnRef = useRef(null);
  const footerRef = useRef(null);
  const mobileDrawerRef = useRef(null);

  useEffect(() => {
    const fadeTimer   = setTimeout(() => setFadeOut(true),    3500);
    const removeTimer = setTimeout(() => setShowIntro(false), 4300);
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  // Magnetic effect for book button
  useMagnetic(bookBtnRef, 0.25);

  useGSAP(() => {
    // Header initial load slide down
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 }
    );

    // Shrink header and increase blur/opacity on scroll
    ScrollTrigger.create({
      start: 'top+=50 top',
      onEnter: () => {
        gsap.to(headerRef.current, {
          paddingTop: '0.6rem',
          paddingBottom: '0.6rem',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.15)',
          duration: 0.4,
          ease: 'power2.out'
        });
      },
      onLeaveBack: () => {
        gsap.to(headerRef.current, {
          paddingTop: '1rem',
          paddingBottom: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });

    // Footer scroll-trigger entry
    gsap.fromTo(footerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 92%',
          once: true
        }
      }
    );
  }, []);

  // Animating drawer items when opened
  useEffect(() => {
    if (mobileMenuOpen && mobileDrawerRef.current) {
      gsap.fromTo(mobileDrawerRef.current,
        { opacity: 0, backdropFilter: 'blur(0px)' },
        { opacity: 1, backdropFilter: 'blur(24px)', duration: 0.4, ease: 'power3.out' }
      );
      gsap.fromTo('.mobile-nav-link',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power3.out', delay: 0.05 }
      );
    }
  }, [mobileMenuOpen]);

  const handleLogoMouseEnter = () => {
    gsap.to('.logo-img', { rotate: 360, scale: 1.08, duration: 0.8, ease: 'back.out(1.5)', overwrite: 'auto' });
  };

  const handleLogoMouseLeave = () => {
    gsap.to('.logo-img', { rotate: 0, scale: 1, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
  };

  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  if (isAdminRoute) {
    return (
      <div className="admin-theme bg-bg-main text-text-main min-h-screen font-body flex flex-col justify-between">
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-bg-main text-text-main min-h-screen font-body flex flex-col justify-between selection:bg-accent-primary selection:text-white">
      {/* ── Global Header ── */}
      <header ref={headerRef} className="fixed top-0 left-0 w-full backdrop-blur-md bg-bg-main/70 border-b border-border-color/40 px-6 md:px-[8%] py-4 flex justify-between items-center z-[1000] transition-all shadow-lg shadow-black/10">

        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group"
          onMouseEnter={handleLogoMouseEnter}
          onMouseLeave={handleLogoMouseLeave}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-accent-primary/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={vsiLogo}
              alt="VSI Creations"
              className=" h-10 md:h-11 rounded-full w-auto object-contain relative z-10"
            />
          </div>
          <span className="text-lg md:text-xl font-display tracking-widest  text-red-600 bg-[size:200%] font-black  hover:animate-text-shine">
            VSI CREAT<span><span className='absolute z-10 text-red text-[39px] -mt-[38px] -ml-[3.1px]'>.</span>I</span><span className='text-green-500'>ON</span>S
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`relative py-1 transition-all duration-300 font-medium
                ${location.pathname === to
                  ? 'text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-accent-primary after:to-accent-rose after:rounded-full'
                  : 'text-black'
                }`}
            >
              {label}
            </Link>
          ))}
          <Link
            id="nav-book-event"
            to="/contact"
            className="flex items-center gap-2 bg-accent-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-accent-primary/20 hover:shadow-accent-secondary/35"
          >
            <CalendarDays className="w-4 h-4" />
            Book an Event
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white hover:text-accent-secondary p-2 bg-bg-card/80 border border-border-color/80 rounded-xl cursor-pointer transition-colors shadow-inner"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <div ref={mobileDrawerRef} className="fixed inset-0 z-[999] bg-bg-main/98 flex flex-col justify-center items-center md:hidden">
          <nav className="flex flex-col gap-8 text-2xl font-display tracking-wide text-center">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-nav-link text-text-main hover:text-accent-secondary transition-colors font-extrabold"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-link bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-10 py-4 rounded-2xl font-bold text-base tracking-wider shadow-xl shadow-accent-primary/30 active:scale-95 transition-transform"
            >
              📅 Book an Event
            </Link>
          </nav>
        </div>
      )}

      {/* ── Page Content ── */}
      <main className="flex-grow">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/portfolio/:id" element={<PortfolioDetail />} />
            <Route path="/events"        element={<EventsPage />} />
            <Route path="/events/:id"    element={<EventDetail />} />
            <Route path="/services"      element={<ServicesPage />} />
            <Route path="/services/:id"  element={<ServiceDetail />} />
            <Route path="/contact"       element={<ContactPage />} />
            <Route path="/gallery"       element={<GalleryPage />} />
            <Route path="/gallery/:id"   element={<GalleryDetail />} />
          </Routes>
        </Suspense>
      </main>

      {/* ── Global Footer ── */}
      <footer ref={footerRef} className="bg-bg-surface border-t border-border-color/30 py-12 px-6 md:px-[8%] relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-text-muted">
          <div className="flex items-center gap-3">
            <img src={vsiLogo} alt="VSI" className="h-8 rounded-full" />
            <span className="font-display text-text-main tracking-wide text-base font-extrabold">VSI CREATIONS</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold tracking-wide">
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={to} to={to} className="hover:text-accent-secondary transition-colors">
                {label}
              </Link>
            ))}
            <Link to="/contact" className="hover:text-accent-secondary transition-colors">Contact</Link>
          </div>
          <p className="text-xs text-center md:text-right font-light">
            © {new Date().getFullYear()} VSI Creations Production House. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
