import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';
import { useGSAP, SplitText } from '../hooks/useGSAP';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  useDocumentMetadata('Inquire Now & Book Staging', 'Connect with VSI Creations production engineers and crew. Submit your project brief for customized event staging, audio-visual setups, and media production.');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedServiceParam = queryParams.get('service') || 'general';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: selectedServiceParam,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[0-9]{10,14}$/;

    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Invalid email format';
    }
    if (formData.phone.trim() && !phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
      tempErrors.phone = 'Phone number must be 10-14 digits';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      // Simulate API submit delay
      setTimeout(() => {
        setLoading(false);
        setIsSubmitted(true);
      }, 1000);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: selectedServiceParam,
      message: ''
    });
    setIsSubmitted(false);
    setErrors({});
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo('.ct-eyebrow', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' })
      .fromTo('.ct-title .char-span',
        { opacity: 0, y: 35, rotateX: -40 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.75, stagger: 0.02, ease: 'power4.out' },
        '-=0.35'
      )
      .fromTo('.ct-desc', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.5')
      .fromTo('.ct-info-card', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' }, '-=0.35')
      .fromTo('.ct-form-panel', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' }, '-=0.6');
  }, []);

  return (
    <div className="bg-bg-main text-text-main min-h-screen pt-24 pb-16 relative px-6">
      {/* Background spotlights */}
      <div className="absolute top-[10vh] left-[15%] w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[10vh] right-[15%] w-[350px] h-[350px] bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
        
        {/* Left Column: Contact Information & Staging Brief */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="ct-eyebrow text-xs text-accent-gold font-bold uppercase tracking-[4px] glow-gold">
              Get in Touch
            </span>
            <h1 className="ct-title text-4xl md:text-5xl font-extrabold text-black tracking-tight font-display">
              <SplitText>Let's Produce Your Spectacle</SplitText>
            </h1>
            <p className="ct-desc text-sm text-text-muted leading-relaxed max-w-sm font-light">
              Connect with VSI Creations production engineers and crew. Fill out our form or contact us directly to reserve high-fidelity setups.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-border-color/40">
            <h3 className="text-xs font-bold text-black uppercase tracking-wider">Connect With Us</h3>
            <div className="grid grid-cols-1 gap-4">
              <a
                href="https://www.instagram.com/vsi_creations/"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-info-card flex items-center gap-4 bg-bg-surface border border-border-color/40 p-4 rounded-2xl hover:border-accent-primary transition-all group"
              >
                <div className="p-3 bg-pink-500/10 text-pink-500 rounded-xl group-hover:bg-accent-primary group-hover:text-white transition-all flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase font-bold block">Instagram</span>
                  <span className="text-sm font-semibold text-text-main">@vsi_creations</span>
                </div>
              </a>

              <a
                href="https://www.facebook.com/people/vsicreations/61573339693236/"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-info-card flex items-center gap-4 bg-bg-surface border border-border-color/40 p-4 rounded-2xl hover:border-accent-primary transition-all group"
              >
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl group-hover:bg-accent-primary group-hover:text-white transition-all flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase font-bold block">Facebook</span>
                  <span className="text-sm font-semibold text-text-main">vsicreations</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interaction Form Card */}
        <div className="ct-form-panel lg:col-span-7">
          <div className="bg-bg-surface/55 backdrop-blur-md border border-white/5 p-8 md:p-10 rounded-[32px] shadow-2xl shadow-black/40 relative overflow-hidden h-full flex flex-col justify-center">
            {/* Top border trim */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent-primary via-accent-rose to-accent-primary"></div>

            {isSubmitted ? (
              <div className="text-center py-12 space-y-6 animate-scale-up">
                <div className="w-16 h-16 bg-accent-primary/15 border border-accent-gold rounded-full flex items-center justify-center text-accent-gold mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider">Brief Dispatched!</h3>
                  <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed font-light">
                    Thank you <span className="text-white font-bold">{formData.name}</span>. Your inquiry for <span className="text-accent-gold font-bold uppercase">{formData.service.replace('-', ' ')} Production</span> has been successfully logged.
                  </p>
                  <p className="text-xs text-text-muted bg-bg-card/45 border border-white/5 px-4 py-2.5 rounded-xl max-w-sm mx-auto font-light">
                    A secure confirmation token has been sent to <span className="text-white font-bold">{formData.email}</span>.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-8 py-3.5 bg-gradient-to-r from-accent-primary to-accent-rose hover:from-accent-rose hover:to-accent-secondary text-white font-bold rounded-xl shadow-lg shadow-accent-primary/25 cursor-pointer text-xs uppercase tracking-widest mt-4 btn-glow"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h2 className="text-xl font-extrabold text-white font-display tracking-tight">Project Inquiry Form</h2>
                  <p className="text-xs text-text-muted font-light">Fill out the brief guidelines below to schedule crew allocations.</p>
                </div>

                {/* Name field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. John Smith"
                    className={`w-full bg-bg-card/45 border text-sm text-black px-4 py-3.5 rounded-xl outline-none focus:border-accent-primary focus:bg-bg-main/80 transition-all placeholder:text-slate-600 hover:border-accent-primary/25 ${
                      errors.name ? 'border-red-500' : 'border-border-color/80'
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-red-400 font-semibold">{errors.name}</p>}
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@example.com"
                      className={`w-full bg-bg-card/45 border text-sm text-black px-4 py-3.5 rounded-xl outline-none focus:border-accent-primary focus:bg-bg-main/80 transition-all placeholder:text-slate-600 hover:border-accent-primary/25 ${
                        errors.email ? 'border-red-500' : 'border-border-color/80'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-400 font-semibold">{errors.email}</p>}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className={`w-full bg-bg-card/45 border text-sm text-black px-4 py-3.5 rounded-xl outline-none focus:border-accent-primary focus:bg-bg-main/80 transition-all placeholder:text-slate-600 hover:border-accent-primary/25 ${
                        errors.phone ? 'border-red-500' : 'border-border-color/80'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-400 font-semibold">{errors.phone}</p>}
                  </div>
                </div>

                {/* Service Dropdown Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Staging Capability Required</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-bg-card/45 border border-border-color/80 text-sm text-gray-500 px-4 py-3.5 rounded-xl outline-none focus:border-accent-primary focus:bg-bg-main/80 transition-all cursor-pointer font-bold hover:border-accent-primary/25"
                  >
                    <option value="general">🎬 General Inquiry</option>
                    <option value="corporate-event-management">💼 Corporate Event Management</option>
                    <option value="awards-function">🏆 Awards Function Management</option>
                    <option value="celebrity-management">⭐ Celebrity Management</option>
                    <option value="concert-production">🎵 Concert & Music Festival Production</option>
                    <option value="sports-event-management">🏅 Marathon & Sports Event Management</option>
                    <option value="csr-projects">🤝 CSR Project Management</option>
                    <option value="awareness-campaigns">📣 Awareness Campaign Management</option>
                    <option value="product-launch">🚀 Product Launch Events</option>
                    <option value="exhibition-management">🏛️ Exhibition & Expo Management</option>
                    <option value="wedding-management">💍 Wedding Event Management</option>
                    <option value="stage-sound-lighting">💡 Stage, Sound & Lighting Solutions</option>
                    <option value="event-photography">📸 Event Photography & Videography</option>
                    <option value="other">✨ Other Custom Concept</option>
                  </select>
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Production Specifications *</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about the venue dimensions, timelines, acoustic requirements, or concept clearances..."
                    className={`w-full bg-bg-card/45 border text-sm text-black px-4 py-3.5 rounded-xl outline-none focus:border-accent-primary focus:bg-bg-main/80 transition-all placeholder:text-slate-600 resize-none hover:border-accent-primary/25 ${
                      errors.message ? 'border-red-500' : 'border-border-color/80'
                    }`}
                  ></textarea>
                  {errors.message && <p className="text-[10px] text-red-400 font-semibold">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="contact-submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-accent-primary to-accent-rose hover:from-accent-rose hover:to-accent-secondary text-black font-bold rounded-xl btn-glow shadow-lg shadow-accent-primary/20 hover:shadow-accent-secondary/35 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-widest cursor-pointer mt-4 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Secure Project Brief
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
