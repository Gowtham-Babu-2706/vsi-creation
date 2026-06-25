import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Briefcase,
  GraduationCap,
  Music,
  Heart,
  Cake,
  Truck,
  Video,
  Palette,
  Megaphone,
  Layers,
  Users,
  Wrench,
  ChevronRight
} from 'lucide-react';

const SERVICES = [
  {
    id: 'event-management',
    num: '01',
    title: 'Event Management',
    tagline: 'End-to-end planning, execution, and coordination for premium events.',
    desc: 'We turn your concepts into reality. From high-profile corporate galas to immersive brand launches and massive trade shows, our production team handles scheduling, design, vendor management, and execution flawlessly.',
    icon: Briefcase,
    banner: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000'
  },
  {
    id: 'college-educational',
    num: '02',
    title: 'College & Educational Events',
    tagline: 'Energetic cultural fests, academic symposiums, and college events.',
    desc: 'Empowering student communities and academic institutions with high-production value. We specialize in coordinating multi-day college festivals, tech expos, seminars, and graduation ceremonies.',
    icon: GraduationCap,
    banner: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000'
  },
  {
    id: 'cultural-programs',
    num: '03',
    title: 'Cultural Programs',
    tagline: 'Celebrating art, heritage, and community through grand staging.',
    desc: 'Bringing local and international heritage to life. We orchestrate grand traditional dance performances, music festivals, theater productions, and community cultural celebrations with specialized acoustic and visual design.',
    icon: Music,
    banner: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1000'
  },
  {
    id: 'wedding-planning',
    num: '04',
    title: 'Wedding Planning & Management',
    tagline: 'Immersive, luxurious, and custom-tailored wedding celebrations.',
    desc: 'Your dream wedding, seamlessly orchestrated. We offer complete wedding design, custom theme building, guest logistics, vendor coordination, and live event direction to create unforgettable memories.',
    icon: Heart,
    banner: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000'
  },
  {
    id: 'birthday-celebrations',
    num: '05',
    title: 'Birthday & Private Celebrations',
    tagline: 'Custom themes, vibrant styling, and intimate event coordination.',
    desc: 'Crafting unforgettable milestones and intimate celebrations. Whether it is a grand milestone birthday, an anniversary, or a private dinner, we design customized experiences with curated styling.',
    icon: Cake,
    banner: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000'
  },
  {
    id: 'event-logistics',
    num: '06',
    title: 'Event Coordination & Logistics',
    tagline: 'Precise vendor alignment, RSVP tracking, and on-ground management.',
    desc: 'The backbone of every successful production. We manage complex crowd management, vendor operations, scheduling, permits, security grids, and physical logistics mapping for events of all scales.',
    icon: Truck,
    banner: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000'
  },
  {
    id: 'media-production',
    num: '07',
    title: 'Media Production',
    tagline: 'High-fidelity photography, videography, and commercial film assets.',
    desc: 'Staging high-quality visuals. Our camera units and production crews deliver professional event photography, drone flythroughs, corporate films, promotional videos, and full live coverage in pristine formats.',
    icon: Video,
    banner: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000'
  },
  {
    id: 'creative-services',
    num: '08',
    title: 'Creative Services',
    tagline: 'Branding, graphic design, and custom motion animation assets.',
    desc: 'Sculpting the visual identity of your events. We craft custom event logos, stage graphics, social media promotions, physical brochures, flyers, and dynamic motion animations to drive engagement.',
    icon: Palette,
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000'
  },
  {
    id: 'digital-marketing',
    num: '09',
    title: 'Digital Marketing',
    tagline: 'Strategic social campaigns, content creation, and event promotion.',
    desc: 'Amplifying event reach and brand presence. We specialize in target audience generation, social media management, organic search optimization, online ticket promotions, and targeted ad campaigns.',
    icon: Megaphone,
    banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000'
  },
  {
    id: 'event-production',
    num: '10',
    title: 'Event Production',
    tagline: 'Stage design, LED walls, audio systems, and professional lighting.',
    desc: 'Building spectacular environments. We construct heavy-duty stages, deploy massive LED screens, design custom truss setups, align sound systems, and install professional light rigs for maximum sensory impact.',
    icon: Layers,
    banner: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000'
  },
  {
    id: 'talent-entertainment',
    num: '11',
    title: 'Talent & Entertainment',
    tagline: 'Artist bookings, live bands, celebrity scheduling, and performers.',
    desc: 'Elevating events with elite entertainment. We manage direct booking and coordination for celebrities, event hosts, DJs, live acoustic bands, classical dancers, and custom performance acts.',
    icon: Users,
    banner: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1000'
  },
  {
    id: 'equipment-rental',
    num: '12',
    title: 'Equipment Rental',
    tagline: 'High-end audio, video, lighting, and stage hardware.',
    desc: 'Rent premium event hardware on demand. We provide industry-standard sound boards, high-definition LED screens, stage lights, digital projectors, and advanced live-streaming hardware packages.',
    icon: Wrench,
    banner: 'https://images.unsplash.com/photo-1484755560693-a4074577af3a?w=1000'
  }
];

import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { api } from '../utils/api';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getServices();
        if (data && data.length > 0) {
          setServices(data);
        } else {
          setServices(SERVICES);
        }
      } catch (err) {
        console.error('Failed to fetch services, using fallback data:', err);
        setServices(SERVICES);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="bg-bg-main text-text-main min-h-screen pt-24 pb-16 relative">
      {/* Spotlights */}
      <div className="absolute top-[5vh] left-[10%] w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-[10vh] right-[10%] w-[350px] h-[350px] bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center md:text-left max-w-2xl space-y-3">
          <span className="text-xs text-accent-gold font-bold uppercase tracking-[4px] glow-gold flex items-center justify-center md:justify-start gap-1">
            <Icons.Sparkles className="w-4 h-4 text-accent-primary" /> Premium Capabilities
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Production Ecosystem
          </h1>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Explore our specialized capabilities and production assets. We deliver end-to-end event management, media production, and equipment rentals.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-accent-gold border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs text-text-muted font-semibold uppercase tracking-widest animate-pulse">Loading Capabilities...</span>
          </div>
        ) : (
          /* Services Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              // Dynamically resolve icon component
              const IconComponent = Icons[service.icon] || Icons.HelpCircle;
              return (
                <div
                  key={service.id}
                  className="bg-bg-card border border-border-color rounded-3xl overflow-hidden hover:border-accent-gold/45 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-primary/10 transition-all duration-300 group flex flex-col justify-between"
                >
                  <Link to={`/services/${service.id}`} className="block flex-grow cursor-pointer">
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
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-accent-gold transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-xs text-accent-gold font-medium">{service.tagline}</p>
                      <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                    </div>
                  </Link>

                  <Link
                    to={`/contact?service=${service.id}`}
                    className="px-6 pb-6 pt-2 flex items-center text-xs text-accent-gold font-bold uppercase tracking-wider gap-1 hover:text-white transition-colors cursor-pointer"
                  >
                    Explore Technology <Icons.ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
