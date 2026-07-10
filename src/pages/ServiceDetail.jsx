import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Briefcase, Trophy, Star, Music, Medal, HeartHandshake,
  Megaphone, Rocket, Building2, Heart, Lightbulb, Camera,
  HelpCircle, Sparkles, Send, ArrowLeft
} from 'lucide-react';
import { SERVICE_DATA_MAP } from '../utils/servicesData';
import { useGSAP, useMagnetic, SplitText } from '../hooks/useGSAP';
import gsap from 'gsap';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

const Icons = {
  Briefcase, Trophy, Star, Music, Medal, HeartHandshake,
  Megaphone, Rocket, Building2, Heart, Lightbulb, Camera,
  HelpCircle, Sparkles, Send, ArrowLeft
};

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPkg, setSelectedPkg] = useState('');

  useDocumentMetadata(
    service ? `${service.title} Production` : 'Service Production',
    service ? `Learn about our premium package solutions, tech specs, and FAQs for ${service.title}. Secure VSI camera assets and production crew.` : ''
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const staticService = SERVICE_DATA_MAP[id];
    if (staticService) {
      const mappedService = {
        id: staticService.id,
        title: staticService.title,
        tagline: staticService.tagline,
        description: staticService.description,
        banner: staticService.heroImage || staticService.banner,
        icon: staticService.icon,
        techStack: staticService.techStack,
        packages: staticService.packages,
        faqs: staticService.faqs
      };
      setService(mappedService);
      if (mappedService.packages && mappedService.packages.length > 0) {
        setSelectedPkg(mappedService.packages[0].name);
      }
    } else {
      setService(null);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-main text-white flex flex-col justify-center items-center py-20 gap-4">
        <div className="w-10 h-10 border-4 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs text-text-muted font-semibold uppercase tracking-widest animate-pulse">Loading Capabilities...</span>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-bg-main text-white flex flex-col justify-center items-center py-20 px-8">
        <h2 className="text-3xl font-bold text-accent-gold mb-4">Service Not Found</h2>
        <Link to="/services" className="inline-flex items-center text-white bg-accent-primary hover:bg-red-700 px-6 py-3 rounded-xl transition-all">
          <Icons.ArrowLeft className="w-5 h-5 mr-2" /> Back to Services
        </Link>
      </div>
    );
  }

  const IconComponent = typeof service.icon === 'string' 
    ? (Icons[service.icon] || Icons.HelpCircle) 
    : (service.icon || Icons.HelpCircle);

  const handleBook = (e) => {
    e.preventDefault();
    alert(`Inquiry sent for ${service.title} (${selectedPkg} Package). Our production unit will coordinate staging specifications and scheduling shortly.`);
  };

  const submitBtnRef = useRef(null);
  useMagnetic(submitBtnRef, 0.2);

  useGSAP(() => {
    if (!service) return;

    // Hero timeline
    const tl = gsap.timeline();
    tl.fromTo('.service-icon-box', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' })
      .fromTo('.service-title .char-span', 
        { opacity: 0, y: 30, rotateX: -30 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.02, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo('.service-tagline', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
      .fromTo('.service-desc', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
      .fromTo('.tech-card-item', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        '-=0.3'
      );

    // Hero visual showcase entry
    gsap.fromTo('.service-hero-showcase',
      { opacity: 0, x: 40, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
    );

    // Packages list entry
    gsap.fromTo('.pkg-card-item',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.packages-section',
          start: 'top 80%',
          once: true
        }
      }
    );

    // FAQ & Booking details entry
    gsap.fromTo('.faq-box-item',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.faqs-section',
          start: 'top 80%',
          once: true
        }
      }
    );

    gsap.fromTo('.booking-card-item',
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.booking-card-item',
          start: 'top 85%',
          once: true
        }
      }
    );
  }, [service]);

  return (
    <div className="bg-bg-main text-text-main min-h-screen pt-24 pb-16">
      {/* Background Gradient Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/8 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-gold/3 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Navigation */}
        <Link to="/services" className="inline-flex items-center text-accent-gold hover:text-white mb-8 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
          <Icons.ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="service-icon-box inline-flex items-center justify-center p-3 bg-accent-primary/10 border border-accent-primary/30 rounded-2xl text-accent-gold">
              <IconComponent className="w-8 h-8" />
            </div>
            <h1 className="service-title text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
              <SplitText>{service.title}</SplitText>
            </h1>
            <p className="service-tagline text-accent-gold text-lg md:text-xl font-medium mt-2">{service.tagline}</p>
            <p className="service-desc text-text-muted mt-6 leading-relaxed text-sm font-light">{service.description}</p>

            {/* Core Capabilities */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center">
                <Icons.Sparkles className="w-4 h-4 text-accent-gold mr-2" /> Core Expertise & Capabilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {service.techStack && service.techStack.map((tech, idx) => (
                  <div key={idx} className="tech-card-item bg-bg-surface/50 border border-border-color/60 p-4 rounded-2xl shadow-sm">
                    <span className="text-xs text-text-muted block font-bold uppercase tracking-wider">{tech.name}</span>
                    <span className="text-sm text-white font-semibold mt-1 block">{tech.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="service-hero-showcase h-[400px] rounded-3xl overflow-hidden border border-border-color/60 shadow-2xl relative group">
            <img 
              src={service.banner} 
              alt={service.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-bg-card/90 backdrop-blur-md p-5 rounded-2xl border border-border-color/60">
                <span className="text-xs text-accent-gold uppercase font-bold tracking-wider flex items-center">
                  <Icons.Sparkles className="w-3.5 h-3.5 mr-1" /> Premium Quality Execution
                </span>
                <span className="text-xs text-text-muted mt-1.5 block font-light leading-relaxed">Deploying certified resources for flawless operational performance.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <section className="packages-section mb-16">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl font-extrabold text-white font-display">Staging & Service Options</h2>
            <p className="text-text-muted text-sm font-light">Select the operational scale and service depth required for your concept.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {service.packages && service.packages.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`pkg-card-item border rounded-[28px] p-8 flex flex-col justify-between transition-all relative backdrop-blur-md ${
                  pkg.name.includes('Premier') || pkg.name.includes('Arena') || pkg.name.includes('Bespoke') || pkg.name.includes('Elite') || pkg.name.includes('Grand') || pkg.name.includes('Premium')
                    ? 'bg-gradient-to-br from-accent-primary/15 to-bg-card/75 border-accent-gold/45 shadow-[0_15px_30px_rgba(245,158,11,0.08)]' 
                    : 'bg-bg-surface/55 border-white/5 hover:border-accent-primary/45 hover:shadow-lg hover:shadow-accent-primary/5'
                }`}
              >
                {pkg.name.includes('Premier') || pkg.name.includes('Arena') || pkg.name.includes('Bespoke') || pkg.name.includes('Elite') || pkg.name.includes('Grand') || pkg.name.includes('Premium') ? (
                  <span className="absolute -top-3.5 right-6 bg-accent-gold text-bg-main font-extrabold text-[9px] tracking-widest uppercase px-3.5 py-1 rounded-full border border-bg-main shadow-md">
                    Highly Requested
                  </span>
                ) : null}
                <div>
                  <h3 className="font-display text-lg font-extrabold text-white">{pkg.name}</h3>
                  <p className="text-[10px] text-text-muted mt-1 uppercase font-bold tracking-wider">{pkg.duration}</p>
                  
                  <ul className="mt-6 space-y-3.5 border-t border-border-color/30 pt-6">
                    {pkg.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-xs text-text-muted flex items-center font-light">
                        <span className="w-1.5 h-1.5 bg-accent-primary rounded-full mr-2.5"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => setSelectedPkg(pkg.name)}
                  className={`w-full mt-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer btn-glow ${
                    selectedPkg === pkg.name 
                      ? 'bg-accent-gold text-bg-main border border-accent-gold shadow-lg shadow-accent-gold/20' 
                      : 'bg-bg-card/60 backdrop-blur-md border border-border-color/80 text-white hover:border-accent-primary'
                  }`}
                >
                  {selectedPkg === pkg.name ? 'Selected for Inquiry' : 'Choose Package'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs & Booking Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Accordion */}
          <section className="faqs-section bg-bg-surface/55 backdrop-blur-md border border-white/5 p-8 rounded-[32px] shadow-xl shadow-black/30">
            <h2 className="text-xl font-extrabold text-white mb-6 font-display tracking-tight">Service FAQ</h2>
            <div className="space-y-6">
              {service.faqs && service.faqs.map((faq, idx) => (
                <div key={idx} className="faq-box-item border-b border-border-color/25 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-sm font-bold text-white">{faq.q}</h4>
                  <p className="text-xs text-text-muted mt-2 leading-relaxed font-light">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Inquiry Card */}
          <section className="booking-card-item bg-gradient-to-br from-bg-surface/55 to-bg-card/65 backdrop-blur-md border border-white/5 p-8 rounded-[32px] relative shadow-2xl shadow-black/40">
            <h2 className="text-xl font-extrabold text-white mb-2 font-display tracking-tight">Initiate Brief</h2>
            <p className="text-xs text-text-muted mb-6">Confirm equipment schedules and configure operational crew details.</p>
            <form onSubmit={handleBook} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required 
                  className="w-full bg-bg-card/45 border border-border-color/80 text-sm text-white px-4 py-3.5 rounded-xl focus:border-accent-primary focus:bg-bg-main/80 outline-none transition-all placeholder:text-slate-600 hover:border-accent-primary/25"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required 
                  className="w-full bg-bg-card/45 border border-border-color/80 text-sm text-white px-4 py-3.5 rounded-xl focus:border-accent-primary focus:bg-bg-main/80 outline-none transition-all placeholder:text-slate-600 hover:border-accent-primary/25"
                />
              </div>
              <div className="p-3.5 bg-bg-main/70 border border-border-color/60 rounded-xl flex items-center justify-between">
                <span className="text-xs text-text-muted">Selected Configuration:</span>
                <span className="text-xs text-accent-gold font-bold uppercase">{selectedPkg}</span>
              </div>
              <textarea 
                rows="4" 
                placeholder="Details about staging dimensions, timeline constraints, or spatial coverage requirements..." 
                required 
                className="w-full bg-bg-card/45 border border-border-color/80 text-sm text-white px-4 py-3.5 rounded-xl focus:border-accent-primary focus:bg-bg-main/80 outline-none transition-all placeholder:text-slate-600 resize-none hover:border-accent-primary/25"
              ></textarea>
              <button 
                ref={submitBtnRef}
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-accent-primary to-accent-rose hover:from-accent-rose hover:to-accent-secondary text-xs text-white font-bold rounded-xl border border-white/10 shadow-lg shadow-accent-primary/25 hover:shadow-accent-secondary/35 hover:-translate-y-0.5 btn-glow transition-all flex items-center justify-center cursor-pointer uppercase tracking-widest"
              >
                <Icons.Send className="w-4 h-4 mr-2" /> Send Production Brief
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
