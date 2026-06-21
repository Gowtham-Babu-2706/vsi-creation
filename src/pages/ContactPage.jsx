import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';

export default function ContactPage() {
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

  return (
    <div className="bg-bg-main text-text-main min-h-screen pt-24 pb-16 relative px-6">
      {/* Background spotlights */}
      <div className="absolute top-[10vh] left-[15%] w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[10vh] right-[15%] w-[350px] h-[350px] bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
        
        {/* Left Column: Contact Information & Staging Brief */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs text-accent-gold font-bold uppercase tracking-[4px] glow-gold">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Let's Produce Your Spectacle
            </h1>
            <p className="text-sm text-text-muted leading-relaxed max-w-sm">
              Connect with VSI Creations production engineers and crew. Fill out our form or contact us directly to reserve high-fidelity setups.
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-bg-surface border border-border-color p-8 rounded-3xl space-y-6">
            {/* Phone details */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent-primary/10 border border-accent-primary/20 text-accent-gold rounded-xl shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Call Staging Desk</span>
                <a href="tel:+919876543210" className="text-sm text-white font-bold hover:text-accent-gold transition-colors block mt-1">+91 98765 43210</a>
                <span className="text-[10px] text-text-muted mt-0.5 block">Mon-Sat, 10 AM - 7 PM IST</span>
              </div>
            </div>

            {/* Email details */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent-primary/10 border border-accent-primary/20 text-accent-gold rounded-xl shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Corporate Inquiries</span>
                <a href="mailto:produce@vsicreations.com" className="text-sm text-white font-bold hover:text-accent-gold transition-colors block mt-1">produce@vsicreations.com</a>
                <span className="text-[10px] text-text-muted mt-0.5 block">Response within 24 business hours</span>
              </div>
            </div>

            {/* Location details */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent-primary/10 border border-accent-primary/20 text-accent-gold rounded-xl shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Production House HQ</span>
                <span className="text-sm text-white font-bold block mt-1">4th Floor, Film Studio Complex</span>
                <span className="text-xs text-text-muted block mt-0.5">Andheri West, Mumbai, MH - 400053</span>
              </div>
            </div>
          </div>

          {/* Operational timing info */}
          <div className="flex items-center gap-2 text-xs text-text-muted bg-bg-card/40 border border-border-color p-4 rounded-2xl">
            <Clock className="w-4 h-4 text-accent-gold shrink-0" />
            <span>HQ Staging Operations close at 7:00 PM IST today.</span>
          </div>
        </div>

        {/* Right Column: Interaction Form Card */}
        <div className="lg:col-span-7">
          <div className="bg-bg-surface border border-border-color p-8 md:p-10 rounded-[32px] shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
            {/* Top border trim */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent-primary via-accent-gold to-accent-primary"></div>

            {isSubmitted ? (
              <div className="text-center py-12 space-y-6 animate-scale-up">
                <div className="w-16 h-16 bg-accent-primary/15 border border-accent-gold rounded-full flex items-center justify-center text-accent-gold mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider">Brief Dispatched!</h3>
                  <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                    Thank you <span className="text-white font-bold">{formData.name}</span>. Your inquiry for <span className="text-accent-gold font-bold uppercase">{formData.service.replace('-', ' ')} Production</span> has been successfully logged.
                  </p>
                  <p className="text-xs text-text-muted bg-bg-card border border-border-color/60 px-4 py-2.5 rounded-xl max-w-sm mx-auto">
                    A secure confirmation token has been sent to <span className="text-white font-bold">{formData.email}</span>.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-8 py-3.5 bg-gradient-to-r from-accent-primary to-[#700016] text-white font-bold rounded-xl border border-accent-gold/20 hover:border-accent-gold shadow-lg shadow-accent-primary/25 cursor-pointer text-xs uppercase tracking-widest mt-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white">Project Inquiry Form</h2>
                  <p className="text-xs text-text-muted">Fill out the brief guidelines below to schedule crew allocations.</p>
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
                    className={`w-full bg-bg-card/60 border text-sm text-white px-4 py-3.5 rounded-xl outline-none focus:border-accent-gold focus:bg-bg-main transition-all ${
                      errors.name ? 'border-red-600' : 'border-border-color'
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
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
                      className={`w-full bg-bg-card/60 border text-sm text-white px-4 py-3.5 rounded-xl outline-none focus:border-accent-gold focus:bg-bg-main transition-all ${
                        errors.email ? 'border-red-600' : 'border-border-color'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
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
                      className={`w-full bg-bg-card/60 border text-sm text-white px-4 py-3.5 rounded-xl outline-none focus:border-accent-gold focus:bg-bg-main transition-all ${
                        errors.phone ? 'border-red-600' : 'border-border-color'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 font-semibold">{errors.phone}</p>}
                  </div>
                </div>

                {/* Service Dropdown Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Staging Capability Required</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-bg-card border border-border-color text-sm text-white px-4 py-3.5 rounded-xl outline-none focus:border-accent-gold focus:bg-bg-main transition-all cursor-pointer font-semibold"
                  >
                    <option value="general">🎬 General Inquiry</option>
                    <option value="event-management">💼 Event Management</option>
                    <option value="college-educational">🎓 College & Educational Events</option>
                    <option value="cultural-programs">🎭 Cultural Programs</option>
                    <option value="wedding-planning">💍 Wedding Planning & Management</option>
                    <option value="birthday-celebrations">🎉 Birthday & Private Celebrations</option>
                    <option value="event-logistics">🚚 Event Coordination & Logistics</option>
                    <option value="media-production">📹 Media Production</option>
                    <option value="creative-services">🎨 Creative Services</option>
                    <option value="digital-marketing">📣 Digital Marketing</option>
                    <option value="event-production">🎪 Event Production</option>
                    <option value="talent-entertainment">🌟 Talent & Entertainment</option>
                    <option value="equipment-rental">⚙️ Equipment Rental</option>
                    <option value="other">⭐ Other Custom Concept</option>
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
                    className={`w-full bg-bg-card/60 border text-sm text-white px-4 py-3.5 rounded-xl outline-none focus:border-accent-gold focus:bg-bg-main transition-all ${
                      errors.message ? 'border-red-600' : 'border-border-color'
                    }`}
                  ></textarea>
                  {errors.message && <p className="text-[10px] text-red-500 font-semibold">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-accent-primary to-[#700016] text-white font-bold rounded-xl border border-accent-gold/20 hover:border-accent-gold shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/45 hover:-translate-y-0.5 transition-all text-xs uppercase tracking-widest cursor-pointer mt-4 flex items-center justify-center gap-2"
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
