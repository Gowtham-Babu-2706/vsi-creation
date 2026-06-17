import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, CalendarDays } from 'lucide-react';
import Home from './pages/Home';
import PortfolioDetail from './pages/PortfolioDetail';
import EventsPage from './pages/EventsPage';
import EventDetail from './pages/EventDetail';
import ServiceDetail from './pages/ServiceDetail';
import GalleryPage from './pages/GalleryPage';
import GalleryDetail from './pages/GalleryDetail';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import { api } from './utils/api';
import { IntroLogo3D } from './components/SpinningLogo3D';
import vsiLogo from './assets/logo.png';
import './App.css';

const ProtectedRoute = ({ children }) =>
  api.isAuthenticated() ? children : <Navigate to="/login" replace />;

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

  useEffect(() => {
    const fadeTimer   = setTimeout(() => setFadeOut(true),    3500);
    const removeTimer = setTimeout(() => setShowIntro(false), 4300);
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  return (
    <div className="bg-bg-main text-text-main min-h-screen font-body flex flex-col justify-between">

      {/* ── Intro Splash ── */}
      {showIntro && (
        <div
          id="intro-screen"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(9,8,15,0.55), #09080f 92%), url("https://images.unsplash.com/photo-1510511233900-1982d92bd835?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`
          }}
          className={`fixed inset-0 z-[99999] flex justify-center items-center overflow-hidden ${
            fadeOut ? 'animate-intro-fade-out' : ''
          }`}
        >
          <div className="text-center px-6 space-y-6">
            {/* 3D spinning emblem */}
            <IntroLogo3D />
            <h1 className="text-4xl md:text-6xl font-display text-shine-grad uppercase tracking-wider">
              VSI CREATIONS
            </h1>
            <p className="text-accent-gold uppercase tracking-[6px] text-xs md:text-sm font-semibold animate-pulse">
              Crafting Memorable Experiences
            </p>
          </div>
        </div>
      )}

      {/* ── Global Header ── */}
      <header className="fixed top-0 left-0 w-full backdrop-blur-xl bg-bg-main/80 border-b border-border-color/70 px-6 md:px-[8%] py-3.5 flex justify-between items-center z-[1000] transition-all">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={vsiLogo}
            alt="VSI Creations"
            className="h-10 md:h-11 rounded-full w-auto object-contain transition-transform duration-500 group-hover:rotate-[360deg]"
          />
          <span className="text-lg md:text-xl font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent-secondary via-accent-gold to-accent-rose bg-[size:200%] hover:animate-text-shine">
            VSI CREATIONS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold tracking-wide">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`relative py-1 transition-colors hover:text-accent-secondary
                ${location.pathname === to
                  ? 'text-accent-secondary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-accent-primary after:rounded-full'
                  : 'text-text-muted'
                }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="flex items-center gap-2 bg-accent-primary hover:bg-accent-secondary text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-accent-primary/30 hover:shadow-accent-secondary/40 hover:-translate-y-0.5"
          >
            <CalendarDays className="w-4 h-4" />
            Book an Event
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white hover:text-accent-secondary p-2 bg-bg-card border border-border-color rounded-xl cursor-pointer transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999] bg-bg-main/96 backdrop-blur-xl flex flex-col justify-center items-center md:hidden">
          <nav className="flex flex-col gap-8 text-2xl font-display tracking-wide text-center">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className="text-text-main hover:text-accent-secondary transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-10 py-4 rounded-2xl font-semibold text-base tracking-wider shadow-xl shadow-accent-primary/30"
            >
              📅 Book an Event
            </Link>
          </nav>
        </div>
      )}

      {/* ── Page Content ── */}
      <main className="flex-grow">
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
          <Route path="/login"         element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* ── Global Footer ── */}
      <footer className="bg-bg-surface border-t border-border-color/60 py-10 px-6 md:px-[8%]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-text-muted">
          <div className="flex items-center gap-3">
            <img src={vsiLogo} alt="VSI" className="h-8 rounded-full" />
            <span className="font-display text-text-main tracking-wide text-base">VSI CREATIONS</span>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-xs font-semibold tracking-wide">
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={to} to={to} className="hover:text-accent-secondary transition-colors">
                {label}
              </Link>
            ))}
            <Link to="/contact" className="hover:text-accent-secondary transition-colors">Contact</Link>
          </div>
          <p className="text-xs text-center md:text-right">
            © {new Date().getFullYear()} VSI Creations Production House. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
