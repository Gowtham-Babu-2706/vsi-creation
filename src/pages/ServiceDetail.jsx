import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { api } from '../utils/api';
import { useGSAP, useMagnetic, SplitText } from '../hooks/useGSAP';
import gsap from 'gsap';

const SERVICE_DATA = {
  'event-management': {
    title: 'Event Management',
    tagline: 'End-to-end planning, execution, and coordination for premium events.',
    description: 'We turn your concepts into reality. From high-profile corporate galas to immersive brand launches and massive trade shows, our production team handles scheduling, design, vendor management, and execution flawlessly.',
    icon: 'Briefcase',
    heroImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1800',
    techStack: [
      { name: 'Staging Blueprint', detail: 'Custom blueprints & CAD layouts' },
      { name: 'Vendor Liaison', detail: 'Logistics, permits & clearances' },
      { name: 'RSVP Grids', detail: 'Invitee check-lists & tracking' },
      { name: 'On-Ground Direction', detail: 'Event runsheet & stage management' }
    ],
    packages: [
      {
        name: 'Premium Management',
        duration: 'Standard Execution Flow',
        details: [
          'End-to-End Coordination',
          'Permit Clearance Filings',
          'Staging Sound & Light Coordination',
          'Event Runsheets & Schedules'
        ]
      },
      {
        name: 'Bespoke Executive Staging',
        duration: 'Complex Multi-Day Events',
        details: [
          'Full Custom CAD/3D Venue Blueprints',
          'VIP Guest Hospitality Logistics',
          'Direct Creative & Production Design',
          '24/7 Staging Coordination Desk'
        ]
      }
    ],
    faqs: [
      { q: 'What is the booking window?', a: 'We recommend initiating the brief at least 4-6 weeks prior to the event date to secure crew schedules.' },
      { q: 'Do you support multi-location events?', a: 'Yes, our coordination team executes concurrent staging across multiple venues globally.' }
    ]
  },
  'college-educational': {
    title: 'College & Educational Events',
    tagline: 'Energetic cultural fests, academic symposiums, and college events.',
    description: 'Empowering student communities and academic institutions with high-production value. We specialize in coordinating multi-day college festivals, tech expos, seminars, and graduation ceremonies.',
    icon: 'GraduationCap',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1800',
    techStack: [
      { name: 'Youth Staging', detail: 'High-energy light & sound grids' },
      { name: 'Talent Scouting', detail: 'Booking local bands & speakers' },
      { name: 'Crowd Management', detail: 'Arena entry planning & security grids' },
      { name: 'Campus Liaison', detail: 'Student coordinators & permits' }
    ],
    packages: [
      {
        name: 'Standard Campus Setup',
        duration: 'Single Day Event',
        details: [
          'Main Stage Setup & Sound System',
          'Security & Crowd Flow Plan',
          'Student Coordinator Briefings',
          'Basic Media Coverage'
        ]
      },
      {
        name: 'Elite Festival Production',
        duration: 'Multi-Day Cultural Fest',
        details: [
          'High-Power Sound & LED Grid Staging',
          'Artist/Celebrity Management',
          'Inter-Collegiate Competitions Desk',
          'Full Event Video & Live Stream Packages'
        ]
      }
    ],
    faqs: [
      { q: 'How do you coordinate with student committees?', a: 'We assign a dedicated Production Manager to liaise directly with the student committee and faculty representatives.' },
      { q: 'Can you manage sponsorships?', a: 'Yes, we provide branding spaces, LED wall integrations, and brochure displays for event sponsors.' }
    ]
  },
  'cultural-programs': {
    title: 'Cultural Programs',
    tagline: 'Celebrating art, heritage, and community through grand staging.',
    description: 'Bringing local and international heritage to life. We orchestrate grand traditional dance performances, music festivals, theater productions, and community cultural celebrations with specialized acoustic and visual design.',
    icon: 'Music',
    heroImage: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1800',
    techStack: [
      { name: 'Acoustic Calibration', detail: 'Tuned audio for folk & classical setups' },
      { name: 'Stage Backdrops', detail: 'Traditional thematic scenic design' },
      { name: 'Lighting Design', detail: 'Warm highlights & spotlight tracing' },
      { name: 'Talent Care', detail: 'Green rooms & performance schedules' }
    ],
    packages: [
      {
        name: 'Traditional Showcase',
        duration: 'Evening Cultural Programs',
        details: [
          'Acoustic Tuning & Warm Lights',
          'Scenic Backdrop Staging',
          'Artist Coordination Desk',
          'Event Highlight Media Pack'
        ]
      },
      {
        name: 'Grand Heritage Festival',
        duration: 'Multi-Day Traditional Gala',
        details: [
          'Advanced Surround Sound Design',
          'Interactive Theme Projection Mapping',
          'Celebrity Artist Booking Liaison',
          'Live Video Broadcast & Archival Recording'
        ]
      }
    ],
    faqs: [
      { q: 'Do you handle classical instrument amplification?', a: 'Yes, our audio engineers specialize in microphoning and calibrating acoustic folk and classical instruments.' },
      { q: 'Can you handle outdoor amphitheater events?', a: 'Absolutely. We design specific trussing and weather-proof sound/lighting setups for outdoor spaces.' }
    ]
  },
  'wedding-planning': {
    title: 'Wedding Planning & Management',
    tagline: 'Immersive, luxurious, and custom-tailored wedding celebrations.',
    description: 'Your dream wedding, seamlessly orchestrated. We offer complete wedding design, custom theme building, guest logistics, vendor coordination, and live event direction to create unforgettable memories.',
    icon: 'Heart',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1800',
    techStack: [
      { name: 'Decor Design', detail: 'Thematic fabric, floral & stage setups' },
      { name: 'Hospitality', detail: 'Guest transfer & RSVP grids' },
      { name: 'Theme Styling', detail: 'Custom colors & light concepts' },
      { name: 'Event Flow', detail: 'Barat, Sangeet & Reception schedules' }
    ],
    packages: [
      {
        name: 'Bespoke Wedding Curation',
        duration: 'Full Wedding Festivities',
        details: [
          'Theme Selection & Setup Design',
          'Catering & Vendor Coordination',
          'Logistics & Guest RSVP Tracking',
          'Staging & Audio Support'
        ]
      },
      {
        name: 'Grand Luxury Wedding',
        duration: 'Multi-Day Destination Celebrations',
        details: [
          'Complete Venue & Staging Makeovers',
          'VIP Concierge & Transport Grids',
          'Custom Choreography & Staging Support',
          'Full Cinematic Media Coverage Pack'
        ]
      }
    ],
    faqs: [
      { q: 'Do you offer custom theme building?', a: 'Yes, our design team drafts 3D renders of custom stages, entrances, and table setups for your approval.' },
      { q: 'How do you handle guest transport?', a: 'We set up a central hospitality desk to manage hotel check-ins, local transfers, and airport pickups.' }
    ]
  },
  'birthday-celebrations': {
    title: 'Birthday & Private Celebrations',
    tagline: 'Custom themes, vibrant styling, and intimate event coordination.',
    description: 'Crafting unforgettable milestones and intimate celebrations. Whether it is a grand milestone birthday, an anniversary, or a private dinner, we design customized experiences with curated styling.',
    icon: 'Cake',
    heroImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1800',
    techStack: [
      { name: 'Custom Themes', detail: 'Milestone, neon or vintage layouts' },
      { name: 'Dessert Styling', detail: 'Curated gourmet cake & food styling' },
      { name: 'Interactive Zones', detail: 'Photo booths & activity spaces' },
      { name: 'Intimate Lighting', detail: 'Fairy lights & ambient profile systems' }
    ],
    packages: [
      {
        name: 'Essential Celebration Pack',
        duration: 'Intimate Gatherings',
        details: [
          'Custom Theme Decor & Entryway',
          'Audio Sound Box & Ambient Lights',
          'Activity/Game Coordination',
          'Photo Booth Setup'
        ]
      },
      {
        name: 'Grand Private Gala',
        duration: 'Milestone Parties',
        details: [
          'Premium Ballroom Staging',
          'Dynamic LED Backdrops',
          'Curated Professional Anchors/DJs',
          'Cinematic Photo & Highlight Reel'
        ]
      }
    ],
    faqs: [
      { q: 'Do you manage food and beverage layouts?', a: 'Yes, we work with custom catering teams to align food stalls with the overall party theme.' },
      { q: 'What is the minimum guest size?', a: 'We plan events for everything from intimate dinners of 20 guests to massive celebrations of over 1000.' }
    ]
  },
  'event-logistics': {
    title: 'Event Coordination & Logistics',
    tagline: 'Precise vendor alignment, RSVP tracking, and on-ground management.',
    description: 'The backbone of every successful production. We manage complex crowd management, vendor operations, scheduling, permits, security grids, and physical logistics mapping for events of all scales.',
    icon: 'Truck',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1800',
    techStack: [
      { name: 'Fleet Tracking', detail: 'On-time venue transport grids' },
      { name: 'Permit Liaison', detail: 'Local civic & sound clearances' },
      { name: 'Crew Distribution', detail: 'Dedicated ground managers & routes' },
      { name: 'Safety Planning', detail: 'First-aid points & fire clearances' }
    ],
    packages: [
      {
        name: 'Operational Logistics Plan',
        duration: 'Single Venue Events',
        details: [
          'Vendor Timing Coordination',
          'Equipment Load-in/out Scheduling',
          'Basic Security & Flow Planning',
          'Permit Clearance Filings'
        ]
      },
      {
        name: 'Full-Scale Staging Grid',
        duration: 'High-Profile Arenas',
        details: [
          'Fleet & Valet Management System',
          'VIP Protection & Escort Routes',
          'Medical & Fire Safety Compliance',
          'Multi-Agency On-Ground Command Desk'
        ]
      }
    ],
    faqs: [
      { q: 'How do you prevent scheduling delays?', a: 'We design detailed production runsheets specifying exact load-in times for all staging crews.' },
      { q: 'Do you secure sound and local permits?', a: 'Yes, our logistics team coordinates with police and civic boards to obtain sound and assembly clearances.' }
    ]
  },
  'media-production': {
    title: 'Media Production',
    tagline: 'High-fidelity photography, videography, and commercial film assets.',
    description: 'Staging high-quality visuals. Our camera units and production crews deliver professional event photography, drone flythroughs, corporate films, promotional videos, and full live coverage in pristine formats.',
    icon: 'Video',
    heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800',
    techStack: [
      { name: 'Cinema Sensors', detail: 'RED V-Raptor 8K & Sony FX9' },
      { name: 'Drone Payloads', detail: 'Zenmuse X9-8K aerial flight units' },
      { name: 'Fast Delivery', detail: 'ACES color pipelines & DaVinci grading' },
      { name: 'Staged Stills', detail: 'High-resolution premium photography' }
    ],
    packages: [
      {
        name: 'Cinema Highlights',
        duration: 'Single Day Coverage',
        details: [
          '2 Lead Cinematographers',
          '4K Master File Deliverables',
          '3-Minute Edited Highlight Film',
          'Color Graded Stills'
        ]
      },
      {
        name: 'Elite Production Set',
        duration: 'Multi-Day Events',
        details: [
          'Multi-Cam Setup + Jib Crane',
          '8K Raw Cinema Backup',
          '10-Minute Narrative Aftermovie',
          'Licensed Drone Flythrough Sequences'
        ]
      }
    ],
    faqs: [
      { q: 'What is the delivery turnaround?', a: 'Highlight reels are delivered within 14 days, with options for 48-hour express production.' },
      { q: 'Can we get all raw footage?', a: 'Yes, we transfer all unedited files onto high-speed SSDs upon project wrap.' }
    ]
  },
  'creative-services': {
    title: 'Creative Services',
    tagline: 'Branding, graphic design, and custom motion animation assets.',
    description: 'Sculpting the visual identity of your events. We craft custom event logos, stage graphics, social media promotions, physical brochures, flyers, and dynamic motion animations to drive engagement.',
    icon: 'Palette',
    heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1800',
    techStack: [
      { name: 'Vector Branding', detail: 'Illustrator logo & branding guidelines' },
      { name: 'Dynamic Animation', detail: 'After Effects stage loops' },
      { name: 'Print Specs', detail: 'High-resolution CMYK print files' },
      { name: 'Stage Visuals', detail: 'Thematic backdrop presentation layouts' }
    ],
    packages: [
      {
        name: 'Event Branding Pack',
        duration: 'Visual Collaterals',
        details: [
          'Custom Logo & Identity Guides',
          'Print-Ready Flyer & Brochure Layouts',
          'Sticker & Badge Vector Assets',
          'Digital Invite Designs'
        ]
      },
      {
        name: 'Motion & Stage Graphics',
        duration: 'High-Impact Screen Assets',
        details: [
          'Custom Stage LED Loop Animations',
          '3D Countdown Motion Graphics',
          'Social Media Promo Videos',
          'Dynamic Presentation Master Deck'
        ]
      }
    ],
    faqs: [
      { q: 'Can you work with existing brand guides?', a: 'Absolutely. We align all typography, colors, and asset sizes with your corporate design system.' },
      { q: 'Do you provide print services?', a: 'We provide print-ready source files, and can coordinate with printing vendors for quality checks.' }
    ]
  },
  'digital-marketing': {
    title: 'Digital Marketing',
    tagline: 'Strategic social campaigns, content creation, and event promotion.',
    description: 'Amplifying event reach and brand presence. We specialize in target audience generation, social media management, organic search optimization, online ticket promotions, and targeted ad campaigns.',
    icon: 'Megaphone',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1800',
    techStack: [
      { name: 'Targeted Campaigns', detail: 'Meta Ads Manager & Search PPC' },
      { name: 'Content Copy', detail: 'Campaign scriptwriting & copy' },
      { name: 'Traffic Monitoring', detail: 'Pixel trackers & analytics integrations' },
      { name: 'SEO Auditing', detail: 'Optimizing local search keywords' }
    ],
    packages: [
      {
        name: 'Social Promotion Pack',
        duration: '4-Week Campaigns',
        details: [
          'Meta & Search Ad Account Setup',
          'Creative Graphic Advertisements',
          'Weekly Performance Reports',
          'Target Location Optimization'
        ]
      },
      {
        name: 'Omnichannel Amplification',
        duration: 'Complete Campaign Management',
        details: [
          'Viral Content Reels & Script Writing',
          'PR Outreach & Online Press Releases',
          'Ticketing Platform System Integration',
          'SEO Booster for Event Pages'
        ]
      }
    ],
    faqs: [
      { q: 'Do you guarantee event ticket sales?', a: 'While ticket sales depend on artist draw, our campaigns maximize reach and click-through rates.' },
      { q: 'Is the budget for ads included?', a: 'Ad spends are paid directly to the platforms, while our package covers strategy, design, and management.' }
    ]
  },
  'event-production': {
    title: 'Event Production',
    tagline: 'Stage design, LED walls, audio systems, and professional lighting.',
    description: 'Building spectacular environments. We construct heavy-duty stages, deploy massive LED screens, design custom truss setups, align sound systems, and install professional light rigs for maximum sensory impact.',
    icon: 'Layers',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1800',
    techStack: [
      { name: 'LED Screens', detail: 'High-pitch indoor/outdoor grids' },
      { name: 'Concert Audio', detail: 'Line arrays & professional mixing' },
      { name: 'Heavy Trussing', detail: 'Aluminum stage & backdrop frames' },
      { name: 'Lighting Rigs', detail: 'Moving heads, beam lasers & washes' }
    ],
    packages: [
      {
        name: 'Staging & Sound Rig',
        duration: 'Standard Production Scale',
        details: [
          'Truss Backdrop & stage panels',
          'Professional Stage Lighting',
          'Point-Source Front Sound System',
          'On-Site Technical Crew'
        ]
      },
      {
        name: 'Elite Arena Production',
        duration: 'Concert & Large Scale Festivals',
        details: [
          'Heavy Duty Aluminum Trussing Grid',
          'Massive Pixel-Pitch LED Screen Walls',
          'Line Array Concert Audio System',
          'Interactive Beam Lasers & Moving Lights'
        ]
      }
    ],
    faqs: [
      { q: 'Do you supply backup power?', a: 'Yes, we provide silent generator units sized to cover the entire audio and stage lighting draw.' },
      { q: 'Are your stages certified?', a: 'All our heavy truss setups and stage platforms undergo standard safety load calculations.' }
    ]
  },
  'talent-entertainment': {
    title: 'Talent & Entertainment',
    tagline: 'Artist bookings, live bands, celebrity scheduling, and performers.',
    description: 'Elevating events with elite entertainment. We manage direct booking and coordination for celebrities, event hosts, DJs, live acoustic bands, classical dancers, and custom performance acts.',
    icon: 'Users',
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1800',
    techStack: [
      { name: 'Artist Booking', detail: 'Direct agency liaising' },
      { name: 'Runschedules', detail: 'Soundcheck & performance timing' },
      { name: 'Rider Compliance', detail: 'Technical & hospitality riders' },
      { name: 'Backstage Ops', detail: 'Green room styling & security' }
    ],
    packages: [
      {
        name: 'Host & Live Music Booking',
        duration: 'Event Night Scheduling',
        details: [
          'Professional Anchor/Emcee Allocation',
          'Local Acoustic Bands Booking',
          'Soundcheck & Staging Support',
          'Backstage Coordinator allocation'
        ]
      },
      {
        name: 'Elite Artist Show',
        duration: 'High-Profile Performances',
        details: [
          'Celebrity/A-list Booking Liaison',
          'Full Rider Compliance Audits',
          'Sound, Light & Visual Staged Cues',
          'VIP Backstage Control & Escorts'
        ]
      }
    ],
    faqs: [
      { q: 'How are artist fees paid?', a: 'Artist fees are paid directly to the management, while our package covers booking liaison and runsheet control.' },
      { q: 'Can you suggest acts for our theme?', a: 'Yes, our booking office provides customized artist rosters based on your target audience.' }
    ]
  },
  'equipment-rental': {
    title: 'Equipment Rental',
    tagline: 'High-end audio, video, lighting, and stage hardware.',
    description: 'Rent premium event hardware on demand. We provide industry-standard sound boards, high-definition LED screens, stage lights, digital projectors, and advanced live-streaming hardware packages.',
    icon: 'Wrench',
    heroImage: 'https://images.unsplash.com/photo-1484755560693-a4074577af3a?w=1800',
    techStack: [
      { name: 'Hardware Audits', detail: 'High-frequency gear testing' },
      { name: 'On-Time Delivery', detail: 'Dedicated transport fleet' },
      { name: 'Setup Assistance', detail: 'Cabling & sound profile calibration' },
      { name: 'Backup Spares', detail: 'Zero operational downtime spares' }
    ],
    packages: [
      {
        name: 'Basic Gear Rental',
        duration: 'On-Demand Setup',
        details: [
          'Sound Monitors & Wired Mics',
          'Projectors & Stand Screens',
          'Basic LED Lights & Cable Rigs',
          'Equipment Setup Engineers'
        ]
      },
      {
        name: 'Premium System Rental',
        duration: 'High-End Configuration',
        details: [
          'Full Sound Line-Array Systems',
          'Pixel-Pitch LED Panels & Stands',
          'Digital Mixing & Audio Boards',
          'Backup Silent Power Generators'
        ]
      }
    ],
    faqs: [
      { q: 'Do you supply technicians with the rental?', a: 'Yes, all our rentals include certified equipment operators to set up and control the hardware.' },
      { q: 'Can we rent individual items?', a: 'Certainly. We accommodate custom gear orders from individual microphones to massive LED setups.' }
    ]
  }
};

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPkg, setSelectedPkg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchService = async () => {
      try {
        setLoading(true);
        const dbService = await api.getServiceById(id);
        const staticData = SERVICE_DATA[id] || {
          techStack: [
            { name: 'On-Ground Direction', detail: 'Runschedules & stage management' },
            { name: 'Vendor Liaison', detail: 'Logistics, permits & clearances' },
            { name: 'RSVP Grids', detail: 'Invitee check-lists & tracking' },
            { name: 'Technical Support', detail: 'Stage lighting & audio support' }
          ],
          packages: [
            {
              name: 'Standard Execution',
              duration: 'Standard Execution Flow',
              details: [
                'End-to-End Coordination',
                'Staging Sound & Light Coordination',
                'Event Runsheets & Schedules',
                'Technical Crew Support'
              ]
            },
            {
              name: 'Bespoke Premium Setup',
              duration: 'Premium Production Staging',
              details: [
                'Full Venue Styling Design',
                'Direct Creative Direction',
                '24/7 Staging Coordination Desk',
                'Custom Visual Loops & Displays'
              ]
            }
          ],
          faqs: [
            { q: 'What is the booking window?', a: 'We recommend initiating the brief at least 4-6 weeks prior to the event date to secure crew schedules.' },
            { q: 'Do you support custom configurations?', a: 'Yes, we customize sound, lighting, and stage setup size to match your exact spatial requirements.' }
          ]
        };

        const mergedService = {
          id: dbService.id,
          title: dbService.title,
          tagline: dbService.tagline,
          description: dbService.description,
          banner: dbService.banner || staticData.heroImage,
          icon: dbService.icon,
          techStack: staticData.techStack,
          packages: staticData.packages,
          faqs: staticData.faqs
        };
        setService(mergedService);
        if (mergedService.packages && mergedService.packages.length > 0) {
          setSelectedPkg(mergedService.packages[0].name);
        }
      } catch (err) {
        console.error('Failed to load service from DB, falling back to static data:', err);
        const staticService = SERVICE_DATA[id];
        if (staticService) {
          const mappedStatic = {
            id,
            title: staticService.title,
            tagline: staticService.tagline,
            description: staticService.description,
            banner: staticService.heroImage,
            icon: staticService.icon,
            techStack: staticService.techStack,
            packages: staticService.packages,
            faqs: staticService.faqs
          };
          setService(mappedStatic);
          setSelectedPkg(staticService.packages[0].name);
        } else {
          setService(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchService();
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
        <Link to="/" className="inline-flex items-center text-white bg-accent-primary hover:bg-red-700 px-6 py-3 rounded-xl transition-all">
          <Icons.ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
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
          <Icons.ArrowLeft className="w-4 h-4 mr-2" /> Back to Capabilities
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
