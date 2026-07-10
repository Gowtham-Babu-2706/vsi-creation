import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, Trophy, Star, Music, Medal, HeartHandshake,
  Megaphone, Rocket, Building2, Heart, Lightbulb, Camera,
  HelpCircle, Sparkles, ChevronRight
} from 'lucide-react';
import { SERVICES } from '../utils/servicesData';
import { useGSAP, SplitText } from '../hooks/useGSAP';
import gsap from 'gsap';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

const Icons = {
  Briefcase, Trophy, Star, Music, Medal, HeartHandshake,
  Megaphone, Rocket, Building2, Heart, Lightbulb, Camera,
  HelpCircle, Sparkles, ChevronRight
};

export default function ServicesPage() {
  useDocumentMetadata('Our Services', 'Explore our specialized event production capabilities, including corporate events, concert staging, exhibition booths, celebrity management, and sound & lighting rigs.');
  const containerRef = useRef(null);

  useGSAP(() => {
    // Header entry timeline
    const tl = gsap.timeline();
    tl.fromTo('.services-eyebrow', { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .fromTo('.services-title .char-span', 
        { opacity: 0, y: 35, rotateX: -40 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.75, stagger: 0.02, ease: 'power4.out' },
        '-=0.4'
      )
      .fromTo('.services-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5');

    // Cards entry
    gsap.fromTo('.service-card-item',
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%',
          once: true
        }
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="bg-bg-main text-text-main min-h-screen pt-24 pb-16 relative">
      {/* Spotlights */}
      <div className="absolute top-[5vh] left-[10%] w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-[10vh] right-[10%] w-[350px] h-[350px] bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center md:text-left max-w-2xl space-y-3">
          <span className="services-eyebrow text-xs text-accent-gold font-bold uppercase tracking-[4px] glow-gold flex items-center justify-center md:justify-start gap-1.5">
            <Icons.Sparkles className="w-4 h-4 text-accent-gold" /> Premium Capabilities
          </span>
          <h1 className="services-title text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
            <SplitText>Our Services</SplitText>
          </h1>
          <p className="services-desc text-sm md:text-base text-text-muted leading-relaxed font-light">
            Explore our comprehensive range of event management services. From corporate events to weddings, concerts to CSR projects — we deliver excellence at every scale.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            // Dynamically resolve icon component
            const IconComponent = Icons[service.icon] || Icons.HelpCircle;
            return (
              <div
                key={service.id}
                className="service-card-item bg-bg-card/45 backdrop-blur-md border border-white/5 rounded-[28px] overflow-hidden glass-card-hover group flex flex-col justify-between"
              >
                <Link to={`/services/${service.id}`} className="block flex-grow cursor-pointer">
                  {/* Image Banner */}
                  <div className="h-48 overflow-hidden relative border-b border-white/5 bg-bg-surface">
                    <img
                      src={service.banner}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0"></div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-accent-primary/10 border border-accent-primary/25 rounded-xl text-accent-gold shadow-md">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-display uppercase text-lg font-extrabold text-black group-hover:text-accent-primary transition-colors leading-tight tracking-tight">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-[12px] text-text-muted/60 font-bold uppercase tracking-wider">{service.tagline}</p>
                  </div>
                </Link>

                <Link
                  to={`/contact?service=${service.id}`}
                  className="px-6 pb-6 pt-3 flex items-center text-xs text-accent-primary font-bold uppercase tracking-widest gap-1.5 hover:text-accent-rose transition-colors cursor-pointer border-t border-border-color/20"
                >
                  Explore Service <Icons.ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

