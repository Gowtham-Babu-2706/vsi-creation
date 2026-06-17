import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Cpu, Monitor, Radio, Compass, Video, Sparkles, Send } from 'lucide-react';

const SERVICE_DATA = {
  'cinematography': {
    title: 'Elite Cinematography',
    tagline: 'Multi-cam 4K capture, prime lenses, and cinematic grading.',
    description: 'Our cinema unit deploys industry-standard digital sensor systems alongside specialized high-speed cinema prime lenses. We capture live action with fluid motion stabilizers and customize visual palettes during digital grading to align with luxury brand specifications.',
    icon: Video,
    heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800',
    techStack: [
      { name: 'Sensor Rigs', detail: 'RED V-Raptor 8K & Sony FX9' },
      { name: 'Lens Packages', detail: 'Arri Signature Primes & Cooke Anamorphics' },
      { name: 'Motion Stabilizers', detail: 'Freefly MōVI Pro & Ronin 2 systems' },
      { name: 'Color Space', detail: 'ACES Pipeline, customized Rec2020 LUTS' }
    ],
    packages: [
      { name: 'Cinema Highlight', price: '$4,500', duration: 'Full Day Capture', details: ['1 Lead Cinematographer', '4K Master Files Delivery', '3-Minute Cinematic Trailer', 'Color Graded (DaVinci Resolve)'] },
      { name: 'Premier Multi-Cam', price: '$9,200', duration: 'Multi-Day Events', details: ['3 Cinematographers + Jib', '8K Raw Master Delivery', '10-Minute Narrative Film', 'Full Event Documentary Edit'] }
    ],
    faqs: [
      { q: 'What is your turnaround time for color grading?', a: 'Standard delivery is 14 days, but a 48-hour rush highlight is available upon package upgrade.' },
      { q: 'Do you deliver raw footage?', a: 'Yes, full raw footage backup can be provided on encrypted high-speed SSDs.' }
    ]
  },
  'aerial-assets': {
    title: 'Structural Aerial Assets',
    tagline: 'High-altitude flight mapping and cinematic tracking shots.',
    description: 'Fully licensed drone maneuvers designed to establish venue majesty. We orchestrate dual-operator flight grids, capturing synchronous wide tracking pans and aerial perspective mapping for large-scale outdoor events.',
    icon: Compass,
    heroImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1800',
    techStack: [
      { name: 'UAV Aircraft', detail: 'DJI Inspire 3 & Custom Heavy-Lift FPVs' },
      { name: 'Camera Payloads', detail: 'Zenmuse X9-8K Air' },
      { name: 'Flight Clearance', detail: 'FAA Part 107 Certified / Local airspace mapping' },
      { name: 'Max Flight Time', detail: 'Continuous rotation batteries' }
    ],
    packages: [
      { name: 'Aerial Establishers', price: '$2,800', duration: '4 Hours Active Flight', details: ['1 Certified Drone Pilot', '4K ProRes 422 HQ Clips', '10 Edited Aerial Stills', 'Airspace Clearance Filing Included'] },
      { name: 'FPV Flythrough & Chase', price: '$5,500', duration: 'Full Day Capture', details: ['1 Pilot + 1 Spotter', 'High-Speed Indoor/Outdoor FPV Rigs', 'Virtual Reality Goggles Output Feed', 'Seamless Edited flythrough compilation'] }
    ],
    faqs: [
      { q: 'Can you fly in adverse weather conditions?', a: 'Flights are subject to wind speeds under 25mph and light rain. Safety and FAA guidelines are prioritised.' },
      { q: 'Do you cover indoor spaces with drones?', a: 'Yes! Our custom micro-FPV drones feature guarded rotors designed for indoor flythroughs.' }
    ]
  },
  'live-broadcast': {
    title: 'Low-Latency Live Broadcast',
    tagline: 'Ultra-low latency television & digital web streaming.',
    description: 'We build local broadcast stations inside venues. Featuring high-grade hardware switchers, zero-delay wireless transmitters, and robust network bonding, we broadcast crystal clear content to millions.',
    icon: Radio,
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1800',
    techStack: [
      { name: 'Video Switchers', detail: 'Blackmagic ATEM Constellation 8K' },
      { name: 'RF Transmitter', detail: 'Teradek Bolt 4K LT (Zero Delay)' },
      { name: 'Network Bonding', detail: 'LiveU Solo PRO (Dual 5G + Ethernet)' },
      { name: 'Streaming Target', detail: 'YouTube Live, RTMP servers, Zoom VIP' }
    ],
    packages: [
      { name: 'Digital Webcast', price: '$6,000', duration: 'Up to 5 Hours Stream', details: ['2 Static Cameras', 'RTMP Network Setup', 'Custom Graphic Overlays/Lower Thirds', 'VOD Recording Backup'] },
      { name: 'Arena Broadcast Station', price: '$14,500', duration: 'Full Day Multi-Stream', details: ['6 Cameras (Wireless + Crane)', 'Live Instant Replay & Slow-Mo', 'Dual Network Backup Bonding', 'Dedicated Event Broadcast Director'] }
    ],
    faqs: [
      { q: 'What internet connection is required?', a: 'We leverage cellular bonding (combining multiple SIM networks), meaning we can stream from remote areas without venue WiFi.' },
      { q: 'Can we integrate sponsorships into the stream?', a: 'Absolutely. We support pre-rendered commercials, dynamic sponsor logos, and custom lower-third designs.' }
    ]
  }
};

export default function ServiceDetail() {
  const { id } = useParams();
  const service = SERVICE_DATA[id];
  const [selectedPkg, setSelectedPkg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (service) {
      setSelectedPkg(service.packages[0].name);
    }
  }, [id, service]);

  if (!service) {
    return (
      <div className="min-height-screen bg-bg-main text-white flex flex-col justify-center items-center py-20 px-8">
        <h2 className="text-3xl font-bold text-accent-gold mb-4">Service Not Found</h2>
        <Link to="/" className="inline-flex items-center text-white bg-accent-primary hover:bg-red-700 px-6 py-3 rounded-xl transition-all">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  const IconComponent = service.icon;

  const handleBook = (e) => {
    e.preventDefault();
    alert(`Inquiry sent for ${service.title} (${selectedPkg} Package). Our production unit will coordinate package pricing briefs shortly.`);
  };

  return (
    <div className="bg-bg-main text-text-main min-h-screen pt-24 pb-16">
      {/* Background Gradient Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Navigation */}
        <Link to="/" className="inline-flex items-center text-accent-gold hover:text-white mb-8 text-sm font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Capabilities
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center justify-center p-3 bg-accent-primary/10 border border-accent-primary/30 rounded-2xl text-accent-gold mb-6">
              <IconComponent className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-accent-gold text-lg md:text-xl font-medium mt-2">{service.tagline}</p>
            <p className="text-text-muted mt-6 leading-relaxed text-base">{service.description}</p>

            {/* Technical Specs */}
            <div className="mt-8 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
                <Cpu className="w-4 h-4 text-accent-gold mr-2" /> Standard Hardware & Integration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {service.techStack.map((tech, idx) => (
                  <div key={idx} className="bg-bg-surface border border-border-color p-4 rounded-xl">
                    <span className="text-xs text-text-muted block font-semibold">{tech.name}</span>
                    <span className="text-sm text-white font-medium mt-1 block">{tech.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="h-[400px] rounded-3xl overflow-hidden border border-border-color shadow-2xl relative group">
            <img 
              src={service.heroImage} 
              alt={service.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-bg-card/90 backdrop-blur-md p-4 rounded-2xl border border-border-color">
                <span className="text-xs text-accent-gold uppercase font-bold tracking-wider flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1" /> Elite Hardware Configurations
                </span>
                <span className="text-xs text-text-muted mt-1 block">Deploying certified systems for flawless operational performance.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <section className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold text-white">Select Pricing Layouts</h2>
            <p className="text-text-muted mt-2 text-sm">Review standard budgets built around equipment scale and operation times.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {service.packages.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`border rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                  pkg.name.includes('Premier') || pkg.name.includes('Arena')
                    ? 'bg-bg-card border-accent-gold shadow-accent-gold/5' 
                    : 'bg-bg-surface border-border-color hover:border-accent-primary'
                }`}
              >
                {pkg.name.includes('Premier') || pkg.name.includes('Arena') ? (
                  <span className="absolute -top-3.5 right-6 bg-accent-gold text-bg-main font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-bg-main">
                    Highly Requested
                  </span>
                ) : null}
                <div>
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                  <p className="text-xs text-text-muted mt-1">{pkg.duration}</p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-accent-gold">{pkg.price}</span>
                    <span className="text-xs text-text-muted ml-2">/ starting brief</span>
                  </div>
                  <ul className="mt-6 space-y-3 border-t border-border-color/60 pt-6">
                    {pkg.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-sm text-text-muted flex items-center">
                        <span className="w-1.5 h-1.5 bg-accent-primary rounded-full mr-2"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => setSelectedPkg(pkg.name)}
                  className={`w-full mt-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    selectedPkg === pkg.name 
                      ? 'bg-accent-gold text-bg-main font-black border border-accent-gold shadow-md' 
                      : 'bg-bg-main text-white border border-border-color hover:border-accent-primary'
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
          <section className="bg-bg-surface border border-border-color p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">Service FAQ</h2>
            <div className="space-y-6">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-border-color pb-4 last:border-0 last:pb-0">
                  <h4 className="text-base font-semibold text-white">{faq.q}</h4>
                  <p className="text-sm text-text-muted mt-2 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Inquiry Card */}
          <section className="bg-gradient-to-br from-bg-surface to-bg-card border border-border-color p-8 rounded-3xl relative">
            <h2 className="text-2xl font-bold text-white mb-2">Initiate Brief</h2>
            <p className="text-xs text-text-muted mb-6">Confirm equipment schedules and configure operational crew details.</p>
            <form onSubmit={handleBook} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required 
                  className="w-full bg-bg-main border border-border-color text-sm text-white px-4 py-3 rounded-xl focus:border-accent-gold outline-none transition-all placeholder-gray-600"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required 
                  className="w-full bg-bg-main border border-border-color text-sm text-white px-4 py-3 rounded-xl focus:border-accent-gold outline-none transition-all placeholder-gray-600"
                />
              </div>
              <div className="p-3 bg-bg-main border border-border-color rounded-xl flex items-center justify-between">
                <span className="text-xs text-text-muted">Selected Configuration:</span>
                <span className="text-xs text-accent-gold font-bold uppercase">{selectedPkg}</span>
              </div>
              <textarea 
                rows="4" 
                placeholder="Details about staging dimensions, timeline constraints, or spatial coverage requirements..." 
                required 
                className="w-full bg-bg-main border border-border-color text-sm text-white px-4 py-3 rounded-xl focus:border-accent-gold outline-none transition-all placeholder-gray-600"
              ></textarea>
              <button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-accent-primary to-[#700016] text-sm text-white font-bold rounded-xl border border-accent-gold/20 hover:border-accent-gold shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center cursor-pointer"
              >
                <Send className="w-4 h-4 mr-2" /> Send Production Brief
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
