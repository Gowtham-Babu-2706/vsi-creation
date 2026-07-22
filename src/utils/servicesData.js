// ─── Static Services Data ───────────────────────────────────────────
// This file contains all 12 services with their complete data.
// No API fetch is needed — both ServicesPage and ServiceDetail read from here.

export const SERVICES = [
  {
    id: 'corporate-event-management',
    slug: 'corporate-event-management',
    num: '01',
    serviceIndex: 1,
    title: 'Corporate Event Management',
    tagline: 'End-to-end corporate event planning with flawless execution and premium production.',
    description: 'VSI Creations specializes in planning and managing corporate conferences, annual meetings, product launches, employee engagement programs, business summits, and networking events. Our team handles venue selection, stage production, LED walls, lighting, sound systems, registration, branding, guest management, and on-site coordination to deliver professional and memorable corporate experiences.',
    icon: 'Briefcase',
    banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
    heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800',
    techStack: [
      { name: 'Venue Selection', detail: 'Premium locations & layout planning' },
      { name: 'Stage Production', detail: 'LED walls, lighting & sound systems' },
      { name: 'Guest Management', detail: 'Registration, branding & hospitality' },
      { name: 'On-Site Coordination', detail: 'Runsheets & live event direction' }
    ],
    packages: [
      {
        name: 'Corporate Standard',
        duration: 'Single Day Events',
        details: [
          'Venue Selection & Setup',
          'Stage & AV Production',
          'Registration & Branding',
          'On-Site Coordination Team'
        ]
      },
      {
        name: 'Premium Corporate Suite',
        duration: 'Multi-Day Conferences & Summits',
        details: [
          'Full Venue Makeover & Custom Staging',
          'LED Walls & Intelligent Lighting',
          'VIP Guest Hospitality & Concierge',
          '24/7 Production Command Desk'
        ]
      }
    ],
    faqs: [
      { q: 'How far in advance should we book?', a: 'We recommend booking at least 4-6 weeks ahead for standard events, and 8-12 weeks for large-scale summits.' },
      { q: 'Do you handle multi-city corporate events?', a: 'Yes, our team coordinates concurrent events across multiple venues and cities.' }
    ]
  },
  {
    id: 'awards-function',
    slug: 'awards-function',
    num: '02',
    serviceIndex: 2,
    title: 'Awards Function Management',
    tagline: 'Elegant award ceremonies designed to celebrate excellence with premium event production.',
    description: 'We organize prestigious awards nights featuring luxury stage design, LED displays, intelligent lighting, audiovisual production, entertainment, scripting, hosting, photography, videography, and VIP guest management to ensure a seamless celebration.',
    icon: 'Trophy',
    banner: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200',
    heroImage: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1800',
    techStack: [
      { name: 'Luxury Stage Design', detail: 'Custom award-show staging & backdrops' },
      { name: 'AV Production', detail: 'LED displays & intelligent lighting' },
      { name: 'Scripting & Hosting', detail: 'Professional anchors & show flow' },
      { name: 'VIP Management', detail: 'Guest hospitality & red carpet ops' }
    ],
    packages: [
      {
        name: 'Classic Awards Night',
        duration: 'Single Evening Ceremony',
        details: [
          'Themed Stage & Backdrop Design',
          'AV & Lighting Production',
          'Professional Hosting & Scripting',
          'Photography & Videography'
        ]
      },
      {
        name: 'Grand Gala Production',
        duration: 'Premium Multi-Segment Ceremony',
        details: [
          'Luxury Stage with LED Walls',
          'Entertainment Acts & Live Performances',
          'VIP Red Carpet & Guest Management',
          'Cinematic Highlight Film Production'
        ]
      }
    ],
    faqs: [
      { q: 'Can you create custom award trophies?', a: 'We partner with premium trophy designers and can create fully customized awards and certificates.' },
      { q: 'Do you provide event hosting?', a: 'Yes, we arrange professional emcees and can script the entire ceremony flow.' }
    ]
  },
  {
    id: 'celebrity-management',
    slug: 'celebrity-management',
    num: '03',
    serviceIndex: 3,
    title: 'Celebrity Management',
    tagline: 'Professional celebrity coordination from arrival to stage appearance.',
    description: 'Our celebrity management services include talent booking, airport transfers, hospitality, accommodation, backstage management, security coordination, media interaction, scheduling, and VIP guest experiences for brand launches, concerts, and promotional events.',
    icon: 'Star',
    banner: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200',
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1800',
    techStack: [
      { name: 'Talent Booking', detail: 'Direct artist & celebrity liaison' },
      { name: 'Hospitality', detail: 'Airport transfers & accommodation' },
      { name: 'Backstage Ops', detail: 'Green room & security coordination' },
      { name: 'Media Interaction', detail: 'Press meets & photo ops scheduling' }
    ],
    packages: [
      {
        name: 'Standard Celebrity Coordination',
        duration: 'Single Event Appearance',
        details: [
          'Talent Booking & Contracts',
          'Airport Pickup & Drop',
          'Backstage Management',
          'Security Escort Team'
        ]
      },
      {
        name: 'Elite Celebrity Suite',
        duration: 'Multi-Day Engagement',
        details: [
          'Full Rider Compliance & Hospitality',
          'Luxury Accommodation & Transport',
          'Media Interaction Scheduling',
          'VIP Backstage Control & Escorts'
        ]
      }
    ],
    faqs: [
      { q: 'How are artist fees handled?', a: 'Artist fees are paid directly to their management. Our package covers booking liaison, logistics, and on-ground coordination.' },
      { q: 'Can you arrange meet-and-greet sessions?', a: 'Yes, we coordinate VIP meet-and-greet sessions with security and media protocols.' }
    ]
  },
  {
    id: 'concert-production',
    slug: 'concert-production',
    num: '04',
    serviceIndex: 4,
    title: 'Concert & Music Festival Production',
    tagline: 'World-class live entertainment production with immersive stage experiences.',
    description: 'VSI Creations delivers complete concert production services including stage fabrication, professional audio systems, LED walls, intelligent lighting, artist hospitality, backstage operations, crowd management, security coordination, and live event production.',
    icon: 'Music',
    banner: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200',
    heroImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1800',
    techStack: [
      { name: 'Stage Fabrication', detail: 'Heavy-duty truss & custom platforms' },
      { name: 'Concert Audio', detail: 'Line arrays & professional mixing' },
      { name: 'LED & Lighting', detail: 'Intelligent lights & laser systems' },
      { name: 'Crowd Management', detail: 'Security grids & flow planning' }
    ],
    packages: [
      {
        name: 'Concert Staging Pack',
        duration: 'Single Day Live Shows',
        details: [
          'Stage Setup & Truss Structures',
          'Professional Sound System',
          'Stage Lighting Design',
          'Artist Backstage Coordination'
        ]
      },
      {
        name: 'Elite Festival Production',
        duration: 'Multi-Day Music Festivals',
        details: [
          'Massive LED Screen Walls',
          'Line Array Concert Audio',
          'Interactive Beam Lasers & Moving Lights',
          'Full Crowd & Security Management'
        ]
      }
    ],
    faqs: [
      { q: 'Do you supply backup power for concerts?', a: 'Yes, we provide silent generator units sized to cover the entire audio and lighting draw.' },
      { q: 'Can you handle outdoor festival stages?', a: 'Absolutely. We design weather-proof staging, trussing, and sound setups for outdoor venues.' }
    ]
  },
  {
    id: 'sports-event-management',
    slug: 'sports-event-management',
    num: '05',
    serviceIndex: 5,
    title: 'Marathon & Sports Event Management',
    tagline: 'Professional planning and execution for sports competitions and marathons.',
    description: 'We organize marathons, sports tournaments, cycling events, fitness challenges, and school competitions with registration management, route planning, volunteer coordination, timing systems, hydration stations, medical support, branding, and finish-line celebrations.',
    icon: 'Medal',
    banner: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200',
    heroImage: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1800',
    techStack: [
      { name: 'Route Planning', detail: 'GPS mapping & course design' },
      { name: 'Timing Systems', detail: 'Chip timing & leaderboards' },
      { name: 'Volunteer Coordination', detail: 'Team management & assignments' },
      { name: 'Medical Support', detail: 'First-aid stations & ambulance standby' }
    ],
    packages: [
      {
        name: 'Standard Sports Event',
        duration: 'Single Day Competitions',
        details: [
          'Registration & Bib Management',
          'Route Planning & Safety Marshals',
          'Hydration & Aid Stations',
          'Finish-Line Setup & Branding'
        ]
      },
      {
        name: 'Premium Marathon Production',
        duration: 'Large-Scale Marathon Events',
        details: [
          'Chip Timing & Digital Leaderboards',
          'Full Medical & Safety Infrastructure',
          'Celebrity Flagoff & Entertainment',
          'Live Streaming & Media Coverage'
        ]
      }
    ],
    faqs: [
      { q: 'Do you handle participant registration?', a: 'Yes, we manage complete online and on-ground registration with bib allocation and timing chips.' },
      { q: 'Can you organize school sports events?', a: 'Absolutely. We have dedicated packages for inter-school and college sports competitions.' }
    ]
  },
  {
    id: 'csr-projects',
    slug: 'csr-projects',
    num: '06',
    serviceIndex: 6,
    title: 'CSR Project Management',
    tagline: 'Meaningful CSR initiatives that create lasting community impact.',
    description: 'Our CSR event solutions include environmental campaigns, medical camps, educational initiatives, blood donation drives, community development projects, volunteer management, government coordination, branding, documentation, and media coverage.',
    icon: 'HeartHandshake',
    banner: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200',
    heroImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1800',
    techStack: [
      { name: 'Campaign Planning', detail: 'Environmental & social initiatives' },
      { name: 'Volunteer Management', detail: 'Recruitment, training & coordination' },
      { name: 'Government Liaison', detail: 'Permits & official partnerships' },
      { name: 'Documentation', detail: 'Impact reports & media coverage' }
    ],
    packages: [
      {
        name: 'Community Initiative',
        duration: 'Single Day CSR Events',
        details: [
          'Event Planning & Coordination',
          'Volunteer Recruitment & Management',
          'Branding & Promotional Materials',
          'Photo & Video Documentation'
        ]
      },
      {
        name: 'Grand CSR Campaign',
        duration: 'Multi-Phase Impact Projects',
        details: [
          'Government & NGO Coordination',
          'Medical Camps & Health Drives',
          'Full Media Coverage & PR',
          'Impact Assessment & Reporting'
        ]
      }
    ],
    faqs: [
      { q: 'Do you help with CSR compliance reporting?', a: 'Yes, we provide complete documentation, impact assessments, and compliance-ready reports.' },
      { q: 'Can you coordinate with government bodies?', a: 'We handle all government coordination including permits, partnerships, and official approvals.' }
    ]
  },
  {
    id: 'awareness-campaigns',
    slug: 'awareness-campaigns',
    num: '07',
    serviceIndex: 7,
    title: 'Awareness Campaign Management',
    tagline: 'Inspiring public engagement through impactful awareness programs.',
    description: 'We organize public awareness campaigns on road safety, health, education, environmental conservation, and social responsibility with stage production, creative branding, public engagement activities, volunteers, and promotional materials.',
    icon: 'Megaphone',
    banner: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800',
    techStack: [
      { name: 'Campaign Design', detail: 'Creative messaging & branding' },
      { name: 'Stage Production', detail: 'Public engagement setups' },
      { name: 'Volunteer Teams', detail: 'Trained field coordinators' },
      { name: 'Promotional Materials', detail: 'Banners, brochures & giveaways' }
    ],
    packages: [
      {
        name: 'Standard Awareness Drive',
        duration: 'Single Day Campaigns',
        details: [
          'Campaign Theme & Branding',
          'Stage & Sound Setup',
          'Volunteer Coordination',
          'Promotional Material Distribution'
        ]
      },
      {
        name: 'Grand Awareness Campaign',
        duration: 'Multi-City Public Programs',
        details: [
          'Celebrity Endorsements & Ambassadors',
          'Digital & Social Media Campaign',
          'Government & NGO Partnerships',
          'Full Media Coverage & Documentation'
        ]
      }
    ],
    faqs: [
      { q: 'Can you organize road safety campaigns?', a: 'Yes, we design and execute comprehensive road safety awareness programs with government coordination.' },
      { q: 'Do you handle social media promotion?', a: 'We provide end-to-end digital campaigns including social media content, ads, and influencer outreach.' }
    ]
  },
  {
    id: 'product-launch',
    slug: 'product-launch',
    num: '08',
    serviceIndex: 8,
    title: 'Product Launch Events',
    tagline: 'Launch your brand with unforgettable event experiences.',
    description: 'From concept development to execution, we create impactful product launches with premium staging, LED screens, special effects, media management, influencer coordination, live streaming, branding, and audience engagement.',
    icon: 'Rocket',
    banner: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200',
    heroImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1800',
    techStack: [
      { name: 'Concept Development', detail: 'Theme creation & brand alignment' },
      { name: 'Premium Staging', detail: 'LED screens & special effects' },
      { name: 'Media Management', detail: 'Press coverage & live streaming' },
      { name: 'Influencer Coordination', detail: 'Social media amplification' }
    ],
    packages: [
      {
        name: 'Standard Product Launch',
        duration: 'Single Product Reveal',
        details: [
          'Concept Design & Theme Development',
          'Stage & AV Production',
          'Media Invitations & Coverage',
          'Branding & Promotional Materials'
        ]
      },
      {
        name: 'Grand Brand Launch',
        duration: 'Multi-Product Showcase Events',
        details: [
          'Premium LED Stage & Special Effects',
          'Influencer & Celebrity Coordination',
          'Live Streaming & Multi-Camera Setup',
          'Full Digital Marketing Campaign'
        ]
      }
    ],
    faqs: [
      { q: 'Can you handle virtual product launches?', a: 'Yes, we provide full live streaming, virtual event platforms, and remote audience engagement solutions.' },
      { q: 'Do you coordinate with media houses?', a: 'We manage complete press relations including media invites, press kits, and post-event coverage.' }
    ]
  },
  {
    id: 'exhibition-management',
    slug: 'exhibition-management',
    num: '09',
    serviceIndex: 9,
    title: 'Exhibition & Expo Management',
    tagline: 'Complete exhibition planning for brands, businesses, and trade expos.',
    description: 'We provide exhibition planning services including booth fabrication, venue management, visitor registration, branding, lighting, audiovisual systems, exhibitor support, logistics, and event operations.',
    icon: 'Building2',
    banner: 'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/1.jpg',
    heroImage: 'https://images.unsplash.com/photo-1591115765373-5f9cf1da2271?w=1800',
    techStack: [
      { name: 'Booth Fabrication', detail: 'Custom stall design & construction' },
      { name: 'Venue Management', detail: 'Layout planning & visitor flow' },
      { name: 'AV Systems', detail: 'Lighting, screens & presentations' },
      { name: 'Exhibitor Support', detail: 'Logistics & on-site assistance' }
    ],
    packages: [
      {
        name: 'Standard Exhibition Setup',
        duration: 'Single Day Trade Shows',
        details: [
          'Booth Design & Fabrication',
          'Visitor Registration System',
          'Basic AV & Lighting',
          'On-Site Coordination'
        ]
      },
      {
        name: 'Premium Expo Production',
        duration: 'Multi-Day Exhibitions',
        details: [
          'Custom Branded Pavilions',
          'Advanced AV & Interactive Displays',
          'VIP Exhibitor Lounges',
          'Full Event Branding & Signage'
        ]
      }
    ],
    faqs: [
      { q: 'Can you design custom exhibition booths?', a: 'Yes, we design and fabricate fully customized booths with brand-specific themes, materials, and interactive elements.' },
      { q: 'Do you handle visitor registration?', a: 'We provide complete digital and on-ground registration systems with badge printing and visitor tracking.' }
    ]
  },
  {
    id: 'wedding-management',
    slug: 'wedding-management',
    num: '10',
    serviceIndex: 10,
    title: 'Wedding Event Management',
    tagline: 'Creating unforgettable wedding celebrations with elegance and perfection.',
    description: 'VSI Creations offers complete wedding planning services including venue decoration, stage design, floral arrangements, entertainment, photography, catering coordination, guest hospitality, logistics, and wedding day management.',
    icon: 'Heart',
    banner: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1800',
    techStack: [
      { name: 'Venue Decoration', detail: 'Custom themes & floral design' },
      { name: 'Stage Design', detail: 'Mandap, reception & sangeet stages' },
      { name: 'Entertainment', detail: 'DJs, live bands & performers' },
      { name: 'Guest Hospitality', detail: 'RSVP, transfers & accommodation' }
    ],
    packages: [
      {
        name: 'Bespoke Wedding Curation',
        duration: 'Full Wedding Festivities',
        details: [
          'Theme Selection & Venue Styling',
          'Catering & Vendor Coordination',
          'Guest RSVP & Transport Logistics',
          'Photography & Videography'
        ]
      },
      {
        name: 'Grand Luxury Wedding',
        duration: 'Multi-Day Destination Celebrations',
        details: [
          'Complete Venue & Stage Makeovers',
          'VIP Concierge & Transport Grids',
          'Custom Choreography & Entertainment',
          'Full Cinematic Media Coverage'
        ]
      }
    ],
    faqs: [
      { q: 'Do you offer custom theme building?', a: 'Yes, our design team drafts 3D renders of custom stages, entrances, and table setups for your approval.' },
      { q: 'How do you handle guest transport?', a: 'We set up a central hospitality desk to manage hotel check-ins, local transfers, and airport pickups.' }
    ]
  },
  {
    id: 'stage-sound-lighting',
    slug: 'stage-sound-lighting',
    num: '11',
    serviceIndex: 11,
    title: 'Stage, Sound & Lighting Solutions',
    tagline: 'Professional event production powered by cutting-edge technology.',
    description: 'We provide premium stage fabrication, truss structures, LED video walls, intelligent lighting, line-array sound systems, wireless microphones, generators, live production control, and technical support for events of every scale.',
    icon: 'Lightbulb',
    banner: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1800',
    techStack: [
      { name: 'Stage Fabrication', detail: 'Aluminum truss & custom platforms' },
      { name: 'LED Video Walls', detail: 'Indoor & outdoor pixel-pitch screens' },
      { name: 'Sound Systems', detail: 'Line arrays & wireless microphones' },
      { name: 'Intelligent Lighting', detail: 'Moving heads, beams & washes' }
    ],
    packages: [
      {
        name: 'Standard Production Rig',
        duration: 'Standard Event Scale',
        details: [
          'Truss Backdrop & Stage Panels',
          'Professional Stage Lighting',
          'Point-Source Sound System',
          'On-Site Technical Crew'
        ]
      },
      {
        name: 'Elite Arena Production',
        duration: 'Concert & Large-Scale Festivals',
        details: [
          'Heavy-Duty Aluminum Trussing Grid',
          'Massive LED Screen Walls',
          'Line Array Concert Audio System',
          'Interactive Beam Lasers & Moving Lights'
        ]
      }
    ],
    faqs: [
      { q: 'Do you supply backup power?', a: 'Yes, we provide silent generator units sized to cover the entire audio and stage lighting draw.' },
      { q: 'Are your stages safety certified?', a: 'All our heavy truss setups and stage platforms undergo standard safety load calculations.' }
    ]
  },
  {
    id: 'event-photography',
    slug: 'event-photography',
    num: '12',
    serviceIndex: 12,
    title: 'Event Photography & Videography',
    tagline: 'Capturing every moment with cinematic quality and creative storytelling.',
    description: 'Our creative team delivers professional photography, cinematic videography, drone coverage, live streaming, instant editing, promotional reels, and highlight films to preserve every memorable moment of your event.',
    icon: 'Camera',
    banner: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200',
    heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800',
    techStack: [
      { name: 'Cinema Cameras', detail: 'Professional 4K/8K camera systems' },
      { name: 'Drone Coverage', detail: 'Licensed aerial photography & video' },
      { name: 'Live Streaming', detail: 'Multi-camera live broadcast setup' },
      { name: 'Post-Production', detail: 'Color grading & cinematic editing' }
    ],
    packages: [
      {
        name: 'Cinema Highlights Pack',
        duration: 'Single Day Coverage',
        details: [
          '2 Lead Cinematographers',
          '4K Master File Deliverables',
          '3-Minute Highlight Film',
          'Color Graded Photo Gallery'
        ]
      },
      {
        name: 'Elite Production Suite',
        duration: 'Multi-Day Events',
        details: [
          'Multi-Camera Setup + Jib Crane',
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
  }
];

// Lookup map keyed by service ID (slug) for ServiceDetail page
export const SERVICE_DATA_MAP = {};
SERVICES.forEach(service => {
  SERVICE_DATA_MAP[service.id] = service;
});
