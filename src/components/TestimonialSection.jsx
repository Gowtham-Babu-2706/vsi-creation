import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, X, Send, CheckCircle, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { api } from '../utils/api';

// ── Star Rating Input ──
function StarInput({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          className="cursor-pointer transition-transform hover:scale-110"
        >
          <Star className={`w-7 h-7 transition-colors ${s <= (hovered || value) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
        </button>
      ))}
    </div>
  );
}

// ── Star Rating Display ──
function StarDisplay({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`w-3.5 h-3.5 ${s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
      ))}
    </div>
  );
}

// ── Testimonial Form Modal ──
function TestimonialFormModal({ onClose }) {
  const [form, setForm] = useState({ name: '', rating: 5, message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError('Please fill out your name and message.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.submitTestimonial(form);
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black text-gray-900">Share Your Experience</h3>
            <p className="text-xs text-gray-500 mt-1">Your review will be visible after approval.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="inline-flex p-4 bg-green-50 rounded-full">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Thank you!</h4>
              <p className="text-sm text-gray-500">Your testimonial has been submitted and is under review. It will appear on our website once approved.</p>
              <button onClick={onClose} className="mt-4 px-6 py-3 bg-accent-primary text-white rounded-xl font-bold text-sm cursor-pointer hover:bg-accent-secondary transition-colors">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Priya Sharma"
                  className="w-full border border-gray-200 focus:border-accent-primary outline-none px-4 py-3 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-accent-primary/10 transition-all"
                />
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Your Rating *</label>
                <StarInput value={form.rating} onChange={v => setForm(p => ({ ...p, rating: v }))} />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Your Experience *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Tell us about your experience with VSI Creations..."
                  className="w-full border border-gray-200 focus:border-accent-primary outline-none px-4 py-3 rounded-xl text-sm text-gray-800 resize-none focus:ring-2 focus:ring-accent-primary/10 transition-all"
                />
              </div>

              {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={onClose} className="px-5 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="px-6 py-3 bg-accent-primary hover:bg-accent-secondary text-white rounded-xl text-sm font-bold shadow-md shadow-accent-primary/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-2">
                  {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Submit</>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Testimonial Section ──
export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    api.getTestimonials()
      .then(data => { setTestimonials(data || []); })
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(c => (c + 1) % testimonials.length);

  // Get 3 visible cards centered on `current`
  const visible = testimonials.length > 0
    ? [-1, 0, 1].map(offset => testimonials[(current + offset + testimonials.length) % testimonials.length])
    : [];

  const formatDate = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  };

  return (
    <section className="py-24 px-6 md:px-[8%] bg-bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent" />
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[300px] h-[300px] bg-accent-rose/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-[10px] text-accent-primary font-bold uppercase tracking-[4px] mb-3 block">Client Stories</span>
          <h2 className="text-4xl md:text-5xl font-black text-text-main tracking-tight mb-4">
            What Our Clients Say
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-sm leading-relaxed">
            Real experiences from people who trusted VSI Creations to bring their vision to life.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-16 text-text-muted">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="font-semibold">No testimonials yet. Be the first!</p>
          </div>
        ) : (
          <>
            {/* Carousel */}
            <div className="relative">
              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {visible.map((t, idx) => (
                  <div
                    key={t.id + idx}
                    className={`relative bg-white rounded-3xl p-6 shadow-sm border transition-all duration-300 ${
                      idx === 1
                        ? 'border-accent-primary/30 shadow-lg shadow-accent-primary/10 scale-105'
                        : 'border-border-color opacity-80 scale-100'
                    }`}
                  >
                    {/* Quote icon */}
                    <Quote className="w-8 h-8 text-accent-primary/20 mb-4" />

                    {/* Stars */}
                    <StarDisplay rating={t.rating} />

                    {/* Message */}
                    <p className="text-text-main text-sm leading-relaxed mt-3 mb-6 italic line-clamp-4">
                      "{t.message}"
                    </p>

                    {/* Author */}
                    <div className="mt-auto pt-4 border-t border-border-color/50 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-primary to-accent-rose flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-text-main text-sm">{t.name}</p>
                        <p className="text-[11px] text-text-muted">{formatDate(t.submittedAt)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              {testimonials.length > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={prev}
                    className="p-3 bg-white border border-border-color hover:border-accent-primary hover:text-accent-primary text-text-muted rounded-full shadow-sm transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Dots */}
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`rounded-full transition-all cursor-pointer ${i === current ? 'w-6 h-2.5 bg-accent-primary' : 'w-2.5 h-2.5 bg-border-color hover:bg-accent-primary/40'}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={next}
                    className="p-3 bg-white border border-border-color hover:border-accent-primary hover:text-accent-primary text-text-muted rounded-full shadow-sm transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-accent-primary hover:bg-accent-secondary text-white font-bold rounded-2xl shadow-lg shadow-accent-primary/25 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-sm"
          >
            <MessageSquare className="w-4 h-4" />
            Share Your Experience
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && <TestimonialFormModal onClose={() => setShowForm(false)} />}
    </section>
  );
}
