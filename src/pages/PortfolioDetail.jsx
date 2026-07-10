import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, Flame, Zap, Camera, Award, Star } from 'lucide-react';
import { useGSAP, SplitText } from '../hooks/useGSAP';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
gsap.registerPlugin(ScrollTrigger);

const PORTFOLIO_DATA = {
  'music-festivals': {
    title: 'Music Festivals & DJ Sets',
    subtitle: 'High-Decibel Immersive Stage Systems',
    description: 'We orchestrate explosive soundscapes and visual spectacles that captivate tens of thousands. Our festival setups combine custom steel deck trussing, high-intensity laser grids, and line-array acoustics tuned for high-fidelity outdoor distribution.',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1800',
    tags: ['Acoustics', 'Lasers', 'Truss Construction', 'Live SFX'],
    stats: [
      { label: 'Max Audience', value: '45,000+' },
      { label: 'Subwoofers Stacked', value: '64 Units' },
      { label: 'Laser Projectors', value: '18 Diodes' },
      { label: 'Setup Time', value: '36 Hours' },
    ],
    features: [
      'Line-array sound systems calibrated using spatial modeling software.',
      'Sychronized timeline lasers and cryo-jet CO2 effects.',
      'LED wall video mapping with live VJ performance inputs.',
      'Rigid certified ground support structures capable of heavy payload rigging.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600',
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600'
    ]
  },
  'gala-awards': {
    title: 'Gala Awards & Red Carpets',
    subtitle: 'Elite Ballroom Configurations & Broadcast Integrity',
    description: 'Elevating corporate milestones with impeccable execution. From custom backdrops and luxury entrance tunnels to pristine lighting rigs and multi-camera broadcast capture, we ensure your gala radiates luxury.',
    heroImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1800',
    tags: ['Corporate Gala', 'Red Carpet', 'Live Broadcast', 'Luxury Lighting'],
    stats: [
      { label: 'VIP Capacity', value: '2,500' },
      { label: 'Cameras Engaged', value: '8 Cameras' },
      { label: 'Stage Width', value: '60 Feet' },
      { label: 'Pristine Audio', value: 'Zero Delay' },
    ],
    features: [
      'Pin-spot lighting to isolate centerpieces and maintain elite atmosphere.',
      'Custom fabricated step-and-repeat backdrops with matte light diffusers.',
      'Ultra-fine pixel pitch LED stage backdrops with dual backup media servers.',
      'Broadcast-grade camera cranes and wireless steady-cam operators.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1489641493513-ba4ee84ccea9?w=600',
      'https://images.unsplash.com/photo-1505232458627-a7272640408a?w=600',
      'https://images.unsplash.com/photo-1531058020387-3be344559be6?w=600'
    ]
  },
  'bespoke-celebrations': {
    title: 'Bespoke Premium Celebrations',
    subtitle: 'Tailored Luxury Themes & Visual Storytelling',
    description: 'Transforming private spaces and luxury halls into conceptual dreamscapes. Designed for clients seeking extraordinary visual storytelling, luxury weddings, and neon-infused milestone milestones.',
    heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800',
    tags: ['Bespoke Event', 'Luxury Wedding', 'Projection Mapping', 'Immersive Decor'],
    stats: [
      { label: 'Custom Fabrications', value: '100% Unique' },
      { label: 'Illumination Fixtures', value: '240+ Units' },
      { label: 'Projector Arrays', value: '8 HD Nodes' },
      { label: 'Theme Design', value: 'Concept to Reality' },
    ],
    features: [
      'Stunning projection mapping that brings architectural walls to life.',
      'Custom ceiling floral and lighting installations tailored to theme.',
      'High-end multi-cam cinema team tracking candid moments in ultra HD.',
      'Interactive entertainment rigs and intelligent warm-ambient lighting design.',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600'
    ]
  }
};

export default function PortfolioDetail() {
  const { id } = useParams();
  const project = PORTFOLIO_DATA[id];

  useDocumentMetadata(
    project ? `${project.title} | Portfolio Showcase` : 'Portfolio Details',
    project ? `Explore the technical setup, staging, sound, lighting, and cinematic highlights of the ${project.title} production by VSI Creations.` : ''
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for inquiring about ${project?.title}. Our executive producer will contact you in 24 hours.`);
  };

  useGSAP(() => {
    if (!project) return;
    // Hero image scale-in
    gsap.fromTo('.pd-hero-img',
      { scale: 1.1 },
      { scale: 1, duration: 1.8, ease: 'power2.out' }
    );
    // Hero content stagger
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo('.pd-back-link', { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' })
      .fromTo('.pd-eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.2')
      .fromTo('.pd-title .char-span',
        { opacity: 0, y: 38, rotateX: -42 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.018, ease: 'power4.out' },
        '-=0.3'
      )
      .fromTo('.pd-subtitle', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.55');

    // Body sections scroll-triggered
    gsap.utils.toArray('.pd-section').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 42 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        }
      );
    });

    // Stats counter stagger
    gsap.fromTo('.pd-stat',
      { opacity: 0, y: 24, scale: 0.92 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.pd-stats-row', start: 'top 90%', toggleActions: 'play none none none' }
      }
    );
  }, [project]);

  if (!project) {
    return (
      <div className="min-height-screen bg-bg-main text-white flex flex-col justify-center items-center py-20 px-8">
        <h2 className="text-3xl font-bold text-accent-gold mb-4">Project Not Found</h2>
        <Link to="/" className="inline-flex items-center text-white bg-accent-primary hover:bg-red-700 px-6 py-3 rounded-xl transition-all">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-bg-main text-text-main min-h-screen pt-24 pb-16">
      {/* Hero Banner */}
      <div className="relative h-[60vh] flex items-end overflow-hidden">
        <div
          className="pd-hero-img absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto w-full px-8 pb-12 z-10">
          <Link to="/" className="pd-back-link inline-flex items-center text-accent-primary hover:text-white mb-6 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Masterpieces
          </Link>
          <span className="pd-eyebrow text-[10px] text-accent-gold tracking-widest uppercase font-extrabold bg-accent-primary/20 border border-accent-primary/40 px-3 py-1.5 rounded-full">{project.tags[0]}</span>
          <h1 className="pd-title text-4xl md:text-6xl font-extrabold text-white mt-4 tracking-tight leading-tight">
            <SplitText>{project.title}</SplitText>
          </h1>
          <p className="pd-subtitle text-accent-gold text-lg md:text-xl font-medium mt-2 max-w-2xl">{project.subtitle}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        {/* Left 2 Columns: Details */}
        <div className="lg:col-span-2 space-y-12">
          {/* Detailed Summary */}
          <section className="pd-section bg-bg-surface/55 backdrop-blur-md border border-white/5 p-8 rounded-[32px] shadow-xl shadow-black/30">
            <h2 className="text-xl font-extrabold text-white mb-4 border-b border-border-color/20 pb-3 font-display tracking-tight">Project Overview</h2>
            <p className="text-text-muted text-sm leading-relaxed font-light">{project.description}</p>
            
            {/* Tags list */}
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="bg-bg-card/45 text-white border border-white/5 text-[10px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider">
                  #{tag}
                </span>
              ))}
            </div>
          </section>

          {/* Key Deliverables/Specs */}
          <section className="bg-bg-surface/55 backdrop-blur-md border border-white/5 p-8 rounded-[32px] shadow-xl shadow-black/30">
            <h2 className="text-xl font-extrabold text-white mb-6 border-b border-border-color/20 pb-3 font-display tracking-tight">Engineering Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-bg-card/45 backdrop-blur-md p-4 rounded-xl border border-white/5 hover:border-accent-primary/25 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                  <span className="text-xs text-text-muted font-light leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Photo Gallery Grid */}
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-white border-b border-border-color/20 pb-3 font-display tracking-tight">Project Visuals</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.gallery.map((img, idx) => (
                <div key={idx} className="h-64 rounded-[20px] overflow-hidden border border-white/5 group relative shadow-lg hover:border-accent-primary/30 transition-all">
                  <img 
                    src={img} 
                    alt={`${project.title} mockup ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-main/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-[10px] text-accent-gold uppercase font-extrabold tracking-wider">VSI Production Render</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right 1 Column: Stats & Inquiry Card */}
        <div className="space-y-8">
          {/* Stats Box */}
          <div className="bg-gradient-to-br from-bg-surface/55 to-bg-card/65 backdrop-blur-md border border-white/5 p-6 rounded-[28px] shadow-xl shadow-black/30">
            <h3 className="text-base font-extrabold text-white mb-4 flex items-center font-display tracking-tight">
              <Zap className="w-5 h-5 text-accent-gold mr-2" /> Production Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {project.stats.map((stat, idx) => (
                <div key={idx} className="bg-bg-main/60 backdrop-blur-md p-4 rounded-xl border border-white/5 text-center hover:border-accent-gold/25 transition-all">
                  <span className="text-2xl font-black text-accent-gold block glow-gold">{stat.value}</span>
                  <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Intake Inquire Form Card */}
          <div className="bg-bg-surface/55 backdrop-blur-md border border-white/5 p-8 rounded-[28px] shadow-xl shadow-black/30 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent-primary/10 rounded-full blur-2xl"></div>
            <h3 className="text-base font-extrabold text-white mb-2 flex items-center font-display tracking-tight">
              <Flame className="w-5 h-5 text-accent-primary mr-2" /> Book This Layout
            </h3>
            <p className="text-xs text-text-muted mb-6 font-light">Coordinate our structural resources and media crew for your upcoming execution.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Contact Person" 
                  required 
                  className="w-full bg-bg-card/45 border border-border-color/80 text-sm text-white px-4 py-3.5 rounded-xl focus:border-accent-primary focus:bg-bg-main/80 outline-none transition-all placeholder:text-slate-600 hover:border-accent-primary/25"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required 
                  className="w-full bg-bg-card/45 border border-border-color/80 text-sm text-white px-4 py-3.5 rounded-xl focus:border-accent-primary focus:bg-bg-main/80 outline-none transition-all placeholder:text-slate-600 hover:border-accent-primary/25"
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Target Date / Season" 
                  required 
                  className="w-full bg-bg-card/45 border border-border-color/80 text-sm text-white px-4 py-3.5 rounded-xl focus:border-accent-primary focus:bg-bg-main/80 outline-none transition-all placeholder:text-slate-600 hover:border-accent-primary/25"
                />
              </div>
              <div>
                <textarea 
                  rows="3" 
                  placeholder="Special requests or spatial details..." 
                  required 
                  className="w-full bg-bg-card/45 border border-border-color/80 text-sm text-white px-4 py-3.5 rounded-xl focus:border-accent-primary focus:bg-bg-main/80 outline-none transition-all placeholder:text-slate-600 resize-none hover:border-accent-primary/25"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-accent-primary to-accent-rose hover:from-accent-rose hover:to-accent-secondary text-xs text-white font-bold rounded-xl border border-white/10 shadow-lg shadow-accent-primary/25 hover:shadow-accent-secondary/35 hover:-translate-y-0.5 btn-glow transition-all cursor-pointer uppercase tracking-widest"
              >
                Request Production Slot
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
