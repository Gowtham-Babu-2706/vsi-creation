import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, Flame, Zap, Camera, Award, Star } from 'lucide-react';
import { useGSAP, SplitText } from '../hooks/useGSAP';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
gsap.registerPlugin(ScrollTrigger);

const PORTFOLIO_DATA = {
  'awards-functions': {
    title: 'Awards Functions',
    subtitle: 'Premium Stage Production & Flawless Ceremony Coordination',
    description: 'End-to-end planning and execution of award ceremonies with premium stage production, lighting, audiovisual systems, and seamless event coordination. From red carpets to trophies, we create moments that honour excellence.',
    heroImage: '',
    tags: ['Awards Ceremony', 'Stage Production', 'AV Systems', 'Red Carpet'],
    stats: [
      { label: 'Ceremonies Delivered', value: '30+' },
      { label: 'VIP Capacity', value: '3,000' },
      { label: 'Stage Width', value: '80 Feet' },
      { label: 'Camera Coverage', value: '360°' },
    ],
    features: [
      'Custom trophy podium stage designs with luxury lighting rigs.',
      'Broadcast-grade multi-camera capture for live streaming & replay.',
      'Full red carpet setup with branded step-and-repeat backdrops.',
      'Seamless MC support, scripting coordination & cue management.',
    ],
    gallery: [
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/kamala.png',
      'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/images_pecry1.jpg',
      'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/EakUcqCCzAr9zd4ndKWcHNM5pWaj0GllkUm6zjdL4uWtBUJHShs6KYbJz_0QBBWh7eX2uyVJfJjOh6IY2k_XzUAbcqqXV7JWz0b0cwVRZ9WIJ2UfsxlJOJORUdfDPW_QOzWgPzjK7EJLOL0whiCrRxqZoyk26EZFuNopJ1o3xNTwAfV246z-TJ5wKrWr4zbe_vriexx.jpg',
      'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/-W7QpIPGAxXN9yz0qXpk_8S6yg90u1uFv80FCEQa0ksAaIGR0a8z9NE_r64FzKyGkVwYlm0oPgUMuxH63aruDFPbW9Rr8yvutXQJj1hFPl07SYTfcOnwL9W33WzXfs41gUIvnj_HFX7FTwKi946x86ls_IJz122c79fW1Y-tstZ4C0iApqAbmZaHBEKpo-hq_1_j0p70j.jpg'
    ]
  },
  'sports-events': {
    title: 'Sports Events',
    subtitle: 'High-Energy Tournaments & Stadium Production',
    description: 'Professional management of sports tournaments, marathons, leagues, and stadium events with complete production and logistics support. We bring the roar of the crowd to life with world-class infrastructure.',
    heroImage: 'https://res.cloudinary.com/dfjsh2zel/image/upload/hero_section_background_image_for_202606291753_icypn0.jpg',
    tags: ['Sports Tournament', 'Stadium Production', 'Live Broadcast', 'Logistics'],
    stats: [
      { label: 'Events Managed', value: '25+' },
      { label: 'Peak Attendance', value: '50,000+' },
      { label: 'Broadcast Cameras', value: '12 Units' },
      { label: 'LED Scoreboard', value: 'Full HD' },
    ],
    features: [
      'Giant LED scoreboards and real-time data display systems.',
      'PA sound systems engineered for outdoor stadium acoustics.',
      'Multi-camera live broadcast with instant replay infrastructure.',
      'Full logistics support: ticketing, crowd control, and VIP zones.',
    ],
    gallery: [
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/VSI/1.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/VSI/images.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/VSI/4.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/VSI/sports-event-management-company-in-chandigarh-1170x650.webp'
    ]
  },
  'music-festivals': {
    title: 'Music Concerts',
    subtitle: 'High-Decibel Immersive Stage Systems',
    description: 'Large-scale music festivals featuring world-class stage production, immersive lighting, premium sound systems, and audience engagement. Our festival setups combine custom steel deck trussing, high-intensity laser grids, and line-array acoustics tuned for high-fidelity outdoor distribution.',
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
      'Synchronized timeline lasers and cryo-jet CO2 effects.',
      'LED wall video mapping with live VJ performance inputs.',
      'Rigid certified ground support structures capable of heavy payload rigging.',
    ],
    gallery: [
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/Music+Concert/5.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/Music+Concert/3.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/Music+Concert/1.png'
    ]
  },
  'concert-shows': {
    title: 'Arena Concert Shows',
    subtitle: 'High-Energy Concert Production & Crowd Experience',
    description: 'High-energy concert production with custom staging, advanced lighting, live sound engineering, and crowd management. We engineer immersive arena experiences that leave audiences breathless.',
    heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1800',
    tags: ['Arena Production', 'Live Sound', 'Crowd Management', 'Pyrotechnics'],
    stats: [
      { label: 'Arena Capacity', value: '20,000+' },
      { label: 'Stage Rigging', value: '120 Tons' },
      { label: 'Moving Lights', value: '350+ Units' },
      { label: 'Sound Coverage', value: '360° Array' },
    ],
    features: [
      'Custom arena staging with motorized set pieces and flying rigs.',
      'Full arena sound calibration using real-time acoustic modeling.',
      'Pyrotechnics, confetti cannons, and aerial performer integration.',
      'Broadcast-ready live mixing and IEM monitoring for all performers.',
    ],
    gallery: [
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/Music+Concert/2.png',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/Music+Concert/1.png',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/Music+Concert/4.png'
    ]
  },
  'celebrity-management': {
    title: 'Celebrity Management',
    subtitle: 'End-to-End Artist Coordination & Hospitality',
    description: 'Complete celebrity engagement services, artist coordination, hospitality, logistics, and on-ground management. From booking to backstage, we ensure every artist feels like royalty.',
    heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800',
    tags: ['Artist Booking', 'Hospitality', 'Logistics', 'Green Room Setup'],
    stats: [
      { label: 'Artists Managed', value: '100+' },
      { label: 'Cities Covered', value: '20+' },
      { label: 'Dedicated Crew', value: '50+ Staff' },
      { label: 'Satisfaction Rate', value: '100%' },
    ],
    features: [
      'Comprehensive artist rider fulfilment and green room setup.',
      'Airport-to-venue executive transport and security coordination.',
      'On-site personal assistants and 24/7 celebrity hospitality teams.',
      'Press & media interaction management and brand alignment.',
    ],
    gallery: [
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/Celebrity+management/1.png',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/Celebrity+management/2.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/Celebrity+management/3.jpg'
    ]
  },
  'csr-projects': {
    title: 'CSR Projects',
    subtitle: 'Strategic Corporate Social Responsibility Execution',
    description: 'Strategic planning and execution of Corporate Social Responsibility programs that create meaningful community impact. We help brands tell their purpose-driven stories through powerful, on-ground activations.',
    heroImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1800',
    tags: ['Community Impact', 'Brand Purpose', 'On-ground Activation', 'Media Coverage'],
    stats: [
      { label: 'CSR Projects', value: '40+' },
      { label: 'Communities Reached', value: '200+' },
      { label: 'Beneficiaries', value: '10,000+' },
      { label: 'Media Impressions', value: '5M+' },
    ],
    features: [
      'End-to-end CSR campaign conceptualisation and execution.',
      'Community engagement programs with NGO partnerships.',
      'Live documentation & PR-ready media production.',
      'Impact reports and stakeholder communications support.',
    ],
    gallery: [
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/CSRprojects/1.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/CSRprojects/2.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/CSRprojects/3.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/CSRprojects/4.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/CSRprojects/5.jpg'
    ]
  },
  'corporate-projects': {
    title: 'Corporate Events & Summits',
    subtitle: 'Professional Conference & Leadership Summit Production',
    description: 'Professional conferences, product launches, annual meetings, leadership summits, and corporate event production. We set the stage for ideas that move industries forward.',
    heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800',
    tags: ['Conference', 'Product Launch', 'Summit', 'Annual Meet'],
    stats: [
      { label: 'Corporate Events', value: '60+' },
      { label: 'Delegates Hosted', value: '15,000+' },
      { label: 'Keynote Stages', value: '30+' },
      { label: 'Live Streams', value: '50+ Events' },
    ],
    features: [
      'Modular conference staging with seamless AV integration.',
      'Live polling, Q&A systems, and audience engagement tech.',
      'Professional broadcast-quality live streaming setup.',
      'Brand-consistent décor, signage, and experience design.',
    ],
    gallery: [
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/CE%26S/1.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/CE%26S/2.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/CE%26S/3.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/CE%26S/4.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/CE%26S/5.jpg'
    ]
  },
  'awareness-projects': {
    title: 'Social Awareness Campaigns',
    subtitle: 'Creative Campaigns Driving Community Action',
    description: 'Creative campaigns and public engagement initiatives designed to promote social causes and drive positive community action. We amplify voices that matter with impactful storytelling and on-ground presence.',
    heroImage: 'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/SAC/4.jpg',
    tags: ['Public Campaign', 'Storytelling', 'Community Outreach', 'Social Media'],
    stats: [
      { label: 'Campaigns Executed', value: '35+' },
      { label: 'Audience Reached', value: '2M+' },
      { label: 'Partner NGOs', value: '15+' },
      { label: 'Digital Reach', value: '10M+ Views' },
    ],
    features: [
      'Campaign concept development rooted in social insight and empathy.',
      'Experiential installations designed for maximum public visibility.',
      'Multi-platform digital content production and distribution.',
      'Ground activations with real-time social media amplification.',
    ],
    gallery: [
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/SAC/1.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/SAC/2.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/SAC/3.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/SAC/4.jpg',
      'https://braiilpictures-565122144511-eu-north-1-an.s3.eu-north-1.amazonaws.com/Service+images/SAC/5.jpg'
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

 if (!project) {
    return (
      <div className="min-height-screen bg-bg-main text-black flex flex-col justify-center items-center py-20 px-8">
        <h2 className="text-3xl font-bold text-accent-gold mb-4">Project Not Found</h2>
        <Link to="/" className="inline-flex items-center text-black bg-accent-primary hover:bg-red-700 px-6 py-3 rounded-xl transition-all">
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
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto w-full px-8 pb-12 z-10">
          <Link to="/" className="pd-back-link inline-flex items-center text-accent-primary hover:text-black mb-6 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Masterpieces
          </Link>
          <span className="pd-eyebrow text-[10px] text-accent-gold tracking-widest uppercase font-extrabold bg-accent-primary/20 border border-accent-primary/40 px-3 py-1.5 ml-3 rounded-full">{project.tags[0]}</span>
          <h1 className="pd-title text-4xl md:text-6xl font-extrabold text-black mt-4 tracking-tight leading-tight">
            <>{project.title}</>
          </h1>
          <p className="pd-subtitle text-accent-gold  text-lg md:text-xl font-medium mt-2 max-w-2xl">{project.subtitle}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        {/* Left 2 Columns: Details */}
        <div className="lg:col-span-2 space-y-12">
          {/* Detailed Summary */}
          <section className="pd-section bg-bg-surface/55 backdrop-blur-md border border-white/5 p-8 rounded-[32px] shadow-xl shadow-black/30">
            <h2 className="text-xl font-extrabold text-black mb-4 border-b border-border-color/20 pb-3 font-display tracking-tight">Project Overview</h2>
            <p className="text-text-muted text-sm leading-relaxed font-light">{project.description}</p>
            
            {/* Tags list */}
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="bg-bg-card/45 text-black border border-white/5 text-[10px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider">
                  #{tag}
                </span>
              ))}
            </div>
          </section>



          {/* Photo Gallery Grid */}
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-black border-b border-border-color/20 pb-3 font-display tracking-tight">Project Visuals</h2>
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
      </div>
    </div>
  );
}
