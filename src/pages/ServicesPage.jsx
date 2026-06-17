import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Video, Compass, Radio, ChevronRight } from 'lucide-react';

const SERVICES = [
  {
    id: 'cinematography',
    num: '01',
    title: 'Elite Cinematography',
    tagline: 'Multi-cam 4K capture, prime lenses, and cinematic grading.',
    desc: 'Our cinema unit deploys industry-standard digital sensor systems alongside specialized high-speed cinema prime lenses. We capture live action with fluid motion stabilizers and customize visual palettes to align with luxury brand specifications.',
    icon: Video,
    banner: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000'
  },
  {
    id: 'aerial-assets',
    num: '02',
    title: 'Structural Aerial Assets',
    tagline: 'High-altitude flight mapping and cinematic tracking shots.',
    desc: 'Fully licensed drone maneuvers designed to establish venue majesty. We orchestrate dual-operator flight grids, capturing synchronous wide tracking pans and aerial perspective mapping for large-scale outdoor events.',
    icon: Compass,
    banner: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1000'
  },
  {
    id: 'live-broadcast',
    num: '03',
    title: 'Low-Latency Live Broadcast',
    tagline: 'Ultra-low latency television & digital web streaming.',
    desc: 'We build local broadcast stations inside venues. Featuring high-grade hardware switchers, zero-delay wireless transmitters, and robust network bonding, we broadcast crystal clear content to audiences globally.',
    icon: Radio,
    banner: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000'
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-bg-main text-text-main min-h-screen pt-24 pb-16 relative">
      {/* Spotlights */}
      <div className="absolute top-[5vh] left-[10%] w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-[10vh] right-[10%] w-[350px] h-[350px] bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center md:text-left max-w-2xl space-y-3">
          <span className="text-xs text-accent-gold font-bold uppercase tracking-[4px] glow-gold flex items-center justify-center md:justify-start gap-1">
            <Sparkles className="w-4 h-4 text-accent-primary" /> Premium Capabilities
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Production Ecosystem
          </h1>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Explore our specialized capabilities and production assets. We deliver high-fidelity cinematography, drone mapping, and low-latency broadcasting solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="bg-bg-card border border-border-color rounded-3xl overflow-hidden hover:border-accent-gold/45 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-primary/10 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Image Banner */}
                  <div className="h-48 overflow-hidden relative border-b border-border-color/40">
                    <img
                      src={service.banner}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent"></div>
                    
                    {/* Badge Number */}
                    <div className="absolute top-4 left-4 w-10 h-10 bg-bg-main/80 backdrop-blur-md border border-border-color text-accent-gold font-black text-xs rounded-xl flex items-center justify-center">
                      {service.num}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-accent-primary/10 border border-accent-primary/20 rounded-xl text-accent-gold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-accent-gold transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-xs text-accent-gold font-medium">{service.tagline}</p>
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                      {service.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center text-xs text-accent-gold font-bold uppercase tracking-wider gap-1">
                  Explore Technology <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
