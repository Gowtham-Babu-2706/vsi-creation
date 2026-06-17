import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, User, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { api } from '../utils/api';

export default function RegistrationModal({ isOpen, onClose, eventName, eventId }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    age: '',
    participants: 1,
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[0-9]{10,14}$/; // allows + leading and 10 to 14 numbers

    if (!formData.fullName.trim()) tempErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email Address is required';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Invalid email address format';
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'Mobile Number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
      tempErrors.phone = 'Mobile Number must be 10-14 digits';
    }

    if (!formData.city.trim()) tempErrors.city = 'City is required';
    
    if (!formData.age) {
      tempErrors.age = 'Age is required';
    } else if (Number(formData.age) < 13 || Number(formData.age) > 120) {
      tempErrors.age = 'Valid age required (13+)';
    }

    if (Number(formData.participants) < 1) {
      tempErrors.participants = 'Minimum 1 participant required';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when editing field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await api.createBooking({
          ...formData,
          eventId,
          eventName
        });
        setIsSuccess(true);
      } catch (err) {
        setErrors(prev => ({
          ...prev,
          submit: err.message || 'Failed to submit registration. Please try again later.'
        }));
      }
    }
  };

  const handleResetAndClose = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: '',
      age: '',
      participants: 1,
      notes: ''
    });
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      {/* Modal Card wrapper */}
      <div className="bg-bg-surface border border-border-color rounded-3xl w-full max-w-xl overflow-hidden relative shadow-2xl animate-scale-up">
        {/* Glow corner elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header */}
        <div className="border-b border-border-color/60 px-6 py-5 flex justify-between items-center relative z-10">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center">
              <Sparkles className="w-5 h-5 text-accent-gold mr-2" /> Book Placement
            </h2>
            <p className="text-xs text-text-muted mt-0.5">Secure passes for {eventName}</p>
          </div>
          <button 
            onClick={handleResetAndClose}
            className="p-1.5 hover:bg-bg-card border border-border-color/60 text-text-muted hover:text-white rounded-xl transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {isSuccess ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-accent-primary/10 border border-accent-gold rounded-full flex items-center justify-center text-accent-gold mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">Registration Confirmed!</h3>
                <p className="text-sm text-text-muted max-w-md mx-auto">
                  Your seat details have been logged in the system. An confirmation pass will be dispatched to <span className="text-accent-gold font-bold">{formData.email}</span> shortly.
                </p>
              </div>
              <button 
                onClick={handleResetAndClose}
                className="px-8 py-3 bg-gradient-to-r from-accent-primary to-[#700016] text-white font-bold rounded-xl border border-accent-gold/20 hover:border-accent-gold shadow-lg shadow-accent-primary/25 cursor-pointer text-sm"
              >
                Return to Event Page
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Name Read Only */}
              <div className="bg-bg-card border border-border-color p-3 rounded-xl flex items-center justify-between text-xs">
                <span className="text-text-muted uppercase tracking-wider font-bold">Selected Staging:</span>
                <span className="text-accent-gold font-bold uppercase">{eventName}</span>
              </div>

              {errors.submit && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  {errors.submit}
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-4 h-4 text-gray-600" />
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    className={`w-full bg-bg-card/60 border text-sm text-white pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-accent-gold transition-all ${
                      errors.fullName ? 'border-red-600' : 'border-border-color'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-[10px] text-red-500 font-semibold">{errors.fullName}</p>}
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-600" />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. john@example.com"
                    className={`w-full bg-bg-card/60 border text-sm text-white pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-accent-gold transition-all ${
                      errors.email ? 'border-red-600' : 'border-border-color'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
              </div>

              {/* Phone and City Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Mobile Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 w-4 h-4 text-gray-600" />
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 9876543210"
                      className={`w-full bg-bg-card/60 border text-sm text-white pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-accent-gold transition-all ${
                        errors.phone ? 'border-red-600' : 'border-border-color'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-red-500 font-semibold">{errors.phone}</p>}
                </div>

                {/* City */}
                <div className="space-y-1">
                  <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">City *</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-gray-600" />
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai"
                      className={`w-full bg-bg-card/60 border text-sm text-white pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-accent-gold transition-all ${
                        errors.city ? 'border-red-600' : 'border-border-color'
                      }`}
                    />
                  </div>
                  {errors.city && <p className="text-[10px] text-red-500 font-semibold">{errors.city}</p>}
                </div>
              </div>

              {/* Age and Participants Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Age */}
                <div className="space-y-1">
                  <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Age *</label>
                  <input 
                    type="number" 
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Min 13"
                    className={`w-full bg-bg-card/60 border text-sm text-white px-4 py-3.5 rounded-xl outline-none focus:border-accent-gold transition-all ${
                      errors.age ? 'border-red-600' : 'border-border-color'
                    }`}
                  />
                  {errors.age && <p className="text-[10px] text-red-500 font-semibold">{errors.age}</p>}
                </div>

                {/* Number of Participants */}
                <div className="space-y-1">
                  <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Number of Attendees *</label>
                  <input 
                    type="number" 
                    name="participants"
                    min="1"
                    max="10"
                    value={formData.participants}
                    onChange={handleInputChange}
                    className={`w-full bg-bg-card/60 border text-sm text-white px-4 py-3.5 rounded-xl outline-none focus:border-accent-gold transition-all ${
                      errors.participants ? 'border-red-600' : 'border-border-color'
                    }`}
                  />
                  {errors.participants && <p className="text-[10px] text-red-500 font-semibold">{errors.participants}</p>}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-1">
                <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Additional Production Notes</label>
                <textarea 
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Tell us about special needs, seating preferences, invitation codes..."
                  className="w-full bg-bg-card/60 border border-border-color text-sm text-white px-4 py-3.5 rounded-xl outline-none focus:border-accent-gold transition-all"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-gradient-to-r from-accent-primary to-[#700016] text-white font-bold rounded-xl border border-accent-gold/20 hover:border-accent-gold shadow-lg shadow-accent-primary/25 hover:shadow-accent-primary/45 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider cursor-pointer"
              >
                Confirm Registration Pass
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
